import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './ExerciseDashboard.css'

function ExerciseDashboard({ user }) {
  const [errors, setErrors] = useState({});
  const [exercises, setExercises] = useState([]);

  const getExercise = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/auth/getexercise/${user.id}`
      );

      if (response?.data?.exerciseById) {
        const individualExercise = response.data.exerciseById;
        setExercises(individualExercise);
      } else {
        setErrors((e) => ({
          ...e,
          exerciseInput: "Something went wrong with creating a new exercise",
        }));
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        exerciseInput: message ? String(message) : String(err),
      }));
    }
  };
  useEffect(() => {
    getExercise();
  }, [user]);

  
  const tags =
  exercises?.map((exercise) => (
    <div className="dash-tags">
      <div className="tag-title">
        <h3>{exercise.name}</h3>
      </div>
      <div className="tag-description">
        <div className="tag-duration">
          <h5>Duration</h5>
          <h4>{exercise.duration} min</h4>
        </div>
        <div className="tag-intensity">
          <h5>Intensity</h5>
          <h4>{exercise.intensity}/10</h4>
        </div>
      </div>
    </div>
  ));

  const body =
    exercises.length !== 0 ? (
      <div className="dash-cards" id="dash-exercise">
        <div className="dash-title">
          <h1>Exercise</h1>
        </div>
        <div className="dash-main">
          <Link to="/auth/exercise/create">
            <button className="btn-dash">Add Exercise</button>
          </Link>
          {tags}
        </div>
      </div>
    ) : (
      <div className="empty-dash">
        <div className="dash-title" id="exercise-empty">
          <h1>Exercise</h1>
        </div>
        <h5>You still have no exercises!</h5>
        <Link to="/auth/exercise/create">
          <button className="btn-dash">Add Exercise</button>
        </Link>
      </div>
    );
  return <div className="dashboard">{body}</div>;
}

export default ExerciseDashboard;
