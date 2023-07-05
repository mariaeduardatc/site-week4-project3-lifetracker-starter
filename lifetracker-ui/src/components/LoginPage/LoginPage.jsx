
import "./LoginPage.css";

import ActivityPage from "../ActivityPage/ActivityPage";
import LoginForm from "../LoginForm/LoginForm";

function LoginPage({isLogged, setAppState, setIsLogged}) {

  return (
    <div className="login-page">
      {isLogged ? <ActivityPage /> : <LoginForm setAppState={setAppState} setIsLogged={setIsLogged}/>}
    </div>
  );
}

export default LoginPage;
