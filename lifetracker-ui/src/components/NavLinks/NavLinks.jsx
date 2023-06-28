import './NavLinks.css'
import { Link } from "react-router-dom"


function NavLinks() {

  return (
    <nav className='navLinks'>
        <Link to="/activity">
            Activity
        </Link>
        <Link to="/exercise">
            Exercise
        </Link>
        <Link to="/nutrition">
            Nutrition
        </Link>
        <Link to="/sleep">
            Sleep
        </Link>
        <Link to="/register">
            <button>Sign In</button>
        </Link>
        <Link to="/login">
            <button>Login</button>
        </Link>
    </nav>
  )
}

export default NavLinks
