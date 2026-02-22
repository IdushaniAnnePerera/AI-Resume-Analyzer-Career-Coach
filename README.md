# AI Resume Analyzer & Career Coach (React + Spring Boot)

A complete full-stack project that helps users improve resumes for ATS systems and create stronger career positioning.

## ✅ Features
- Upload resume in **PDF** and extract text automatically.
- Analyze resume against a **job description**.
- Get:
  - ATS score
  - Missing skills
  - Suggested improvements
  - Improved bullet points
  - LinkedIn headline suggestion
- Uses a **free AI approach** (local rule-based NLP/keyword intelligence), so no paid API key is required.

## Tech Stack
- **Frontend:** React + Vite + Axios
- **Backend:** Spring Boot 3 + Java 17 + PDFBox

## Project Structure
- `frontend` → React app
- `backend` → Spring Boot API

---

## Run Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs at `http://localhost:8080`

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

---

## API Endpoints
### 1) Extract text from PDF
`POST /api/resume/extract` (multipart/form-data)
- field: `file`

### 2) Analyze resume
`POST /api/resume/analyze`
```json
{
  "resumeText": "...",
  "jobDescription": "..."
}
```

---

## LinkedIn Project Title (High Value)
**Built an AI Resume Analyzer that improves ATS score, detects missing skills, and suggests career improvements using React + Spring Boot.**

You can paste this in your LinkedIn Projects section.
