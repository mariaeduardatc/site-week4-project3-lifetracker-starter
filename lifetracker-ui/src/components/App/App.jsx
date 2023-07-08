import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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
import NutritionForm from "../NutritionForm/NutritionForm";
import NutritionDashboard from "../NutritionDashboard/NutritionDashboard"

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [appState, setAppState] = useState({});

  const [exerciseMinutes, setExerciseMinutes] = useState(0);
  const [avgCalories, setAvgCalories] = useState(0);
  const [sleepAvg, setSleepAvg] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);
  const [avgExercise, setAvgExercise] = useState(0);
  const [maxSleep, setMaxSleep] = useState(0);

  const statsActivity = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/activity/${appState.user}`);
      setExerciseMinutes(response.data.totalExercise);
      setAvgCalories(response.data.avgCalories);
      setSleepAvg(response.data.avgSleep);
      setMaxCalories(response.data.maxCalories);
      setAvgExercise(response.data.avgIntensity);
      setMaxSleep(response.data.totalSleep);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    statsActivity()
  }, [appState.user])

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsLogged(true);
          setAppState({ user: decodedToken.user_id });
        } else {
          setIsLogged(false);
          // setAppState({});
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
          setIsLogged={setIsLogged}
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
            element={<ActivityPage maxSleep={maxSleep} avgExercise={avgExercise} maxCalories={maxCalories} sleepAvg={sleepAvg} avgCalories={avgCalories} exerciseMinutes={exerciseMinutes} setAppState={setAppState} appState={appState} user={appState?.user} isLogged={isLogged} />}
          />
          <Route
            path="/auth/exercise/create"
            element={<ExercisePage statsActivity={statsActivity} isLogged={isLogged} user={appState?.user} />}
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
            element={<SleepDashboard user={appState?.user} />}
          />
          <Route
            path="/auth/nutrition/create"
            element={<NutritionForm isLogged={isLogged} user={appState?.user}  />}
          />
          <Route
            path="/auth/nutrition"
            element={<NutritionDashboard user={appState?.user} />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
