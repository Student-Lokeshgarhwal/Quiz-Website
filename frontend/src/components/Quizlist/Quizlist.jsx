import React, { useEffect, useState } from 'react'
import './Quizlist.css'
import Quizcard from './Quizcard/Quizcard'

function Quizlist() {

    const [allQuiz, setAllQuiz] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchQuizList = async () => {
            await fetch('https://quiz-website-rgfk.onrender.com/quiz', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.quizzes)
                    setAllQuiz(data.quizzes)
                })
        }
        fetchQuizList();
    }, [])

    return (
       <div className='quizListContainer'>
       <div className='tableOfContent'>
        <h2>Table Of List</h2>
        {allQuiz.map((quiz,i)=>{
            return(
                <p key={i} onClick={()=>setCount(i)}>Question {i+1}</p>
            )
        })}
       </div>
        <div className='quizList'>
            {allQuiz[count]  ?
            <Quizcard quiz={allQuiz[count]}/>:<div>Fetching Quiz List...</div>
            }
        </div>
       </div>
    )
}

export default Quizlist