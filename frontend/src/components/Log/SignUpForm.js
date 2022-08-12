import React, { useState } from 'react'
import axios from 'axios';
import LoginForm from './LoginForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const errorForm = document.querySelector('.errContainer.error');

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/signup`,
            withCredentials: true,
            data: {
                firstName: firstname,
                lastName: lastname,
                email,
                password,
            }
        })
            .then((res) => {
                setFormSubmit(true);
            })
            .catch((err) => {
                console.log(err);
                if (err && err.response && err.response.data) {
                    errorForm.innerHTML = err.response.data.error;
                }
            })

    }

    return (
    <>
        {formSubmit ? (
            <>
            <LoginForm />
            <span></span>
            <h4 className='success'>Utilisateur crée, veuillez-vous connecter ! </h4>
            </>
        ) : (
            <form action='' onSubmit={handleRegister} id='sign-up-form'>
                <label htmlFor="firstname" aria-label='Prénom'>Prénom</label>
                <br />
                <input type="text" name="firstname" id="firstname" required onChange={(e) => setFirstName (e.target.value)} value={firstname} />
                <br /><br />
                <label htmlFor="lastname" aria-label='Nom'>Nom</label>
                <br />
                <input type="text" name="lastname" id="lastname" required onChange={(e) => setLastName (e.target.value)} value={lastname} />
                <br /><br />
                <label htmlFor="email" aria-label='Email'>Email</label>
                <br />
                <input type="text" name="email" id="email" required onChange={(e) => setEmail (e.target.value)} value={email} />
                <br /><br />
                <label htmlFor="password" aria-label='Mot de passe'>Mot de passe</label>
                <br />
                <input type="password" name="password" id="password" required onChange={(e) => setPassword (e.target.value)} value={password} />
                <br /><br />
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" aria-checked="false">J'accepte les <a href='#'>conditions générales</a></label>
                <br /><br />
                <input type="submit" aria-label='Valider inscription' value='Valider inscription' />
                <br /><br />
                <div className='errContainer error'></div>
            </form>
         )}
    </>
  )
}

export default SignUpForm