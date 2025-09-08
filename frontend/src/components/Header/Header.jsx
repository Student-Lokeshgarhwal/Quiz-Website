import React, { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header({user}) {

    const navigate = useNavigate()

    const handleLogout =async (e)=>{
        console.log("clicked logout")
    try{
       const res = await fetch('http://localhost:5001/logout',{
            method:'GET',
            headers:{
                'Content-type':"application/json"
            },
            credentials:"include"
        })
        const data = await res.json()
        console.log("data : ",data)
        if(res.status == 200){
            localStorage.removeItem("QuizResult")
            navigate('/login')
        }
        
    }catch(err){
        console.log("err : ",err)
    }
}

    return (
        <>
            <div className="header">

                <div className="user">
                    <img src="/assets/profile.png" alt="" className='profileIcon'/>
                    {console.log(user)}
                    <p>{user.username}</p>
                </div>
                <div className="logout" onClick={handleLogout}>Logout</div>
            </div>
        </>
    )
}

export default Header