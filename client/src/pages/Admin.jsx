import React, { useState } from 'react'
import { generateQuiz } from '../api'

export default function Admin() {
  const [prompt, setPrompt] = useState('')
  const [num, setNum] = useState(5)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function onGenerate(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const quiz = await generateQuiz(prompt, prompt, num)
      setResult(quiz)
    } catch (err) {
      alert('Failed: ' + (err?.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="admin-card">
        <h2 className="text-2xl mb-4">⚙️ Admin – Generate Quiz</h2>

        <form onSubmit={onGenerate}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Enter quiz topic or instructions"
            rows={4}
          />

          <div style={{ marginTop: 14 }}>
            <label>Number of Questions</label>
            <input
              type="number"
              value={num}
              onChange={e => setNum(Number(e.target.value))}
              min={1}
              max={20}
            />
          </div>

          <button className="btn" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </form>
      </div>

      {result && (
        <div className="admin-card" style={{ marginTop: 40 }}>
          <h3 className="text-xl mb-3">📋 Quiz Preview</h3>

          {result.questions.map((q, i) => (
            <div key={i} className="preview-question">
              <strong>{i + 1}. {q.question}</strong>
              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx} style={{ color: opt === q.answer ? '#22d3ee' : '#94a3b8' }}>
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
