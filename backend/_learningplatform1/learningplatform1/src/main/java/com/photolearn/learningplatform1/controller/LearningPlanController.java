package com.photolearn.learningplatform1.controller;

import com.photolearn.learningplatform1.entity.LearningPlan;
import com.photolearn.learningplatform1.service.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/plans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService service;

    @PostMapping
    public LearningPlan create(@RequestBody LearningPlan plan) {
        return service.create(plan);
    }

    @GetMapping("/user/{userId}")
    public List<LearningPlan> getByUser(@PathVariable Long userId) {
        return service.getAllByUser(userId);
    }

    @PutMapping("/{id}")
    public LearningPlan update(@PathVariable Long id, @RequestBody LearningPlan plan) {
        return service.update(id, plan);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
