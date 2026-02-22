// src/App.jsx
import { useState } from "react";
import ResultsPanel from "./components/ResultsPanel";
import { analyzeResume, extractResumeText } from "./services/api";

export default function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    try {
      let text = resumeText;
      if (resumeFile) {
        text = await extractResumeText(resumeFile);
        setResumeText(text);
      }
      const analysis = await analyzeResume(text, jobDescription);
      setResult(analysis);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to analyze resume. Ensure backend is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setResumeFile(null);
    setResumeText("");
    setJobDescription("");
    setResult(null);
    setError("");
  };

  return (
    <div className="page">
      <header className="topBar">
        <div className="brand">
          <div className="logo">AI</div>
          <div>
            <h1 className="brandTitle">Resume Analyzer</h1>
            <p className="brandSub">ATS score • missing skills • bullet upgrades</p>
          </div>
        </div>
        <div className="topActions">
          <button className="ghostBtn" onClick={clearAll}>
            Reset
          </button>
          <a className="ghostBtn" href="#" onClick={(e) => e.preventDefault()}>
            Docs
          </a>
        </div>
      </header>

      <main className="layout">
        <section className="card">
          <h2 className="cardHeading">Input</h2>
          <p className="muted">
            Upload a PDF or paste your resume text. Add a job description for matching.
          </p>

          <div className="field">
            <label>Upload Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            />
            {resumeFile && <div className="filePill">Selected: {resumeFile.name}</div>}
          </div>

          <div className="field">
            <label>Or Paste Resume Text</label>
            <textarea
              rows="9"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste resume text here..."
            />
          </div>

          <div className="field">
            <label>Job Description</label>
            <textarea
              rows="9"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste target job description here..."
            />
          </div>

          <div className="btnRow">
            <button
              className="primaryBtn"
              disabled={loading || (!resumeFile && !resumeText) || !jobDescription}
              onClick={handleAnalyze}
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
            <button className="ghostBtn" onClick={() => setResult(null)} disabled={loading}>
              Clear Result
            </button>
          </div>

          {error && <div className="errorBox">{error}</div>}
        </section>

        <section>
          <ResultsPanel result={result} />
          {!result && (
            <div className="emptyState">
              <h3>No results yet</h3>
              <p className="muted">
                Add a job description and your resume, then click <strong>Analyze Resume</strong>.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <span className="muted">Built with React + Spring Boot • ATS-style keyword matching</span>
      </footer>
    </div>
  );
}