import "./NutritionForm.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NutritionForm({ isLogged, user }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
  const [nutritionInput, setNutritionInput] = useState({
    name: "",
    category: "",
    calories: 0,
    imageUrl: null,
    userId: user,
  });

  const handleIncrease = (field) => {
    setNutritionInput((prevUser) => ({
      ...prevUser,
      [field]: prevUser[field] + 1,
    }));
  };

  const handleDecrease = (field) => {
    setNutritionInput((prevUser) => ({
      ...prevUser,
      [field]:
        prevUser[field] === 0 ? (prevUser[field] = 0) : prevUser[field] - 1,
    }));
  };

  function handleNutritionInput(e) {
    const { name, value } = e.target;
    setNutritionInput((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  const registerNutrition = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, nutritionInput: null }));

    if (
      nutritionInput.name === "" ||
      nutritionInput.category === "Select" ||
      nutritionInput.calories === 0 ||
      nutritionInput.imageUrl === ""
    ) {
      setErrors((e) => ({ ...e, nutritionInput: "Fill all sections" }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, nutritionInput: null }));
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/nutrition/create",
        nutritionInput
      );

      if (response?.data?.exercise) {
        setIsLoading(false);
        navigate("/auth/nutrition");
      } else {
        setErrors((e) => ({
          ...e,
          nutritionInput: "Something went wrong with creating a new exercise",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        nutritionInput: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

  const nutritionFormBody = isLogged ? (
    <div className="activity-page" id="activity-nutrition">
      <div className="activity-title">
        <h1>Nutrition</h1>
      </div>
      <div className="activity-main">
        <div className="activity-sub-title">
          <h4>Record your nutrition</h4>
        </div>
        <div className="activity-form">
          <input
            name="name"
            className="form-input"
            type="text"
            placeholder="Food name"
            value={nutritionInput.name}
            onChange={handleNutritionInput}
          ></input>
          <select
            value={nutritionInput.category}
            onChange={handleNutritionInput}
            name="category"
          >
            <option value="Select">Select a category</option>
            <option value="Dessert">Dessert</option>
            <option value="Lunch">Lunch</option>
          </select>

          <div className="input-with-arrows">
            <input
              type="number"
              name="calories"
              value={nutritionInput.calories}
              onChange={handleNutritionInput}
            ></input>
            <button onClick={() => handleIncrease("calories")}>+</button>
            <button onClick={() => handleDecrease("calories")}>-</button>
          </div>

          <input
            name="imageUrl"
            className="form-input"
            type="text"
            placeholder="Image Url"
            value={nutritionInput.imageUrl}
            onChange={handleNutritionInput}
          ></input>

          <button className="btn" onClick={registerNutrition}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>no form, sorry</>
  );

  return <div className="sleep-page">{nutritionFormBody}</div>;
}
