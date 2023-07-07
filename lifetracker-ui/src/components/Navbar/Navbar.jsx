import { Link } from "react-router-dom";

import "./Navbar.css";

import logo from "../../assets/codepath.svg";
import NavLinks from "../NavLinks/NavLinks";

function Navbar({ isLogged, setIsLogged, setAppState }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="codepath logo" />
        </Link>
      </div>

      <div className="navlinks">
        <NavLinks
          isLogged = {isLogged}
          setIsLogged={setIsLogged}
          setAppState={setAppState}
        />
      </div>
    </nav>
  );
}

export default Navbar;
