
import "./LoginPage.css";

import ActivityPage from "../ActivityPage/ActivityPage";
import LoginForm from "../LoginForm/LoginForm";

function LoginPage({isLogged}) {
  console.log('im being rendered :)', isLogged)

  return (
    <div className="login-page">
      {isLogged ? <ActivityPage /> : <LoginForm />}
    </div>
  );
}

export default LoginPage;
