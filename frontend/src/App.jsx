import React from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import './App.css'
import Createquiz from './components/Createquiz/Createquiz';
import Quizlist from './components/Quizlist/Quizlist';
import Takequiz from './components/Takequiz/Takequiz';
import Quizcomplete from './components/Quizcomplete/Quizcomplete';


function App(){

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/quiz' element={<Quizlist />} />
      <Route path='/create-quiz' element={<Createquiz />} />
      <Route path='/take-quiz' element={<Takequiz />} />
      <Route path='/quizcomplete' element={<Quizcomplete />} />


    </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000}/>
    </>
  )
}

export default App;