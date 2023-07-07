
import "./LoginPage.css";

import ActivityPage from "../ActivityPage/ActivityPage";
import LoginForm from "../LoginForm/LoginForm";

function LoginPage({isLogged, setAppState, setIsLogged, appState}) {
  console.log('login page', appState?.user)

  return (
    <div className="login-page">
      {isLogged ? <ActivityPage user={appState?.user}/> : <LoginForm setAppState={setAppState} setIsLogged={setIsLogged}/>}
    </div>
  );
}

export default LoginPage;
