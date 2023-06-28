import "./LoginForm.css";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="login-form">
        <input
            name="email"
            className="form-input"
            type="email"
            placeholder="Email"
            value={formUserEmail}
            onChange={handleInputEmail}
        ></input>
        <input
            name="password"
            className="form-input"
            type="text"
            placeholder="Password"
            value={formUserPassword}
            onChange={handleInputPassword}
        ></input>
    </div>
  );
}

export default LoginForm;
