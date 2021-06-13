import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
// import logo from '../../assets/wg_white.png'
// import Menu from '../../globalComponents/menu'

function Navbar() {
   

    return (
        <div>
        <nav className="navContainer fontMontserrat">
        <Link to='/'>
        {/* <img src={logo} className="footerLogo" alt="logo" /> */}
        <p>Home</p>
        </Link>
            <div className='navContainer'>
            <Link to='/service-providers' className="energyQuizLink">
                <p>All <b>Services</b></p>
            </Link>
            
            </div>
            <div className='navContainer'>
            <Link to='/service-providers/add' className="energyQuizLink">
                <p>Add <b>Services</b></p>
            </Link>
            
            </div>
        </nav>
        </div>
    )
}


export default Navbar