# AI Resume Analyzer & Career Coach (React + Spring Boot)

A complete full-stack project that helps users improve resumes for ATS systems and create stronger career positioning.

## Features
- Upload resume in **PDF** and extract text automatically.
- Analyze resume against a **job description**.
- Get:
  - ATS score
  - Missing skills
  - Suggested improvements
  - Improved bullet point
- Uses a **free AI approach** (local rule-based NLP/keyword intelligence)
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

