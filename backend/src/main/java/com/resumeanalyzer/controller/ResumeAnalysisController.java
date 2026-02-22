package com.resumeanalyzer.controller;

import com.resumeanalyzer.model.AnalysisResponse;
import com.resumeanalyzer.model.AnalyzeRequest;
import com.resumeanalyzer.service.PdfTextExtractorService;
import com.resumeanalyzer.service.ResumeAnalysisService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeAnalysisController {

    private final ResumeAnalysisService analysisService;
    private final PdfTextExtractorService pdfTextExtractorService;

    public ResumeAnalysisController(ResumeAnalysisService analysisService, PdfTextExtractorService pdfTextExtractorService) {
        this.analysisService = analysisService;
        this.pdfTextExtractorService = pdfTextExtractorService;
    }

    @PostMapping("/analyze")
    public AnalysisResponse analyzeResume(@Valid @RequestBody AnalyzeRequest request) {
        return analysisService.analyze(request.resumeText(), request.jobDescription());
    }

    @PostMapping(value = "/extract", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> extractPdf(@RequestParam("file") MultipartFile file) throws IOException {
        return Map.of("resumeText", pdfTextExtractorService.extractText(file));
    }
}
