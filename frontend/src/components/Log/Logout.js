import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";


const Logout = () => {
    const removeCookie = (key) => {
        if(window !== 'undefined') {
            cookie.remove(key, {expires: 1});
        }
    }

    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials: true,
        })
        .then(() => {
            removeCookie("jwt")
            window.location = '/connect';
        })
        .catch((err) => console.log(err))
    }

  return (
    <li onClick={logout}>
        <img src='./img/icons/logout.svg' alt='icone déconnexion'></img>
    </li>
  )
}

export default Logout