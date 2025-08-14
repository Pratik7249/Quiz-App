import { useState } from 'react'
import './App.css'
import StartPage from './pages/StartPage'
import QuizPage from './pages/QuizPage'
import ReportPage from './pages/ReportPage'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/report" element={<ReportPage />} />
        {/* default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
