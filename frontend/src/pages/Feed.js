import React from 'react'
import NewPostForm from '../components/Posts/NewPostForm'
import Thread from '../components/Thread'

const Feed = () => {

  return (
    <div className='home'>
      <div className='main'>
        <div className='home-header'>
          < NewPostForm />
        </div>
      <h2 className='lastNews-text'>LES DERNIÈRES NOUVEAUTÉS</h2>
        <Thread />
       </div>
    </div>
  )
}

export default Feed