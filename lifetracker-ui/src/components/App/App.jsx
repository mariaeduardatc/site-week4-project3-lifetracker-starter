import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const [clickedLogin, setClickedLogin] = useState(false);
  const [clickedRegister, setClickedRegister] = useState(false);

  console.log(clickedLogin)

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          setClickedRegister={setClickedRegister}
          setClickedLogin={setClickedLogin}
        />
        {isLogged ? console.log("logged") : <LandingPage />}
        {clickedLogin ? (
          <LoginPage isLogged={isLogged} />
        ) : (
          <></>
        )}
        {clickedRegister ? (
          <RegistrationPage isLogged={isLogged} setIsLogged={setIsLogged} />
        ) : (
          <></>
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegistrationPage />} />
          {/* <Route path='/activity' element={<ActivityPage />}/> */}
          {/* <Route path='/nutrition/*' element={<NutritionPage />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
