import './RegistrationPage.css'


import ActivityPage from "../ActivityPage/ActivityPage";
import RegistrationForm from '../RegistrationForm/RegistrationForm';

function RegistrationPage({isLogged, setIsLogged, setAppState}) {

  return (
    <div className="login-page">
      {isLogged ? <ActivityPage /> : <RegistrationForm setAppState={setAppState}/>}
    </div>
  );
}

export default RegistrationPage;
