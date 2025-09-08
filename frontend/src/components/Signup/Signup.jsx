import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = { name, email, password, username };
try{
       const res = await fetch('http://localhost:5001/signup', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
           const data = await res.json()

           if(res.status != 200){
            alert(data.msg)
            navigate('/signup')
           }else{
            alert(data.msg)
            navigate('/')
           }
        }catch(err){
            alert("server side error! ")
        }
        }
    return (
        <>
        <h1>Signup</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name :</label>
                <input type="text" name='name' id='name' value={name} placeholder='Enter name here: ' onChange={(e) => setName(e.target.value)} /><br />
                <label htmlFor="email">Email :</label>
                <input type="text" name='email' value={email} id='email' placeholder='Enter email here: ' onChange={(e) => setEmail(e.target.value)} /><br />
                <label htmlFor="password">Password :</label>
                <input type="text" name='password' value={password} id='password' placeholder='Enter password here: ' onChange={(e) => setPassword(e.target.value)} /><br />
                <label htmlFor="username">Username :</label>
                <input type="text" name='username' value={username} id='username' placeholder='Enter username here: ' onChange={(e) => setUsername(e.target.value)} /><br />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Signup