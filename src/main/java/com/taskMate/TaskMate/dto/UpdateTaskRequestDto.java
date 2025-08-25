package com.taskMate.TaskMate.dto;

import java.time.LocalDate;

public record UpdateTaskRequestDto(String title, String description, String status, Long assigneeId, LocalDate dueDate) {
}
