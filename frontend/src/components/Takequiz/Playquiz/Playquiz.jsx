import React, { useRef } from 'react'
import './Playquiz.css'

function Playquiz({Quizzes,count,clicked,correctAns,totalquiz,lastquiz,disableBtn,setDisableBtn,setFinishQuiz,setCount,setLastquiz,setTotalQuiz,setClicked,setCorrectAns}) {

      const optionRefs = {
        first: useRef(),
        second: useRef(),
        third: useRef(),
        fourth: useRef()
    };


    const optionHandler = async (e, option) => {
        if (!clicked) {
            setDisableBtn(false)
            console.log(option)
            try {
                const response = await fetch(`http://localhost:5001/quiz/${option}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                })
                const data = await response.json()
                console.log(data)
                const correctAnswer = data.correctAnswer
                if (response.status == 200) {
                    if (data.msg == "Correct Answer! ") {
                        e.target.style.backgroundColor = 'green'
                        setCorrectAns(correctAns + 1)
                    } else {
                        e.target.style.backgroundColor = 'red'
                        Object.values(optionRefs).forEach((ref) => {
                            if (ref.current && ref.current.innerText === correctAnswer) {
                                ref.current.style.backgroundColor = 'green';
                            }
                        });
                    }
                }
                setClicked(true)
            } catch (err) {
                console.log("error : ", err)
            }
        } else { return }
    }

    const nextQuizHandler = () => {
        optionRefs.first.current.style.backgroundColor = ''
        optionRefs.second.current.style.backgroundColor = ''
        optionRefs.third.current.style.backgroundColor = ''
        optionRefs.fourth.current.style.backgroundColor = ''
        if (count == Quizzes.length - 2) {
            setLastquiz(true)
        }
        setClicked(false)
        setDisableBtn(true)
        setCount(count + 1)
        setTotalQuiz(totalquiz + 1)
    }

    const finishTaskHandler = () => {
        setFinishQuiz(true)
        localStorage.setItem("QuizResult", JSON.stringify({
            correctAns: correctAns,
            totalquiz: totalquiz,
        }))
    }

    const quitquiz = () => { 
        finishTaskHandler() }


   return (
        <div className='container'>
            {
                Quizzes[count] &&
                <div className='quiz-container'>
                    <p className='question'>{Quizzes[count].question}</p>
                    <p className='options' ref={optionRefs.first} onClick={(e) => optionHandler(e, Quizzes[count].optionfirst)}>{Quizzes[count].optionfirst}</p>
                    <p className='options' ref={optionRefs.second} onClick={(e) => optionHandler(e, Quizzes[count].optionsecond)}>{Quizzes[count].optionsecond}</p>
                    <p className='options' ref={optionRefs.third} onClick={(e) => optionHandler(e, Quizzes[count].optionthird)}>{Quizzes[count].optionthird}</p>
                    <p className='options' ref={optionRefs.fourth} onClick={(e) => optionHandler(e, Quizzes[count].optionfourth)}>{Quizzes[count].optionfourth}</p>
                   <div className="allbtns">
                     { 
                        lastquiz ?
                            disableBtn ? <div className='btns'><button disabled>Finish</button></div> :
                               <div className='btns'> <button onClick={finishTaskHandler}>Finish</button></div> :

                            disableBtn ?
                                <div className='btns'>
                                   <div> <button disabled>Quit</button></div>
                                  <div>  <button disabled>Next</button></div>
                                </div> :
                                <div className='btns'>
                                  <div>  <button onClick={quitquiz}>Quit</button></div>
                                <div><button onClick={nextQuizHandler}>Next</button>
                                </div></div>
                    }
                   </div>
                </div>
            }

        </div>
    )
}

export default Playquiz