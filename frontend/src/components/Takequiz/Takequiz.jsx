import React, { useEffect, useState, useRef } from 'react'
import './Takequiz.css'
import { useNavigate } from 'react-router-dom'
import Quizcomplete from '../Quizcomplete/Quizcomplete'
import { toast } from 'react-toastify'
import Playquiz from './Playquiz/Playquiz'

function Takequiz() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [Quizzes, setQuizzes] = useState([])
    const [clicked, setClicked] = useState(false)
    const [correctAns, setCorrectAns] = useState(0)
    const [count, setCount] = useState(0)
    const [disableBtn, setDisableBtn] = useState(true)
    const [lastquiz, setLastquiz] = useState(false)
    const [totalquiz, setTotalQuiz] = useState(1)
    const [finishquiz, setFinishQuiz] = useState(false)

    const navigate = useNavigate()

 const hasInitialized = useRef(false); 

useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      const res = await fetch('http://localhost:5001/quiz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const data = await res.json();
      setQuizzes(data.quizzes);
    } catch (err) {
      setError("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  const quizResult = localStorage.getItem("QuizResult");
  console.log(quizResult); 

  if (quizResult && !hasInitialized.current) {
    const { correctAns, totalquiz } = JSON.parse(quizResult);
    setCorrectAns(correctAns);
    setTotalQuiz(totalquiz);
    setFinishQuiz(true);
    setLoading(false);
    hasInitialized.current = true; 
  } else {
    fetchQuizzes();
  }
}, []);

  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return(
        finishquiz? <Quizcomplete 
        correctAns={correctAns}
         totalquiz={totalquiz} 
         />:
        <Playquiz 
        Quizzes={Quizzes}
        count={count}
        clicked={clicked}
        correctAns={correctAns}
        totalquiz={totalquiz}
        lastquiz={lastquiz}
        disableBtn={disableBtn}
        setDisableBtn={setDisableBtn} 
        setFinishQuiz={setFinishQuiz} 
        setCount={setCount}
        setLastquiz={setLastquiz} 
        setTotalQuiz={setTotalQuiz} 
        setClicked={setClicked}
        setCorrectAns={setCorrectAns}
        />
    )
   

}
export default Takequiz