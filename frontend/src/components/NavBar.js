import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import { useState } from "react";
import { UidContext } from './AppContext';

const NavBar = () => {
    const uid = useContext(UidContext);
    return (
    <nav className='nav-container'>
        <div className='logo'>
            <NavLink exact="true" to="/">
                <div className='logo'>
                    <img src='' alt='logo Groupomania' width='100px' height='50px'></img>
                </div>  
            </NavLink>
        </div>
       <div>
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