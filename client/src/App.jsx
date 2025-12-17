import React from 'react'
// import { Routes, Route, Link } from 'react-router-dom'
// import Admin from './pages/Admin'
// import QuizList from './pages/QuizList'
// import PlayQuiz from './pages/PlayQuiz'
// import Leaderboard from './pages/Leaderboard'


// export default function App(){
// return (
// <div className="p-6 font-sans">
// <header className="mb-6">
// <Link to="/" className="text-2xl font-bold">MERN AI Quiz</Link>
// <nav className="mt-2">
// <Link className="mr-4" to="/admin">Admin</Link>
// <Link className="mr-4" to="/">Quizzes</Link>
// </nav>
// </header>


// <Routes>
// <Route path="/" element={<QuizList/>} />
// <Route path="/admin" element={<Admin/>} />
// <Route path="/quiz/:id" element={<PlayQuiz/>} />
// <Route path="/leaderboard/:id" element={<Leaderboard/>} />
// </Routes>
// </div>
// )
// }
import { Routes, Route, Link } from 'react-router-dom'
import Admin from './pages/Admin'
import QuizList from './pages/QuizList'
import PlayQuiz from './pages/PlayQuiz'
import Leaderboard from './pages/Leaderboard'

export default function App() {
  return (
    <>
      <div className="navbar">
        <h1>MERN AI Quiz</h1>
        <div>
          <Link to="/">Quizzes</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/quiz/:id" element={<PlayQuiz />} />
          <Route path="/leaderboard/:id" element={<Leaderboard />} />
        </Routes>
      </div>
    </>
  )
}
