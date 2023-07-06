import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ExercisePage.css";

function ExercisePage({ isLogged }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [exercises, setExercises] = useState([]);
  const [exerciseInput, setExerciseInput] = useState({
    name: "",
    category: "",
    duration: 0,
    intensity: 0,
  });

  function handleExerciseInput(e) {
    const { name, value } = e.target;
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
    console.log(exerciseInput);
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
      const response = await axios.post( "http://localhost:3001/auth/exercise/create", exerciseInput);
      if (response?.data?.exercise) {
        const individualExercise = response.data.exercise;
        setExercises({
          ...exercises,
          individualExercise,
        });
        setIsLoading(false);
        navigate("/exercise");
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
    <div className="activity-page">
      <div className="activity-title">
        <h1>Exercise</h1>
      </div>
      <div className="activity-main">
        <div className="activity-sub-title">
          <h3>Record Exercise</h3>
        </div>
        <div className="activity-form">
          <input
            name="name"
            className="form-input"
            type="text"
            placeholder="Name"
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
              value={exerciseInput.duration}
              onChange={handleExerciseInput}
            ></input>
            <div className="btn-number">
              <button onClick={() => handleIncrease("duration")}>+</button>
              <button onClick={() => handleDecrease("duration")}>-</button>
            </div>
          </div>
          <div className="input-with-arrows">
            <input
              type="number"
              name="intensity"
              value={exerciseInput.intensity}
            ></input>
            <button onClick={() => handleIncrease("intensity")}>+</button>
            <button onClick={() => handleDecrease("intensity")}>-</button>
          </div>
          <button className="btn" onClick={registerExercise}>
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
