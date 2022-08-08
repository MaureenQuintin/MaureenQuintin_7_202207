import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/user.actions';
import { dateParser } from "../Utils";
import LikeBtn from "./LikeBtn";

const Card = ({ post }) => {

    const [loadUser, setLoadUser] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (loadUser) {
            dispatch(getUser(post.userId));
            setLoadUser(false)
        }
    }, [loadUser, dispatch])
    

useEffect(() => {
    
})

  return (
    <li className="card-container" key={post._id}>
        <>
        <h3>{user.firstName} {user.lastName}</h3>
        <span>{dateParser(post.createdAt)}</span>
        <div>{post.title}</div>
        <div>{post.text}</div>
        <div>{post.imageUrl && (
            <img src={post.imageUrl} alt='card pic' className="card-pic" />
            )}
        </div>
        <div className="card-footer">
            < LikeBtn post={post} />
        </div>
        </>
    </li>
  );
}

export default Card