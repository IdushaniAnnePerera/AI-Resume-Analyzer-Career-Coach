package com.resumeanalyzer.service;

import com.resumeanalyzer.model.AnalysisResponse;
import com.resumeanalyzer.util.SkillDictionary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ResumeAnalysisService {

    public AnalysisResponse analyze(String resumeText, String jobDescription) {
        String resume = normalize(resumeText);
        String jd = normalize(jobDescription);

        Set<String> requiredSkills = SkillDictionary.CORE_SKILLS.stream()
                .filter(jd::contains)
                .collect(Collectors.toCollection(java.util.LinkedHashSet::new));

        if (requiredSkills.isEmpty()) {
            requiredSkills = Set.of("communication", "problem solving", "teamwork");
        }

        List<String> missingSkills = requiredSkills.stream()
                .filter(skill -> !resume.contains(skill))
                .toList();

        int matched = requiredSkills.size() - missingSkills.size();
        int atsScore = Math.max(35, Math.min(98, (int) ((matched * 100.0) / requiredSkills.size())));

        List<String> suggestions = buildSuggestions(missingSkills, atsScore, resumeText);
        List<String> improvedBullets = improveBulletPoints(resumeText, jd);
        String linkedinTitle = generateLinkedinTitle(jd, atsScore);

        return new AnalysisResponse(
                atsScore,
                missingSkills,
                suggestions,
                improvedBullets,
                improvedBullets, linkedinTitle,
                resumeText);
    }

    private String normalize(String text) {
        return text == null ? "" : text.toLowerCase(Locale.ROOT).replaceAll("\\s+", " ");
    }

    private List<String> buildSuggestions(List<String> missingSkills, int atsScore, String resumeText) {
        List<String> suggestions = new ArrayList<>();

        if (!missingSkills.isEmpty()) {
            suggestions.add("Add a dedicated Skills section and include: " + String.join(", ", missingSkills));
        }

        if (!resumeText.matches("(?s).*(?:\\d+%|\\$\\d+|\\d+\\+).*")) {
            suggestions.add(
                    "Quantify impact using numbers (%, $, time saved, users served) in each project/experience bullet.");
        }

        if (atsScore < 70) {
            suggestions.add(
                    "Mirror exact keywords from the job description in experience bullets to improve ATS keyword match.");
        }

        suggestions.add("Use the format: Action Verb + Task + Tech + Measurable Result for stronger bullets.");
        suggestions.add("Keep resume to 1 page for early career roles and place the strongest projects on top.");

        return suggestions;
    }

    private List<String> improveBulletPoints(String resumeText, String jobDescription) {
        Pattern bulletPattern = Pattern.compile("(?m)^(?:-|•|\\*)\\s*(.+)$");
        Matcher matcher = bulletPattern.matcher(resumeText);
        List<String> originalBullets = new ArrayList<>();

        while (matcher.find()) {
            originalBullets.add(matcher.group(1).trim());
        }

        if (originalBullets.isEmpty()) {
            originalBullets.add("Built and deployed full-stack features for internal users.");
            originalBullets.add("Collaborated with team members to improve application performance.");
        }

        return originalBullets.stream().limit(4).map(b -> "Improved " + b.replaceAll("\\.$", "") +
                " using tools aligned with job requirements, delivering measurable business impact.").toList();
    }

    private String generateLinkedinTitle(String jd, int atsScore) {
        String role = "Software Engineer";
        if (jd.contains("data"))
            role = "Data Analyst";
        if (jd.contains("machine learning") || jd.contains("ai"))
            role = "AI Engineer";
        if (jd.contains("full stack"))
            role = "Full-Stack Developer";

        return role + " | ATS-Optimized Resume Builder | Projects in React + Spring Boot | Score " + atsScore + "/100";
    }
}
