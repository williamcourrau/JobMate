package com.taskMate.TaskMate.controller;

import com.taskMate.TaskMate.dto.TaskDto;
import com.taskMate.TaskMate.dto.UpdateTaskRequestDto;
import com.taskMate.TaskMate.model.Task;
import com.taskMate.TaskMate.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards/{boardID}/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@PathVariable Long boardId, @RequestBody TaskDto taskDTO) {
        var task = taskService.createTask(boardId, taskDTO);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/{id}")
    public TaskDto getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long boardId, @RequestBody UpdateTaskRequestDto requestDto) {
        var updatedTask = taskService.updateTask(boardId, requestDto);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId, @PathVariable Long boardId) {
        taskService.deleteTask(taskId, boardId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasksByBoard(@PathVariable Long boardId){
        var tasks = taskService.getTasksByBoard(boardId);
        return  ResponseEntity.ok(tasks);
    }
}
