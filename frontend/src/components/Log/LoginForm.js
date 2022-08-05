import React, { useState } from 'react'
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const errorForm = document.querySelector('.error');
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
            .then((res) => {
                if (res) {
                    window.location = '/';
                }
            })
            .catch((err) => {
                if (err.response.data.error) {
                    errorForm.innerHTML = err.response.data.error;
                }
                console.log(err);
            })
    };


  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="email">Email</label>
        <br />
        <input type="text" name="email" id="email" onChange={(e) => setEmail (e.target.value)} value={email} />
        <br /><br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input type="password" name="password" id="password" onChange={(e) => setPassword (e.target.value)} value={password} />
        <br /><br />
        <input type="submit" value="Se connecter" />
        <br /><br />
        <div className='error'></div>
    </form>
  )
}

export default LoginForm