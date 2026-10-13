import axios from "axios";
import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_FAIL,
} from "../constants/blogConstants";

export const blogListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_LIST_REQUEST,
    });
    const response = await axios.get("/api/blogs/");
    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const blogDetailsAction = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_DETAILS_REQUEST,
    });
    const response = await axios.get(`/api/blogs/${slug}/`);
    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
