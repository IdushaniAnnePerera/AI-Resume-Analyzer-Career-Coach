package com.resumeanalyzer.util;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public final class SkillDictionary {
    private SkillDictionary() {}

    public static final Set<String> CORE_SKILLS = new LinkedHashSet<>(List.of(
            "java", "spring boot", "react", "javascript", "typescript", "sql", "aws", "docker",
            "kubernetes", "rest api", "microservices", "git", "ci/cd", "python", "machine learning",
            "nlp", "data analysis", "mongodb", "redis", "communication", "leadership"
    ));
}
