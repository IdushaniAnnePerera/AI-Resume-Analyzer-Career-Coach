import { useState } from 'react'
import ResultsPanel from './components/ResultsPanel'
import { analyzeResume, extractResumeText } from './services/api'

export default function App() {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    setError('')
    setLoading(true)
    try {
      let text = resumeText
      if (resumeFile) {
        text = await extractResumeText(resumeFile)
        setResumeText(text)
      }
      const analysis = await analyzeResume(text, jobDescription)
      setResult(analysis)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to analyze resume. Ensure backend is running on port 8080.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <h1>AI Resume Analyzer & Career Coach</h1>
      <p className="sub">Upload your resume, compare with a job description, and get ATS-focused improvements.</p>

      <label>Upload Resume (PDF)</label>
      <input type="file" accept="application/pdf" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />

      <label>Or Paste Resume Text</label>
      <textarea rows="8" value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste resume text here..." />

      <label>Job Description</label>
      <textarea rows="8" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste target job description here..." />

      <button disabled={loading || (!resumeFile && !resumeText) || !jobDescription} onClick={handleAnalyze}>
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {error && <p className="error">{error}</p>}

      <ResultsPanel result={result} />
    </main>
  )
}
