import './Navbar.css'

import logo from '../../assets/codepath.svg'
import NavLinks from '../NavLinks/NavLinks'


function Navbar( {setClickedLogin, setClickedRegister}) {

  return (
    <nav className='navbar'>
        {/* <div className='navbar-message'>Loading</div> */}
        <a href="/">
            <img src={logo} alt="codepath logo" />
        </a>
       <NavLinks  setClickedRegister={() => {setClickedRegister(false)}}  setClickedLogin={()=>{setClickedRegister(false)}}/>

    </nav>
  )
}

export default Navbar
