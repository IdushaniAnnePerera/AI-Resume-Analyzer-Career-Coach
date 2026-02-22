import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/resume'
})

export const extractResumeText = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post('/extract', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.resumeText
}

export const analyzeResume = async (resumeText, jobDescription) => {
  const response = await api.post('/analyze', { resumeText, jobDescription })
  return response.data
}
