package com.photolearn.learningplatform1.entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Topic {
    private String name;
    private String resourceUrl;
    private String targetDate;
    private boolean completed;
}
