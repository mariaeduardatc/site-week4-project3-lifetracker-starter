import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExercisePage.css";

function ExercisePage({ isLogged, user, statsActivity }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [exerciseInput, setExerciseInput] = useState({
    name: "",
    category: "",
    duration: null,
    intensity: null,
    userId: user,
  });

  function handleExerciseInput(e) {
    const { name, value } = e.target;
    statsActivity()
    setExerciseInput((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleIncrease = (field) => {
    setExerciseInput((prevUser) => ({
      ...prevUser,
      [field]: prevUser[field] + 1,
    }));
  };

  const handleDecrease = (field) => {
    setExerciseInput((prevUser) => ({
      ...prevUser,
      [field]:
        prevUser[field] === 0 ? (prevUser[field] = 0) : prevUser[field] - 1,
    }));
  };

  const registerExercise = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, exerciseInput: null }));

    if (
      exerciseInput.name === "" ||
      exerciseInput.category === "Select" ||
      exerciseInput.duration === 0 ||
      exerciseInput.intensity === 0
    ) {
      setErrors((e) => ({ ...e, exerciseInput: "Fill all sections" }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, exerciseInput: null }));
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/exercise/create",
        exerciseInput
      );

      if (response?.data?.exercise) {
        setIsLoading(false);
        navigate("/auth/exercise");
      } else {
        setErrors((e) => ({
          ...e,
          exerciseInput: "Something went wrong with creating a new exercise",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        exerciseInput: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };


  const exerciseFormBody = isLogged ? (
    <div className="activity-page" id="activity-exercise">
      <div className="activity-title">
        <h1>Exercise</h1>
      </div>
      <div className="activity-main">
        <div className="activity-sub-title">
          <h4>Record Exercise</h4>
        </div>
        <div className="activity-form">
          <input
            name="name"
            className="form-input"
            type="text"
            placeholder="Name"
            id="name"
            value={exerciseInput.name}
            onChange={handleExerciseInput}
          ></input>
          <select
            value={exerciseInput.category}
            onChange={handleExerciseInput}
            name="category"
          >
            <option value="Select">Select a category</option>
            <option value="Run">Run</option>
            <option value="Bike">Bike</option>
            <option value="Life">Life</option>
            <option value="Swim">Swim</option>
            <option value="Sports">Sports</option>
          </select>
          <div className="input-with-arrows">
            <input
              type="number"
              name="duration"
              placeholder="Duration"
              value={Number(exerciseInput.duration)}
              onChange={handleExerciseInput}
            ></input>
            <button onClick={() => handleIncrease("duration")}>+</button>
            <button onClick={() => handleDecrease("duration")}>-</button>
          </div>
          <div className="input-with-arrows">
            <input
              type="number"
              name="intensity"
              placeholder="Intensity"
              value={Number(exerciseInput.intensity)}
            ></input>
            <button onClick={() => handleIncrease("intensity")}>+</button>
            <button onClick={() => handleDecrease("intensity")}>-</button>
          </div>
          <button className="btn" id="exercise-btn" onClick={registerExercise}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>no form, sorry</>
  );

  return <div className="exercise-page">{exerciseFormBody}</div>;
}

export default ExercisePage;
