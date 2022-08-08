import {
    GET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
  } from "../actions/post.actions";
  
  const initialState = {};
  
  export default function postReducer(state = initialState, action) {
    switch (action.type) {
      case GET_POSTS:
        return action.payload;
      case LIKE_POST:
        return state.map((post) => {
          if (post._id === action.payload.id) {
            return {
              ...post,
              usersLiked: [action.payload.userId, ...post.usersLiked],
            };
          }
          return post;
        });
      case UNLIKE_POST:
        return state.map((post) => {
          if (post._id === action.payload.id) {
            return {
              ...post,
              usersLiked: post.usersLiked.filter((id) => id !== action.payload.userId),
            };
          }
          return post;
        });
      default:
        return state;
    }
  }