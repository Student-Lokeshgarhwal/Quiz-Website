import React, { useState } from 'react'
import './Quizcomplete.css'
import Takequiz from '../Takequiz/Takequiz'
import { useNavigate } from 'react-router-dom'

function Quizcomplete({ correctAns, totalquiz }) {

    const [quizAgain, setQuizAgain] = useState(false)

    const navigate = useNavigate()

    const totalQues = totalquiz;
    const wrongAns = totalquiz - correctAns;
    const percent = Math.round((correctAns / totalquiz) * 100);

    const quizAgainHandler = () => {
        localStorage.removeItem("QuizResult");
        setQuizAgain(true)
    }


    if (quizAgain) return <Takequiz />

    return (
        <div className='quizcomplete'>
            <h1>Quiz Results</h1>
            {percent >= 60 ?
                <div className='result-content'>
                    <img src="assets/pass.png" alt="passImage" />
                    <small>Good Job ! You have passed the quiz</small>
                </div> :
                <div className='result-content'>
                    <img src="assets/fail.png" alt="failImage" />
                    <small>Sorry ! You have failed the quiz</small> 
                </div>
            }
            <div className="quizscore">
                <table border={"1"}>
                    <tbody>
                        <tr>
                            <th>Total Questions</th>
                            <td>{totalQues}</td>
                        </tr>
                        <tr>
                            <th>Attempted</th>
                            <td>{totalQues}</td>
                        </tr>
                        <tr>
                            <th>Correct Answers</th>
                            <td>{correctAns}</td>
                        </tr>
                        <tr>
                            <th>Wrong Answers</th>
                            <td>{wrongAns}</td>
                        </tr>
                        <tr>
                            <th>Total Score</th>
                            <td>{correctAns}/{totalQues}</td>
                        </tr>
                        <tr>
                            <th>Percentage</th>
                            <td>{percent}%</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Result</th>
                            <td>{percent >= 60 ? "Pass" : "Fail"}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='quizresultBtns'>
                <button onClick={() => navigate('/')}>Go To Home</button>
                <button onClick={quizAgainHandler}>Take Quiz Again</button>
            </div>
        </div>
    )
}

export default Quizcomplete