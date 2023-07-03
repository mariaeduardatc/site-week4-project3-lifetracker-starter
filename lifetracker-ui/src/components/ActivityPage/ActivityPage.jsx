import "./ActivityPage.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function ActivityPage({ user, setAppState }) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.email);
  const exerciseHours = 0;
  const caloriesTotal = 0;
  const sleepTotal = 0;
  const maxCalories = 0;
  const maxExercise = 0;
  const maxSleep = 0;

  const handleOnLogout = () => {
    setAppState({});
    navigate("/");
  };

  const body = isAuthenticated ? (
    <>
      <div className="header">
        <h1>Welcome back {user.firstName}!</h1>
        <div className="buttons">
          <button className="btn">Add Exercise</button>
          <button className="btn">Log Sleep</button>
          <button className="btn">Record Nutrition</button>
        </div>
      </div>
      <div className="activity-info">
        <div className="column">
          <div className="activity">
            <h3>Total Exercise Minutes</h3>
            <h1>{exerciseHours}</h1>
          </div>
          <div className="activity">
            <h3>Average Daily Calories</h3>
            <h1>{caloriesTotal}</h1>
          </div>
        </div>
        <div className="column">
          <div className="activity">
            <h3>Average Hours of Sleep</h3>
            <h1>{sleepTotal}</h1>
          </div>
          <div id="more-stats">
            <h3>More stats</h3>
            <div id="separate-stats">
              <div className="stats">
                <h5>Max Calories In <br /> One Meal</h5>
                <h3>{maxCalories}</h3>
              </div>
              <div className="stats">
                <h5>Average Exercise <br /> Intensity</h5>
                <h3>{maxExercise}</h3>
              </div>
              <div className="stats">
                <h5>Total Number of <br /> Hours Slept</h5>
                <h3>{maxSleep}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Not Logged in? (test)</p>
  );

  return (
    <div className="activity-page">
      <div>{body}</div>
    </div>
  );
}

export default ActivityPage;
