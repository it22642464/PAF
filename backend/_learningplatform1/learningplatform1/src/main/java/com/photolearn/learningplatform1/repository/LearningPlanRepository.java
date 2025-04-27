package com.photolearn.learningplatform1.repository;

import com.photolearn.learningplatform1.entity.LearningPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LearningPlanRepository extends JpaRepository<LearningPlan, Long> {
    List<LearningPlan> findByUserId(Long userId);
}
