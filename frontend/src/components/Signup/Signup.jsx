import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = { name, email, password, username };
        try {
            const res = await fetch('https://quiz-website-rgfk.onrender.com/signup', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (res.status != 200) {
                toast.success(data.msg)
                navigate('/signup')
            } else {
                toast.success(data.msg)
                navigate('/')
            }
        } catch (err) {
            toast.error("server side error! ")
        }
    }
    return (
        <div className="signupbody">
            <div className='signupcontainer'>
                <div className='left-part'>
                    <p className='lefthead'>Create your account</p>
                    <form onSubmit={submitHandler} >
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' id='name' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' value={email} id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br />
                        <label htmlFor="password">Password</label>
                        <input type="text" name='password' value={password} id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' value={username} id='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} /><br />
                        <button type='submit'>Signup</button>
                    </form>
                </div>
                <div className="right-part">
                    <h1>Signup</h1>
                        <p>Already have an account?<small onClick={()=>{navigate('https://quiz-website-rgfk.onrender.com/login')}}>Login</small></p>
                </div>
            </div>
        </div>
    )
}

export default Signup