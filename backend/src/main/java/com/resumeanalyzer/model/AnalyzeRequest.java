package com.resumeanalyzer.model;

import jakarta.validation.constraints.NotBlank;

public record AnalyzeRequest(
        @NotBlank(message = "resumeText is required") String resumeText,
        @NotBlank(message = "jobDescription is required") String jobDescription
) {
}
