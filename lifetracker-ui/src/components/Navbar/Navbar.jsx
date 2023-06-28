import './Navbar.css'

import logo from '../../assets/codepath.svg'


function Navbar() {

  return (
    <nav className='navbar'>
        <div className='navbar-message'>Loading</div>
        <a href="/">
            <img src={logo} alt="codepath logo" />
        </a>
       

    </nav>
  )
}

export default Navbar
