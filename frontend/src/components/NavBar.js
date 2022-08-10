import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import { UidContext } from './AppContext';

const NavBar = () => {
    const uid = useContext(UidContext);
    return (
    <nav className='nav-container'>
        <div className='logo'>
            <NavLink exact="true" to="/">
                <div className='logo'>
                    <img src='./img/logo.png' alt='logo Groupomania' width='60px' height='60px'></img>
                    <h1 className='nav-tilte'>Groupomania</h1>
                </div>  
            </NavLink>
        </div>
       <div className='logout-container'>
        {uid ? (
            <Logout />
        ) : (
            <div></div>
        )}
       </div>
    </nav>
  )
}

export default NavBar