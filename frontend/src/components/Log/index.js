import React, { useState } from 'react'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const Log = ( props ) => {
    const [SignUpModal, setSignUpModal] = useState(props.signup);
    const [LoginModal, setLoginModal] = useState(props.login);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setLoginModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setLoginModal(true);
        } 
    }

  return (
    <div className='connection-form'>
       <div className='form-container'>
            <ul>
                <li onClick={handleModals} id="register" className={SignUpModal ? "active-btn" : null}>S'inscrire</li>
                <li onClick={handleModals} id="login" className={LoginModal ? "active-btn" : null}>Se connecter</li>
            </ul>
            {SignUpModal && <SignUpForm />}
            {LoginModal && <LoginForm />}
        </div> 
    </div>
  )
}

export default Log