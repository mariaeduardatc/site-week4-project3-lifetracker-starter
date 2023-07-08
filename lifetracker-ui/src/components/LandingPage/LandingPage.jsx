import { Link } from "react-router-dom";

import "./Landingpage.css";

import bed from "../../assets/icon_bed.svg";
import fitness from "../../assets/icon_exercise.svg";
import food from "../../assets/icon_food.svg";
import night from "../../assets/icon_night.svg";
import plan from "../../assets/icon_plan.svg";
import workout from "../../assets/icon_workout.svg";
import logs from "../../assets/logs2.png";
import logWorkout from "../../assets/log_workout.png";
import profile from "../../assets/maria.jpg";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero">
        <div className="description">
          <div className="title">✨LifeTracker✨</div>
          <p>Helping you take back control of your world.</p>
          <Link to="/auth/register"><button className="btn">Join</button></Link>
        </div>
        <div className="images">
          <img src={food} alt="bowl of yogurt" id="food1" />
          <img src={fitness} alt="gym objects" id="exercise1" />
          <img src={workout} alt="gym objects" id="exercise2" />
          <img src={bed} alt="bed" id="bed1" />
          <img src={night} alt="bed" id="bed2" />
          <img src={plan} alt="planner" id="plan1" />
        </div>
      </div>
      <div id="information">
        <div className="description" id="description-main">
          <p>
            Set yourself for success and board this experince. <br /> Create
            your account today and begin having control over your goals!
          </p>
          <Link to="/auth/register"><button className="btn">Register</button></Link>
        </div>
        <div className="images" id="infoImages">
          <img src={logs} alt="" />
          <img src={logWorkout} alt="" />
        </div>
      </div>
      <div className="description" id="author">
        <h3>Meet the creator!</h3>
        <img src={profile} alt="creator's profile picture" />
        <h3>✨Hello, World!</h3>
        <p id="desc-author">
          My name is Maria, and I am a Computer Science major at Minerva
          University. I am originally from Brazil, but I have lived in 4 other
          countries in the last year. I am especially interested in Web
          Development and the study of technology in smart cities. If you are my
          friend, you know I would do everything for a lemonade or a matcha
          latte.
        </p>
      </div>
      <footer>
        @mariaeduardatc
      </footer>
    </div>
  );
}

export default LandingPage;
