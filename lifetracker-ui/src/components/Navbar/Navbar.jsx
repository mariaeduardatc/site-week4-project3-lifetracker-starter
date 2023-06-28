import './Navbar.css'

import logo from '../../assets/codepath.svg'
import NavLinks from '../NavLinks/NavLinks'


function Navbar() {

  return (
    <nav className='navbar'>
        <div className='navbar-message'>Loading</div>
        <a href="/">
            <img src={logo} alt="codepath logo" />
        </a>
       <NavLinks />

    </nav>
  )
}

export default Navbar
