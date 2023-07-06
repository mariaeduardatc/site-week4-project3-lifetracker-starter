import { useState } from "react";
import "./NavLinks.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";


function NavLinks({ isLogged, user, setAppState }) {
  const navigate = useNavigate();
    
  const isAuthenticated = Boolean(user?.email);
  

  const handleOnLogout = () => {
    setAppState({});
    navigate("/");
  };

  const navbarBody = (isLogged && isAuthenticated) ? (
    <>
      <Link to="/activity">Activity</Link>
      <Link to="/exercise">Exercise</Link>
      <Link to="/nutrition">Nutrition</Link>
      <Link to="/sleep">Sleep</Link>
      <button onClick={handleOnLogout} className="btn" id="register">
          Logout
        </button>
    </>
  ) : (
    <>
      <Link to="/auth/register">
        <button className="btn" id="register">
          Register
        </button>
      </Link>
      <Link to="/auth/login">
        <button className="btn">
          Sign In
        </button>
      </Link>
    </>
  );

  return <nav className="navLinks">{navbarBody}</nav>;
}

export default NavLinks;
