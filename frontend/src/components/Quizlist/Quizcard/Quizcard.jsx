import React from 'react'
import './Quizcard.css'

function Quizcard({quiz,i}) {
  return (
    <div className='quizcard'>
        <p className='quizcard-ques'>{`${i+1}. ${quiz.question}`}</p>
        <p className='quizcard-text'>{`→ ${quiz.optionfirst}`}</p>
        <p className='quizcard-text'>{`→ ${quiz.optionsecond}`}</p>
        <p className='quizcard-text'>{`→ ${quiz.optionthird}`}</p>
        <p className='quizcard-text'>{`→ ${quiz.optionfourth}`}</p>
    </div>
  )
}

export default Quizcard