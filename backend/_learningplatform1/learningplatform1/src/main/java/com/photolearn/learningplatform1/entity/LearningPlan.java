package com.photolearn.learningplatform1.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private Long userId;
    private String title;
    private String description;
    private String resourceLink;
    private String timeline;
    private String status; // "Pending" or "Completed"

    @Lob
@Column(columnDefinition = "LONGTEXT")
private String topicsJson;

}
