import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';

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
            navigate('/')
            }else{
                setEmail('');
                setPassword('');
                navigate('/login')
            }
    }catch(err){
        console.log(err)
    }
    }

    return (
       <div className="loginbody">
         <div className='logincontainer'>
        <div className='loginleft-panel '>
            <p>Hello Users!</p>
            <p>Welcome back!</p>
        </div>
        <div className='loginright-panel'>
            <p><b>Login</b> to your account</p>
            <form onSubmit={submitHandler}>
                <input type="text" name='email' value={email} id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="text" name='password' value={password} id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
                    <button type='submit'>Login</button>
                    <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
            </form>
        </div>
        </div>
       </div>
    )
}

export default Login