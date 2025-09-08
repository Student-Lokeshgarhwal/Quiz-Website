import React, { useState } from 'react'
import './Createquiz.css'
import { toast } from 'react-toastify'

function Createquiz() {

    const [question,setQuestion] = useState('')
    const [optionfirst,setOptionfirst] = useState('')
    const [optionsecond,setOptionsecond] = useState('')
    const [optionthird,setOptionthird] = useState('')
    const [optionfourth,setOptionfourth] = useState('')
    const [answer,setAnswer] = useState('')

    const createQuizSubmitHandler = async (e)=>{
        e.preventDefault();
        const formData = {question,optionfirst,optionsecond,optionthird,optionfourth,answer}
        try{
          const response = await fetch('http://localhost:5001/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
            credentials:"include"
           })
           const data = await response.json()
           console.log(data)
           if(response.status != 200){
           return toast.error(data.msg)
           }else{
            toast.success("Quiz Created Successfully! ")
            setQuestion('')
            setOptionfirst('')
            setOptionsecond('')
            setOptionthird('')
            setOptionfourth('')
            setAnswer('')
           }
        }catch(err){
            console.log(err)
            toast.error("Something went wrong while creating quiz")
        }
    }

  return (
    <div>
        <h1>Create Quiz</h1>
        <form onSubmit={createQuizSubmitHandler}>
          <div className="formcontent">
            <label htmlFor='question'>Question : </label><br />
            <input type="text" name="question" id='question' value={question} placeholder="Enter Quiz Question! " onChange={(e)=>setQuestion(e.target.value)}/><br />
            </div>
          <div className="formcontent">
            <label htmlFor='optionfirst'>Option First : </label><br />
            <input type="text" name="optionfirst" id='optionfirst' value={optionfirst} placeholder="Enter first option! " onChange={(e)=>setOptionfirst(e.target.value)}/><br />
</div>
          <div className="formcontent">
            <label htmlFor='optionsecond'>Option Scond :</label><br />
            <input type="text" name="optionsecond" id='optionsecond' value={optionsecond} placeholder="Enter second option! " onChange={(e)=>setOptionsecond(e.target.value)}/><br />
</div>
            <div className="formcontent">
            <label htmlFor='optionthird'>Option Third :</label><br />
            <input type="text" name="optionthird" id='optionthird' value={optionthird} placeholder="Enter third option! " onChange={(e)=>setOptionthird(e.target.value)}/><br />
</div>
              <div className="formcontent">
            <label htmlFor='optionfourth'>Option Fourth :</label><br />
            <input type="text" name="optionfourth" id='optionfourth' value={optionfourth} placeholder="Enter fourth option! " onChange={(e)=>setOptionfourth(e.target.value)}/><br />
</div>
            <div className="formcontent">
            <label htmlFor='answer'>Correct Answer : </label><br />
            <input type="text" name="answer" id='answer' value={answer} placeholder="Enter correct answer! " onChange={(e)=>setAnswer(e.target.value)}/><br />
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Createquiz