import './RegistrationPage.css'


import ActivityPage from "../ActivityPage/ActivityPage";
import RegistrationForm from '../RegistrationForm/RegistrationForm';

function RegistrationPage({isLogged, setIsLogged, setAppState, appState}) {
  console.log('reg page', appState?.user)
  return (
    <div className="login-page">
      {isLogged ? <ActivityPage user={appState?.user}/> : <RegistrationForm setAppState={setAppState} setIsLogged={setIsLogged}/>}
    </div>
  );
}

export default RegistrationPage;
