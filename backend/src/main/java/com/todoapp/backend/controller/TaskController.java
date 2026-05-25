package com.todoapp.backend.controller;

import com.todoapp.backend.entity.Task;
import com.todoapp.backend.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")

@CrossOrigin(
origins = "http://localhost:5173",
allowedHeaders = "*",
methods = {
RequestMethod.GET,
RequestMethod.POST,
RequestMethod.PUT,
RequestMethod.DELETE,
RequestMethod.OPTIONS
}
)

public class TaskController {

@Autowired
private TaskRepository taskRepository;

@GetMapping
public List<Task> getAllTasks() {
    return taskRepository.findAll();
}

@PostMapping
public Task createTask(@RequestBody Task task) {
    return taskRepository.save(task);
}

@PutMapping("/{id}")
public Task updateTask(@PathVariable Long id,
                       @RequestBody Task updatedTask) {

    Optional<Task> optionalTask = taskRepository.findById(id);

    if (optionalTask.isPresent()) {

        Task task = optionalTask.get();

        task.setTitle(updatedTask.getTitle());
        task.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(task);
    }

    return null;
}

@DeleteMapping("/{id}")
public String deleteTask(@PathVariable Long id) {

    taskRepository.deleteById(id);

    return "Deleted Successfully";
}

}

