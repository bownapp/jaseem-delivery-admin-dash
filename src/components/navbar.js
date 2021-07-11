import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import logo from '../assets/bown logo.png'
import { UserContext } from './context/user1Context'
import firebase from "../firebase";

// import Menu from '../../globalComponents/menu'

function Navbar() {

   const {user} = useContext(UserContext)

    return (
        <div>
        <nav className="navContainer fontMontserrat">
        <Link to='/'>
        <img src={logo} className="headerLogo" alt="logo" />
        </Link>
            <div className='navContainer'>
            <Link to='/admin/service-providers' className="energyQuizLink">
                <p>my <b>entries</b></p>
            </Link>
            
            </div>
            <div className='navContainer'>
            <Link to='/admin/service-providers/add' className="energyQuizLink">
                <p>add <b>services</b></p>
            </Link>
            
            </div>
            
        </nav>
       {
           user.loggedIn ?
           <div className='lightBgColor logoutBar'>
           <div>
           Welcome, {user.number}
           </div>
           <div onClick={() => firebase.auth().signOut()} id="side-menu">
<img className='logoutImage' alt='Logout' src={'https://cdn.icon-icons.com/icons2/2518/PNG/512/logout_icon_151219.png'}/>
<span class='label-menu'>Logout</span>

    </div>

       </div>
       :
       null
       }
       
       
        </div>
    )
}


export default Navbar