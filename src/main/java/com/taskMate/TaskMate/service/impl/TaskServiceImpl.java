package com.taskMate.TaskMate.service.impl;

import com.taskMate.TaskMate.dto.TaskDto;
import com.taskMate.TaskMate.dto.UpdateTaskRequestDto;
import com.taskMate.TaskMate.model.Task;
import com.taskMate.TaskMate.model.TaskStatus;
import com.taskMate.TaskMate.model.User;
import com.taskMate.TaskMate.repository.BoardRepository;
import com.taskMate.TaskMate.repository.TaskRepository;
import com.taskMate.TaskMate.repository.UserRepository;
import com.taskMate.TaskMate.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.secretsmanager.model.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Override
    @CacheEvict(value = {"tasks", "task"}, allEntries = true)
    public TaskDto createTask(Long boardId, TaskDto taskDTO) {
        var board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        Task task = new Task();
        BeanUtils.copyProperties(taskDTO, task);
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        task.setBoard(board);
        Task saved = taskRepository.save(task);
        BeanUtils.copyProperties(saved, taskDTO);
        return taskDTO;
    }

    @Override
    @Transactional
    @CacheEvict(value = {"tasks", "task"}, allEntries = true)
    public TaskDto updateTask(Long taskId, UpdateTaskRequestDto request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        if (request.title() != null) task.setTitle(request.title());
        if (request.description() != null) task.setDescription(request.description());
        if (request.status() != null) task.setStatus(TaskStatus.valueOf(request.status()));
        if (request.assigneeId() != null) {
            User assignee = userRepository.findById(request.assigneeId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
            task.setAssignee(assignee);
        }
        if (request.dueDate() != null) task.setDueDate(request.dueDate());

        taskRepository.save(task);
        var taskDto = new TaskDto();
        BeanUtils.copyProperties(task, taskDto);
        return taskDto;
    }

    @Override
    @CacheEvict(value = {"tasks", "task"}, allEntries = true)
    public void deleteTask(Long boardId, Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getBoard().getId().equals(boardId)) {
            throw new IllegalArgumentException("Task does not belong to the specified board");
        }

        taskRepository.deleteById(id);
    }

    @Override
    @Cacheable("tasks")
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream().map(task ->
        {
            TaskDto dto = new TaskDto();
            BeanUtils.copyProperties(task, dto);
            return dto;
        }).collect(Collectors.toList());
    }

    public List<Task> getTasksByBoard(Long boardId){
        return taskRepository.findByBoardId(boardId);
    }

    @Override
    @Cacheable(value = "task", key = "#id")
    public TaskDto getTaskById(Long id) {
        var task = taskRepository.findById(id).orElseThrow();
        TaskDto dto = new TaskDto();
        BeanUtils.copyProperties(task, dto);
        return dto;
    }
}
