import React from 'react'
import LandingPage from './Components/LandingPage'
import Quiz from './Components/Quiz'
import Results from './Components/Results'
import Feedback from './Components/Feedback'
import { Route,Routes } from 'react-router-dom'

const App = () => {
  return (
 
    <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/quiz' element={<Quiz/>}/>
    <Route path="/results" element={<Results />} />
    <Route path="/feedback" element={<Feedback />} />

    </Routes>

  )
}

export default App