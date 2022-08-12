import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { UidContext } from '../AppContext';
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeBtn = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true);
      };
    
      const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false);
      };

    useEffect(() => {
        if (post.usersLiked.includes(uid)) setLiked(true);
        else setLiked(false);
      }, [uid, post.usersLiked, liked]);
    
  return (
    <div className='like-btn'>
        {uid && liked === false && (
            <img src='../img/icons/heart.svg' alt='like button' aria-label='Mettre un like' onClick={like} />
        )}
         {uid && liked === true && (
            <img src='../img/icons/heart-filled.svg' alt='like button filled' onClick={unlike} />
        )}
        <span>{post.usersLiked.length}</span>
    </div>
  )
}

export default LikeBtn