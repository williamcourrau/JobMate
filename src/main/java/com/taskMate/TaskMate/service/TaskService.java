package com.taskMate.TaskMate.service;

import com.taskMate.TaskMate.dto.TaskDto;
import com.taskMate.TaskMate.dto.UpdateTaskRequestDto;
import com.taskMate.TaskMate.model.Task;

import java.util.List;

public interface TaskService {
    TaskDto createTask(Long boardId, TaskDto taskDTO);
    TaskDto updateTask(Long taskId, UpdateTaskRequestDto request);
    void deleteTask(Long boardId, Long id);
    List<TaskDto> getAllTasks();
    TaskDto getTaskById(Long id);
    List<Task> getTasksByBoard(Long boardId);
}
