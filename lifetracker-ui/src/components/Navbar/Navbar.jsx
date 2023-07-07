
import "./Navbar.css";


import NavLinks from "../NavLinks/NavLinks";

function Navbar({ isLogged, setIsLogged, setAppState }) {
  return (
    <nav className="navbar">
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
