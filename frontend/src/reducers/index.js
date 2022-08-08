import { combineReducers } from "redux";
import postReducer from "./post.reducer";
import usersReducer from "./users.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
    usersReducer,
    userReducer,
    postReducer,

});