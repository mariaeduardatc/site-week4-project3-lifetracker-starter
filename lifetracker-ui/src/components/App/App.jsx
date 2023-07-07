import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import "./App.css";

import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from '../ActivityPage/ActivityPage'
import ExercisePage from "../ExercisePage/ExercisePage";
import ExerciseDashboard from "../ExerciseDashboard/ExerciseDashboard";
import SleepForm from "../SleepForm/SleepForm";
import SleepDashboard from "../SleepDashboard/SleepDashboard";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [appState, setAppState] = useState({});
  
  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsLogged(true);
          setAppState({ user: decodedToken.userName });
        } else {
          setIsLogged(false);
          setAppState({});
          localStorage.removeItem("token");
        }
      } else {
        setIsLogged(false);
        setAppState({});
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          user={appState.user}
          isLogged={isLogged}
          setAppState={setAppState}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth/login"
            element={<LoginPage setAppState={setAppState} setIsLogged={setIsLogged} appState={appState}/>}
          />
          <Route
            path="/auth/register"
            element={<RegistrationPage setAppState={setAppState} setIsLogged={setIsLogged} appState={appState}/>}
          />
          <Route
            path="/auth/activity"
            element={<ActivityPage setAppState={setAppState} appState={appState} user={appState?.user} isLogged={isLogged} />}
          />
          <Route
            path="/auth/exercise/create"
            element={<ExercisePage isLogged={isLogged} user={appState?.user} />}
          />
          <Route
            path="/auth/exercise"
            element={<ExerciseDashboard user={appState?.user} />}
          />
          <Route
            path="/auth/sleep/create"
            element={<SleepForm isLogged={isLogged} user={appState?.user}  />}
          />
          <Route
            path="/auth/sleep"
            element={<SleepDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
