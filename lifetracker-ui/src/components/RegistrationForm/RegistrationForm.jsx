import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationForm.css";

function RegistrationForm({ setAppState }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [register, setRegister] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  function handleRegister(e) {
    const { name, value } = e.target;
    setRegister((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const singupUser = async () => {
    console.log(register);
    setIsLoading(true);
    setErrors((e) => ({ ...e, register: null }));

    if (register.passwordConfirm !== register.password) {
      console.log("test");
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email: register.email,
        username: register.username,
        firstName: register.firstName,
        lastName: register.lastName,
        password: register.password,
      });
      if (response?.data?.user) {
        setAppState(response.data);
        setIsLoading(false);
        navigate("/portal");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="registration-form">
        <h2>Create your account!</h2>
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
        {errors.passwordConfirm && (
          <span className="error">{errors.passwordConfirm}</span>
        )}
        <button className="btn" onClick={singupUser} disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Account"}
        </button>
      </div>
    </>
  );
}

export default RegistrationForm;
