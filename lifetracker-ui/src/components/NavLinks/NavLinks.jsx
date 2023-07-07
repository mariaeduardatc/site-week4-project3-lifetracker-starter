import "./NavLinks.css";
import { Link, useNavigate } from "react-router-dom";


function NavLinks({ isLogged, user, setAppState }) {
  const navigate = useNavigate();
    
  const isAuthenticated = Boolean(user?.email);
  

  const handleOnLogout = () => {
    localStorage.removeItem("token");
    isLogged(false)
    setAppState({});
    navigate("/");
  };

  const navbarBody = (isLogged && isAuthenticated) ? (
    <>
      <Link to="/auth/activity">Activity</Link>
      <Link to="/auth/exercise">Exercise</Link>
      <Link to="/auth/nutrition">Nutrition</Link>
      <Link to="/auth/sleep">Sleep</Link>
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
