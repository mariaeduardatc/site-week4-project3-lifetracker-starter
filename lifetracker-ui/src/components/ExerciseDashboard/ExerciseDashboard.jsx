import { Link } from "react-router-dom";

import './ExerciseDashboard.css'

function ExerciseDashboard({ exercises }) {
  console.log(exercises, 'oglog');
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
        <div className="dash-title">
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
