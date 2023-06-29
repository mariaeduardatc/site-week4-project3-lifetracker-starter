import { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [errors, setErrors] = useState({})
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  function handleLogin(e){
    const { name, value } = e.target
    setLogin((prevUser) => ({
        ...prevUser,
        [name]: value
    }))
  }

  const loginUser = async () => {
    try{
      const response = await axios.post("http://localhost:3001/auth/login")
      if (response?.data) {
        setAppState(res.data)
        // setIsLoading(false)
        navigate("/")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
        setIsLoading(false)
      }

    } catch(err){
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      // setIsLoading(false)
    }
  }
 
  return (
    <div className="login-form">
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
    </div>
  );
}

export default LoginForm;
