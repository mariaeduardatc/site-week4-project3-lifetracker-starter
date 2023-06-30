import { useState } from 'react'
import './NavLinks.css'
import { Link } from "react-router-dom"


function NavLinks( {setClickedLogin, setClickedRegister}) {

    function handleLoginButton(){
        setClickedLogin(true)
    }

    function handleRegisterButton(){
        setClickedRegister(true)
    }

  return (
    <nav className='navLinks'>
        <Link to="/activity">
            Activity
        </Link>
        <Link to="/exercise">
            Exercise
        </Link>
        <Link to="/nutrition">
            Nutrition
        </Link>
        <Link to="/sleep">
            Sleep
        </Link>
        <Link to="/auth/register">
            <button onClick={handleRegisterButton} className='btn' id='register'>Register</button> 
        </Link>
        <Link to="/auth/login">
            <button onClick={handleLoginButton} className='btn'>Sign In</button>
        </Link>
            
    </nav>
  )
}

export default NavLinks
