import axios from 'axios'


const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' })


export async function generateQuiz(prompt, title, numQuestions){
const res = await API.post('/quizzes/generate', { prompt, title, numQuestions })
return res.data
}
export async function listQuizzes(){
const res = await API.get('/quizzes')
return res.data
}
export async function getQuiz(id){
const res = await API.get(`/quizzes/${id}`)
return res.data
}
export async function submitScore(payload){
const res = await API.post('/leaderboard', payload)
return res.data
}
export async function getLeaderboard(quizId){
const res = await API.get(`/leaderboard/${quizId}`)
return res.data
}