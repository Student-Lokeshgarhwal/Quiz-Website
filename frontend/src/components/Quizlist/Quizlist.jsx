import React, { useEffect, useState } from 'react'
import './Quizlist.css'
import Quizcard from './Quizcard/Quizcard'

function Quizlist() {

    const [allQuiz, setAllQuiz] = useState([])

    useEffect(() => {
        const fetchQuizList = async () => {
            await fetch('http://localhost:5001/quiz', {
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
        <div>
            <h1>List of Quizzes</h1>
            {allQuiz ?

                allQuiz.map((quiz,i) => {
                    return (
                    <Quizcard quiz={quiz} key={quiz._id} i={i}/>
                )})
                : 'Fetching Quiz List...'}
        </div>
    )
}

export default Quizlist