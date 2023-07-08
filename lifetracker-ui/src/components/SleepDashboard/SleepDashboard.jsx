import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './SleepDashboard.css'

export default function SleepDashboard({user}){
    const [errors, setErrors] = useState({});
    const [sleeplog, setSleeplog] = useState([]);

    const getSleep = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/auth/getsleep/${user}`
          );
    
          if (response?.data?.sleepById) {
            const individualSleepTag = response.data.sleepById;
            setSleeplog(individualSleepTag);
          } 
          
        } catch (err) {
          console.log(err);
          const message = err?.response?.data?.error?.message;
          setErrors((e) => ({
            ...e,
            sleeplog: message ? String(message) : String(err),
          }));
        }
    };

    useEffect(() => {
    getSleep();
    }, [user]);

    const tags =
    sleeplog?.map((sleepTag) => (
      <div className="dash-tags">
        <div className="tag-title">
          <h3>{sleepTag.dating.substring(0,10)}</h3>
        </div>
        <div className="tag-description">
          <div className="tag-duration">
            <h5>Bed Time</h5>
            <h4>{sleepTag.bed_time.substring(0,5)}</h4>
          </div>
          <div className="tag-intensity">
            <h5>Wake Time</h5>
            <h4>{sleepTag.wake_time.substring(0,5)}</h4>
          </div>
        </div>
      </div>
    ));

    const body =
    sleeplog.length !== 0 ? (
      <div className="dash-cards" id="dash-sleep">
        <div className="dash-title">
          <h1>Sleep</h1>
        </div>
        <div className="dash-main">
          <Link to="/auth/sleep/create">
            <button className="btn-dash">Add Sleep Log</button>
          </Link>
          {tags}
        </div>
      </div>
    ) : (
      <div className="empty-dash" id="sleep-empty">
        <div className="dash-title">
          <h1>Sleep</h1>
        </div>
        <h5>You still have no sleep log!</h5>
        <Link to="/auth/sleep/create">
          <button className="btn-dash">Add Sleep Log</button>
        </Link>
      </div>
    );
  return <div className="dashboard">{body}</div>;
}