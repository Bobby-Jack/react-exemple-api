import React from 'react'
import { Link } from 'react-router-dom'
import "./DefaultTemplate.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function DefaultTemplate({children}) {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
  return (
    <div className='template'>
        <nav className='navBar'>
            <Link to={"/"}>HOME</Link>
            <div>
                <input onChange={(e)=>{setSearchValue(e.target.value)}} type="text" />
                <button onClick={()=>{navigate('/search/'+searchValue)}}>search</button>
            </div>
        </nav>
        <div className='container'>
            {children}
        </div>
        <div className='footer'>
            made with proud by Ryad
        </div>
    </div>
  )
}
