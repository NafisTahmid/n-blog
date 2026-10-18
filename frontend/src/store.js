import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  blogListReducer,
  blogDetailsReducer,
  postBlogCommentReducer,
  getBlogCommentsReducer,
} from "./reducers/blogReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateProfileReducer,
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
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userProfileFromStorage = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : null;
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  userProfile: {
    userProfileInfo: userProfileFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
