import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './NutritionDashboard.css'

export default function NutritionDashboard({user}){
    const [errors, setErrors] = useState({});
    const [nutritionlog, setNutritionlog] = useState([]);

    const getNutrition = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/auth/getnutrition/${user}`
          );
    
          if (response?.data?.nutritionById) {
            const individualNutritionTag = response.data.nutritionById;
            setNutritionlog(individualNutritionTag);
          } 
          
        } catch (err) {
          console.log(err);
          const message = err?.response?.data?.error?.message;
          setErrors((e) => ({
            ...e,
            nutritionlog: message ? String(message) : String(err),
          }));
        }
    };

    useEffect(() => {
        getNutrition();
    }, [user]);

    const tags =
    nutritionlog?.map((nutritionTag) => (
      <div className="dash-tags">
        <div className="tag-title">
          <h3>{nutritionTag.name}</h3>
        </div>
        <div className="tag-description">
          <div className="tag-duration">
            <h5>Category</h5>
            <h4>{nutritionTag.category}</h4>
          </div>
          <div className="tag-intensity">
            <h5>Calories</h5>
            <h4>{nutritionTag.calories}</h4>
          </div>
        </div>
      </div>
    ));

    const body =
    nutritionlog.length !== 0 ? (
      <div className="dash-cards" id="dash-nutrition">
        <div className="dash-title">
          <h1>Nutrition</h1>
        </div>
        <div className="dash-main">
          <Link to="/auth/nutrition/create">
            <button className="btn-dash">Add Nutrition Log</button>
          </Link>
          {tags}
        </div>
      </div>
    ) : (
      <div className="empty-dash" id="nutrition-empty">
        <div className="dash-title">
          <h1>Nutrition</h1>
        </div>
        <h5>You still have no nutrition log!</h5>
        <Link to="/auth/nutrition/create">
          <button className="btn-dash">Add Nutrition Log</button>
        </Link>
      </div>
    );
  return <div className="dashboard">{body}</div>;
}