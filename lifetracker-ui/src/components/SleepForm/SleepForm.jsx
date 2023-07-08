import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SleepForm.css";

export default function SleepForm({ isLogged, user }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sleepInput, setSleepInput] = useState({
    dating: null,
    bedTime: null,
    wakeTime: null,
    userId: user,
  });

  function handleSleepInput(e) {
    const { name, value } = e.target;
    setSleepInput((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const registerSleep = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, sleepInput: null }));

    if (
      sleepInput.dating === null ||
      sleepInput.bedTime === null ||
      sleepInput.wakeTime === null
    ) {
      setErrors((e) => ({ ...e, sleepInput: "Fill all sections" }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, sleepInput: null }));
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/sleep/create",
        sleepInput
      );

      if (response?.data?.sleep) {
        setIsLoading(false);
        navigate("/auth/sleep");
      } else {
        setErrors((e) => ({
          ...e,
          sleepInput: "Something went wrong with creating a new sleep",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        sleepInput: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  const sleepFormBody = isLogged ? (
    <div className="activity-page" id="activity-sleep">
      <div className="activity-title">
        <h1>Sleep</h1>
      </div>
      <div className="activity-main">
        <div className="activity-sub-title">
          <h4>Record your sleep</h4>
        </div>
        <div className="activity-form">
          <input
            name="dating"
            className="form-input"
            type="date"
            placeholder="Date"
            value={sleepInput.dating}
            onChange={handleSleepInput}
          ></input>
          <input
            name="bedTime"
            className="form-input"
            type="time"
            placeholder="Bed Time"
            value={sleepInput.bedTime}
            onChange={handleSleepInput}
          ></input>
          <input
            name="wakeTime"
            className="form-input"
            type="time"
            placeholder="Awake Time"
            value={sleepInput.wakeTime}
            onChange={handleSleepInput}
          ></input>

          <button className="btn" id="sleep-btn" onClick={registerSleep}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>no form, sorry</>
  );

  return <div className="sleep-page">{sleepFormBody}</div>;
}
