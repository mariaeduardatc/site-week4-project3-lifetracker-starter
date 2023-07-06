import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from '../ActivityPage/ActivityPage'
import ExercisePage from "../ExercisePage/ExercisePage";
import ExerciseDashboard from "../ExerciseDashboard/ExerciseDashboard";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [appState, setAppState] = useState({})

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          user= {appState.user}
          isLogged = {isLogged}
          setAppState = {setAppState}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage setAppState={setAppState} setIsLogged ={setIsLogged}/>} />
          <Route path="/auth/register" element={<RegistrationPage setAppState={setAppState} setIsLogged={setIsLogged}/>} />
          <Route
            path="/activity"
            element={<ActivityPage setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
          <Route path="/auth/exercise/create" element={<ExercisePage isLogged={isLogged}/>}/>
          <Route path="/exercise" element={<ExerciseDashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
