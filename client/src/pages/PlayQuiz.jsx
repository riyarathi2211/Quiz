import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getQuiz, submitScore } from '../api'
import confetti from 'canvas-confetti'

export default function PlayQuiz() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)

  const startTime = Date.now()

  useEffect(() => {
    getQuiz(id).then(setQuiz)
  }, [id])

  useEffect(() => {
    if (timeLeft === 0) submitQuiz()
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  if (!quiz) return <div className="container">Loading...</div>

  function selectAnswer(qIndex, option) {
    setAnswers(prev => ({ ...prev, [qIndex]: option }))
  }

  async function submitQuiz() {
    let score = 0
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++
    })

    const percent = (score / quiz.questions.length) * 100
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    const username = prompt('Enter your name') || 'Anonymous'

    await submitScore({ quizId: id, username, score, timeTaken })

    if (percent >= 60) {
      confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
      })
    }

    navigate(`/leaderboard/${id}`)
  }

  const q = quiz.questions[current]
  const progress = ((current + 1) / quiz.questions.length) * 100

  return (
    <div className="container">
      <h2>{quiz.title}</h2>

      {/* PROGRESS BAR */}
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }} />
      </div>

      {/* TIMER */}
      <div className={`timer ${timeLeft < 10 ? 'danger' : ''}`}>
        ⏱ {timeLeft}s
      </div>

      {/* QUESTION */}
      <div className="quiz-question">
        <h3>{current + 1}. {q.question}</h3>

        {q.options.map((opt, idx) => {
          const selected = answers[current] === opt
          const correct = selected && opt === q.answer
          const wrong = selected && opt !== q.answer

          return (
            <div
              key={idx}
              className={`quiz-option 
                ${selected ? 'selected' : ''}
                ${correct ? 'correct' : ''}
                ${wrong ? 'wrong' : ''}
              `}
              onClick={() => selectAnswer(current, opt)}
            >
              {opt}
            </div>
          )
        })}
      </div>

      {/* NAVIGATION */}
      <div style={{ marginTop: 20 }}>
        {current < quiz.questions.length - 1 ? (
          <button className="btn" onClick={() => setCurrent(c => c + 1)}>
            Next →
          </button>
        ) : (
          <button className="submit-btn" onClick={submitQuiz}>
            Submit Quiz 🚀
          </button>
        )}
      </div>
    </div>
  )
}
