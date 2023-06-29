import './RegistrationPage.css'


import ActivityPage from "../ActivityPage/ActivityPage";
import RegistrationForm from '../RegistrationForm/RegistrationForm';

function RegistrationPage({isLogged, setIsLogged}) {

  return (
    <div className="login-page">
      {isLogged ? <ActivityPage /> : <RegistrationForm />}
    </div>
  );
}

export default RegistrationPage;
