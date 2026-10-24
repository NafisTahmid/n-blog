import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  blogListReducer,
  blogDetailsReducer,
  postBlogCommentReducer,
  getBlogCommentsReducer,
  addLikeReducer,
  getBlogLikesReducer,
  blogTopReducer,
} from "./reducers/blogReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  getUsersReducer,
  userDeleteReducer,
  userUpdateReducer,
  userGetReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  blogList: blogListReducer,
  blogDetails: blogDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  postBlogComment: postBlogCommentReducer,
  getBlogComments: getBlogCommentsReducer,
  addLike: addLikeReducer,
  getBlogLikes: getBlogLikesReducer,
  blogTop: blogTopReducer,
  getUsers: getUsersReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userGet: userGetReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
