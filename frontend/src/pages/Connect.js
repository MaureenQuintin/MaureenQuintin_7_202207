import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext';
import Log from '../components/Log'
import { Navigate } from 'react-router-dom';


const Connect = () => {

  const uid =  useContext(UidContext);

  return (
    <div className='connection-page'>
      {uid === null ? (
       <div className='log-container'>
            <Log signup={false} login={true}/>
            <div className='img-container'>
                <img src='./img/icon-login.png' alt='' />
            </div>
        </div> 
      ) : (
        <Navigate to={{pathname: '/feed'}} />
      )}
    </div>
  )
}

export default Connect