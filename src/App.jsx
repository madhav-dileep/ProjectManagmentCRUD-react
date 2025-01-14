import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Landing from './components/Landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


function App() {


  return (
    <>
      
      <Routes>
        <Route index element={<Landing />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
