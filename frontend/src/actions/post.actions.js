import axios from "axios";

export const GET_POSTS = 'GET_POSTS'; 
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

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