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

  const [stats, setStats] = useState({
    exerciseMinutes: 0,
    avgCalories: 0,
    sleepAvg: 0,
    maxCalories: 0,
    avgExercise: 0,
    maxSleep: 0
  });

  const statsActivity = async () => {
    try {
      const response = await axios.get(`https://metc-lifetracker-be.onrender.com/auth/activity/${appState?.user}`);
      const { totalExercise, avgCalories, avgSleep, maxCalories, avgIntensity, totalSleep } = response.data;
      setStats({
        exerciseMinutes: totalExercise,
        avgCalories: avgCalories,
        sleepAvg: avgSleep,
        maxCalories: maxCalories,
        avgExercise: avgIntensity,
        maxSleep: totalSleep,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    statsActivity()
  }, [Object.values(stats)])

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
  }, [isLogged]);

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
            element={<ActivityPage maxSleep={stats.maxSleep} avgExercise={stats.avgExercise} maxCalories={stats.maxCalories} sleepAvg={stats.sleepAvg} avgCalories={stats.avgCalories} exerciseMinutes={stats.exerciseMinutes} setAppState={setAppState} appState={appState} user={appState?.user} isLogged={isLogged} />}
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
