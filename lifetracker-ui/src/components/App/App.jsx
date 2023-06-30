import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from '../ActivityPage/ActivityPage'

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const [clickedLogin, setClickedLogin] = useState(false);
  const [clickedRegister, setClickedRegister] = useState(false);

  const [appState, setAppState] = useState({})

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          setClickedRegister={setClickedRegister}
          setClickedLogin={setClickedLogin}
          user= {appState.user}
        />
        {/* {isLogged ? console.log("logged") : <LandingPage />}
        {clickedLogin ? (
          <LoginPage isLogged={isLogged} />
        ) : (
          <></>
        )}
        {clickedRegister ? (
          <RegistrationPage isLogged={isLogged} setIsLogged={setIsLogged} />
        ) : (
          <></>
        )} */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage setAppState={setAppState}/>} />
          <Route path="/auth/register" element={<RegistrationPage setAppState={setAppState}/>} />
          <Route
            path="/portal"
            element={<ActivityPage setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
          {/* <Route path='/activity' element={<ActivityPage />}/> */}
          {/* <Route path='/nutrition/*' element={<NutritionPage />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
