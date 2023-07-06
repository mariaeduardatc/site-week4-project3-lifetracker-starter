import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

import "./LoginForm.css";

function LoginForm({setAppState, setIsLogged}) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  function handleLogin(e){
    const { name, value } = e.target
    setLogin((prevUser) => ({
        ...prevUser,
        [name]: value
    }))
  }

  const loginUser = async () => {
    try{
      const response = await axios.post("http://localhost:3001/auth/login", login)
      if (response?.data) {
        setAppState(response.data)
        setLogin(false)
        setIsLogged(true)
        navigate("/activity")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
        setIsLoading(false)
      }

    } catch(err){
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }
 
  return (
    <div className="login-form">
      <h2>Login</h2>
        <input
            name="email"
            className="form-input"
            type="email"
            placeholder="Email"
            value={setLogin.email}
            onChange={handleLogin}
        ></input>
        <input
            name="password"
            className="form-input"
            type="text"
            placeholder="Password"
            value={setLogin.password}
            onChange={handleLogin}
        ></input>
        <button className="btn" disabled={isLoading} onClick={loginUser}>{isLoading ? "Loading..." : "Login"}</button>
    </div>
  );
}

export default LoginForm;
