import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLeaderboard } from '../api'

export default function Leaderboard() {
  const { id } = useParams()
  const [scores, setScores] = useState([])

  useEffect(() => {
    getLeaderboard(id).then(setScores)
  }, [id])

  const top3 = scores.slice(0, 3)
  const rest = scores.slice(3)

  return (
    <div className="container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>

      {/* TOP 3 STAIRS */}
      <div className="podium">
        {top3[1] && (
          <div className="podium-box second">
            <span className="emoji">🥈</span>
            <h3>{top3[1].username}</h3>
            <p>{top3[1].score} pts</p>
          </div>
        )}

        {top3[0] && (
          <div className="podium-box first">
            <span className="emoji">🥇</span>
            <h3>{top3[0].username}</h3>
            <p>{top3[0].score} pts</p>
          </div>
        )}

        {top3[2] && (
          <div className="podium-box third">
            <span className="emoji">🥉</span>
            <h3>{top3[2].username}</h3>
            <p>{top3[2].score} pts</p>
          </div>
        )}
      </div>

      {/* REST PLAYERS */}
      <div className="leaderboard">
        {rest.map((s, i) => (
          <div key={s._id} className="leaderboard-row">
            <div className="rank">#{i + 4}</div>
            <div className="player">{s.username}</div>
            <div className="score">{s.score} pts</div>
            <div className="time">⏱ {s.timeTaken}s</div>
          </div>
        ))}
      </div>

      <Link to="/" className="btn" style={{ marginTop: 30 }}>
        ← Back to Home
      </Link>
    </div>
  )
}
