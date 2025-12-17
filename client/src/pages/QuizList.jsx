// import React, { useEffect, useState } from 'react'
// import { listQuizzes } from '../api'
// import { Link } from 'react-router-dom'


// export default function QuizList(){
// const [quizzes, setQuizzes] = useState([])
// useEffect(()=>{ listQuizzes().then(setQuizzes) }, [])
// return (
// <div>
// <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>
// <ul>
// {quizzes.map(q=> (
// <li key={q._id} className="mb-3">
// <Link to={`/quiz/${q._id}`} className="font-medium">{q.title}</Link>
// <div className="text-sm text-gray-600">{q.questions.length} questions</div>
// </li>
// ))}
// </ul>
// </div>
// )
// }
import React, { useEffect, useState } from 'react'

import { listQuizzes } from '../api'
import { Link } from 'react-router-dom'

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    listQuizzes().then(setQuizzes)
  }, [])

  return (
    <>
      <h2>Available Quizzes</h2>

      <div className="grid">
        {quizzes.map(q => (
          <div key={q._id} className="card">
            <h3>{q.title}</h3>
            <p>{q.questions.length} questions</p>
            <Link className="btn" to={`/quiz/${q._id}`}>
              Play Quiz →
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}


