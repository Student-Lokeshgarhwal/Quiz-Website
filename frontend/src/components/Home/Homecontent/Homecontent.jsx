import React from 'react'
import Infocard from '../Infocard/Infocard'
import { useNavigate } from 'react-router-dom'

function Homecontent({user}) {

    const navigate = useNavigate()
  return (
    <div className='home'>
      {console.log(user)}
    <h1>Online Quiz Maker</h1>
    <div className="content">
      <p className='content-head'>Build & Play Quizzes That Spark Curiosity</p>
    <p className='content-text'>Whether you're a teacher, trainer, or trivia lover—our platform lets you create custom quizzes or dive into challenges made by others. Fast, secure, and fun to use.
    </p>
    </div>
    <Infocard />
    <div className="button-section">
                  <button className="create-quiz-button" onClick={()=>navigate('/create-quiz')}>Create Quiz</button>
                  <button className="take-quiz-button" onClick={()=>navigate('/take-quiz')}>Take Quiz</button>
        </div>
    </div> 
  )
}

export default Homecontent