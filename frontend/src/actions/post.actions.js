import axios from "axios";

export const GET_POSTS = 'GET_POSTS'; 
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`, {withCredentials: true})
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch((err) => console.log(err))
    }

}

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data, {withCredentials: true, headers: { 'content-type': 'multipart/form-data' }})
      .then((res) => {
        console.log('r', res);
      })
  };
};


export const likePost = (id, userId) => {
    return (dispatch) => {
      return axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/` + id + `/like`,
        data: { userId: userId, like: 1 },
        withCredentials: true
      })
        .then((res) => {
          dispatch({ type: LIKE_POST, payload: { id, userId } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const unlikePost = (id, userId) => {
    return (dispatch) => {
      return axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/` + id + `/like`,
        data: { userId: userId, like: 0 },
        withCredentials: true
      })
        .then((res) => {
          dispatch({ type: UNLIKE_POST, payload: { id, userId } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const updatePost = (id, post) => {
    return (dispatch) => {
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/` + id, 
        data: { post: JSON.stringify(post) },
        withCredentials: true
      })
        .then((res) => {
          dispatch({ type: UPDATE_POST, payload: { id, post } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const deletePost = (id) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/post/` + id,
        withCredentials: true
      })
        .then((res) => {
          dispatch({ type: DELETE_POST, payload: { id } });
        })
        .catch((err) => console.log(err));
    };
  };