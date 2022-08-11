import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from "../../actions/post.actions";
import { timestampParser } from "../Utils";
import LikeBtn from "./LikeBtn";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(post.text);
    const [titleUpdate, setTitleUpdate] = useState(post.title);
    const [postUser, setPostUser] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer);
    const users = useSelector((state) => state.usersReducer);
    const [postModified, setPostModified] = useState(false);
    const [dateUpdated, setDateUpdated] = useState(post.updatedAt);
    

    const updateItem = () => {
        let postOldText = post.text;
        let postOldTitle = post.title;
        const errorForm = document.querySelector('.errorInUpdate');
        if (textUpdate === '' || titleUpdate === '') {
            errorForm.innerHTML = 'Le titre et le texte du post ne doivent pas être vides'
        } else {
            if (textUpdate) {
                post.text = textUpdate;
            }
            if (titleUpdate) {
                post.title = titleUpdate;
            }
            if ((titleUpdate || textUpdate) && ((titleUpdate !== postOldTitle) || (textUpdate !== postOldText))) {
                dispatch(updatePost(post._id, post));
                postOldText = textUpdate;
                postOldTitle = titleUpdate;
                setDateUpdated(Date.now());
                setPostModified(true);
            }
            setIsUpdated(false);
        }
    };

    const openUpdate = () => {
        setPostModified(false);
        setIsUpdated(true);
    }

    const handleUserTyping = (type, value) => {
        const errorForm = document.querySelector('.errorInUpdate');
        errorForm.innerHTML = '';
        if (type === 'title') {
            setTitleUpdate(value);
        }
        if (type === 'text') {
            setTextUpdate(value);
        }
    }

    useEffect(() => {
        if (users.map((u) => {
            if (u._id === post.userId) {
                return setPostUser(u);
            }
        }));
    })

  return (
    <li className="card-container" key={post._id}>
        <>
        <div className="card">
            <div className="card-header">
                <div className="pseudo">
                    {postUser !== null ? (
                        <h3>{postUser.firstName} {postUser.lastName}</h3>
                    ): (
                        <div></div>
                    )}
                </div>
                <div>
                {(dateUpdated === post.createdAt && !postModified) && (
                    <span>Créé le : {timestampParser(post.createdAt)}</span>
                )}
                {(dateUpdated !== post.createdAt && !postModified) && (
                    <span>Modifié le : {timestampParser(dateUpdated)}</span>
                )}
                {(postModified) &&  (
                    <span>Modifié le : {timestampParser(dateUpdated)}</span>
                )}
                </div>
            </div>
            <div>
            {isUpdated === false && 
                <div>
                    <div className="card-title">{post.title}</div>
                    <div className="card-text">{post.text}</div>
                </div>}
            {isUpdated && (
              <div className="update-post">
                 <textarea
                    defaultValue={post.title}
                    onChange={(e) => handleUserTyping('title', e.target.value)}
                />
                <textarea
                    defaultValue={post.text}
                    onChange={(e) => handleUserTyping('text', e.target.value)}
                />
                <div className='error errorInUpdate'></div>
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Mettre à jour
                  </button>
                </div>
              </div>
            )}
            </div>
            {post.imageUrl && (
                <div className="pic-container">
                    <img src={post.imageUrl} alt="card-pic" className="card-pic" />
                </div>
            )}
            <div className="card-footer">    
                <div className="like-container">
                    < LikeBtn post={post} />
                </div>
                {((user._id === post.userId) || user.isAdmin) && (
                <div className="button-container">
                    <div onClick={() => openUpdate()}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                    </div>
                    < DeleteCard id={post._id} />
                </div>
                )}
            </div>
        </div>
        </>
    </li>
  );
}

export default Card