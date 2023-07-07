import "./NavLinks.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/codepath.svg";

function NavLinks({ isLogged, setIsLogged, setAppState }) {
  const navigate = useNavigate();

  const handleOnLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setAppState({});
    navigate("/");
  };

  const navbarBody = isLogged ? (
    <>
      <div className="logo">
        <Link to="/auth/activity">
          <img src={logo} alt="codepath logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/auth/activity">Activity</Link>
        <Link to="/auth/exercise">Exercise</Link>
        <Link to="/auth/nutrition">Nutrition</Link>
        <Link to="/auth/sleep">Sleep</Link>
        <button onClick={handleOnLogout} className="btn" id="register">
          Logout
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="codepath logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/auth/register">
          <button className="btn" id="register">
            Register
          </button>
        </Link>
        <Link to="/auth/login">
          <button className="btn">Sign In</button>
        </Link>
      </div>
    </>
  );

  return <nav className="navLinks">{navbarBody}</nav>;
}

export default NavLinks;
