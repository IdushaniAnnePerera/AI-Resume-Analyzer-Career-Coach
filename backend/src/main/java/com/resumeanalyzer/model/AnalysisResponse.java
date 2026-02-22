package com.resumeanalyzer.model;

import java.util.List;

public record AnalysisResponse(
        int atsScore,
        List<String> missingSkills,
        List<String> suggestions,
        List<String> improvedBulletPoints,
        String linkedinTitle,
        String extractedResumeText
) {
}
