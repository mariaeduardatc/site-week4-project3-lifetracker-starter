import "./ActivityPage.css";
import { Link } from "react-router-dom";


function ActivityPage({ user, isLogged, exerciseMinutes, maxSleep, maxExercise, maxCalories, sleepTotal, caloriesTotal  }) {
  

  const body = isLogged ? (
    <>
      <div className="header">
        <h1>Welcome back {user.firstName}!</h1>
        <div className="buttons">
          <Link to="/auth/exercise/create">
            <button className="btn">Add Exercise</button>
          </Link>
          <Link to="/auth/sleep/create">
            <button className="btn">Log Sleep</button>
          </Link>
          <Link to="/auth/nutrition/create">
            <button className="btn">Record Nutrition</button>
          </Link>
        </div>
      </div>
      <div className="activity-info">
        <div className="column">
          <div className="activity" id="exercise">
            <h3>Total Exercise Minutes</h3>
            <h1>{exerciseMinutes}</h1>
          </div>
          <div className="activity" id="nutrition">
            <h3>Average Daily Calories</h3>
            <h1>{caloriesTotal}</h1>
          </div>
        </div>
        <div className="column">
          <div className="activity" id="sleep">
            <h3>Average Hours of Sleep</h3>
            <h1>{sleepTotal}</h1>
          </div>
          <div id="more-stats">
            <h3>More stats</h3>
            <div id="separate-stats">
              <div className="stats">
                <h5>
                  Max Calories In <br /> One Meal
                </h5>
                <h3>{maxCalories}</h3>
              </div>
              <div className="stats">
                <h5>
                  Average Exercise <br /> Intensity
                </h5>
                <h3>{maxExercise}</h3>
              </div>
              <div className="stats">
                <h5>
                  Total Number of <br /> Hours Slept
                </h5>
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
