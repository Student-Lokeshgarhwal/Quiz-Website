import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Homecontent from './Homecontent/Homecontent'
import Header from '../Header/Header'

function Home() {

  const [loading,setLoading] = useState(true)
  const [user,setUser] = useState('')

  const navigate = useNavigate()

    useEffect(()=>{
     const fetchData=async()=>{
  try{
      
    const res = await fetch('http://localhost:5001',{
      method:'GET',
      headers:{
        'Content-Type':"application/json"
      },
      credentials:"include"
    })
    console.log(res)
    const data = await res.json()
    if(res.status != 200){
     return navigate('/login')
    }
    else{
      console.log("Welcome to home page! ",data)
      setUser(data.user)
    }
  }catch(err){
  console.log("err : ", err)
  navigate('/login')
}finally{
  setLoading(false)
}
}
fetchData();
  },[])

 return(
  <>
    <Header user={user} />
  { 
  loading ? 
  <div>Loading...</div>:
  <Homecontent 
  user={user}
  />
  }
  </>
 )
}

export default Home