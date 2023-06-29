import { useState } from "react";
import axios from 'axios';
import "./RegistrationForm.css";

function RegistrationForm({setAppState}) {
    const [errors, setErrors] = useState({})
    const [register, setRegister] = useState({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
    })


    function handleRegister(e){
        const { name, value } = e.target
        setRegister((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }


    const singupUser = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/auth/register", {
                    email: register.email,
                    username: register.username,
                    firstName: register.firstName,
                    lastName: register.lastName,
                    password: register.password
                }
            )
            if (response?.data?.user){
                setAppState(res.data)
                // setIsLoading(false)
                navigate("/")
            }
            else{
                setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
            }
        } catch (err) {
            console.log(err)
            const message = err?.response?.data?.error?.message
            setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
        }
        
    }

  return (
    <div className="registration-form">
        <input
            name="email"
            className="form-input"
            type="email"
            placeholder="Email"
            value={register.email}
            onChange={handleRegister}
        ></input>
        <input
            name="username"
            className="form-input"
            type="text"
            placeholder="Username"
            value={register.username}
            onChange={handleRegister}
        ></input>
        <input
            name="firstName"
            className="form-input"
            type="email"
            placeholder="First Name"
            value={register.firstName}
            onChange={handleRegister}
        ></input>
        <input
            name="lastName"
            className="form-input"
            type="text"
            placeholder="Last Name"
            value={register.lastName}
            onChange={handleRegister}
        ></input>
        <input
            name="password"
            className="form-input"
            type="password"
            placeholder="Password"
            value={register.password}
            onChange={handleRegister}
        ></input>
        <input
            name="passwordConfirm"
            className="form-input"
            type="password"
            placeholder="Password Confirm"
            value={register.passwordConfirm}
            onChange={handleRegister}
        ></input>
        <button className="submit-registration" onClick={singupUser}>Create Account</button>
    </div>
  );
}

export default RegistrationForm;
