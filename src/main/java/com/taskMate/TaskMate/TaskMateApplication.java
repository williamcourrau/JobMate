package com.taskMate.TaskMate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TaskMateApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskMateApplication.class, args);
	}

}
