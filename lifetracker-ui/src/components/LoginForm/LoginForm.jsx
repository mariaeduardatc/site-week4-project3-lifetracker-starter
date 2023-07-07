import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./LoginForm.css";

function LoginForm({ setAppState, setIsLogged }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(e) {
    const { name, value } = e.target;
    setLogin((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        login
      );
      if (response?.data) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setAppState(response.data);
        setIsLogged(true);
        navigate("/auth/activity");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid username/password combination",
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
        type="password"
        placeholder="Password"
        value={setLogin.password}
        onChange={handleLogin}
      ></input>
      <button className="btn" disabled={isLoading} onClick={loginUser}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

export default LoginForm;
