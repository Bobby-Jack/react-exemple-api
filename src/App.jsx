import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import SearchResult from './pages/SearchResult'
function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductDetail/>}/>
      <Route path='/search/:token' element={<SearchResult/>}/>
    </Routes>
  )
}

export default App
