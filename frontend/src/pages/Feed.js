import React, { useContext } from 'react'
import { UidContext } from "../components/AppContext";
import NewPostForm from '../components/Posts/NewPostForm'
import Thread from '../components/Thread'


const Feed = () => {
  const uid = useContext(UidContext);

  const redirectToLogin = () => {
    window.location = '/connect';
  }
  
  return (
    <div className='home'>
      {uid ? (
        <div className='main'>
          <div className='home-header'>
            < NewPostForm />
          </div>
          <h2 className='lastNews-text'>LES DERNIÈRES NOUVEAUTÉS</h2>
          <Thread />
        </div>
      ) : (
        <div className='main-not-connected'>
          <div>Vous devez être connecté pour voir et poster</div>
          <button className='send' onClick={redirectToLogin}>Aller à la connexion</button>
        </div>
      )}
    </div>
  )
}

export default Feed