import React from 'react'
import './Infocard.css'
import { Link } from 'react-router-dom'

function Infocard() {
  return (
    <>
    <div className="card">
      <h2 className="card-title">Challenge Minds, Create Moments</h2>
      <p className="card-description">
        Empower learners with interactive quizzes that adapt to their pace. Perfect for educators, trainers, and curious minds alike. Build custom quizzes that engage, educate, and entertain. Whether you're testing knowledge or sparking curiosity, our platform makes it simple and fun. <Link to='/quiz'className='quizlist'>Quiz List</Link> 
      </p>

    </div>
    </>
  )
}

export default Infocard