import React from 'react'
import Log from '../components/Log'

const Connect = () => {
  return (
    <div className='profil-page'>
       <div className='log-container'>
            <Log signup={false} login={true}/>
            <div className='img-container'>
                <img src='' alt='' />
            </div>
        </div> 
    </div>
  )
}

export default Connect