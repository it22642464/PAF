// package com.photolearn.learningplatform1.service;

// import com.photolearn.learningplatform1.entity.LearningPlan;
// import com.photolearn.learningplatform1.repository.LearningPlanRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class LearningPlanService {

//     @Autowired
//     private LearningPlanRepository repo;

//     public LearningPlan create(LearningPlan plan) {
//         return repo.save(plan);
//     }

//     public List<LearningPlan> getAllByUser(Long userId) {
//         return repo.findByUserId(userId);
//     }

//     public LearningPlan update(Long id, LearningPlan updatedPlan) {
//         LearningPlan existing = repo.findById(id).orElseThrow();
//         existing.setTitle(updatedPlan.getTitle());
//         existing.setDescription(updatedPlan.getDescription());
//         existing.setResourceLink(updatedPlan.getResourceLink());
//         existing.setTimeline(updatedPlan.getTimeline());
//         return repo.save(existing);
//     }

//     public void delete(Long id) {
//         repo.deleteById(id);
//     }
// }
package com.photolearn.learningplatform1.service;

import com.photolearn.learningplatform1.entity.LearningPlan;
import com.photolearn.learningplatform1.repository.LearningPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningPlanService {

    @Autowired
    private LearningPlanRepository repo;

    public LearningPlan create(LearningPlan plan) {
        return repo.save(plan);
    }

    public List<LearningPlan> getAllByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public LearningPlan update(Long id, LearningPlan updatedPlan) {
        LearningPlan existing = repo.findById(id).orElseThrow();

        existing.setTitle(updatedPlan.getTitle());
        existing.setDescription(updatedPlan.getDescription());
        existing.setResourceLink(updatedPlan.getResourceLink());
        existing.setTimeline(updatedPlan.getTimeline());

        // ✅ ADD THIS LINE:
        existing.setTopicsJson(updatedPlan.getTopicsJson());

        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
