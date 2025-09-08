import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = {email, password };
try{
     const response = await fetch('http://localhost:5001/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data =await response.json()
            if(response.status == 200){
            console.log("login success! ",data)
            navigate('/')
            }else{
                console.log("err to login! ",data)
                setEmail('');
                setPassword('');
                navigate('/login')
            }
    }catch(err){
        console.log(err)
    }
    }

    return (
        <>
        <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">Email :</label>
                <input type="text" name='email' value={email} id='email' placeholder='Enter email here: ' onChange={(e) => setEmail(e.target.value)} /><br />
                <label htmlFor="password">Password :</label>
                <input type="text" name='password' value={password} id='password' placeholder='Enter password here: ' onChange={(e) => setPassword(e.target.value)} /><br />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Login