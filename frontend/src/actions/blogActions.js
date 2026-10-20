import axios from "axios";
import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_COMMENT_REQUEST,
  BLOG_COMMENT_SUCCESS,
  BLOG_COMMENT_FAIL,
  COMMENT_GET_REQUEST,
  COMMENT_GET_SUCCESS,
  COMMENT_GET_FAIL,
  BLOG_LIKE_REQUEST,
  BLOG_LIKE_SUCCESS,
  BLOG_LIKE_FAIL,
  LIKE_GET_REQUEST,
  LIKE_GET_SUCCESS,
  LIKE_GET_FAIL,
} from "../constants/blogConstants";

export const blogListAction =
  (keyword = "", page = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: BLOG_LIST_REQUEST,
      });
      const response = await axios.get(
        `/api/blogs/?keyword=${keyword}&page=${page}`,
      );
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

export const postComment = (slug, comment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_COMMENT_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.post(
      `/api/blogs/${slug}/post-comment/`,
      { comment: comment },
      config,
    );
    dispatch({
      type: BLOG_COMMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getComments = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENT_GET_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/blogs/${slug}/comments/`, config);
    dispatch({
      type: COMMENT_GET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addOrRemoveLike = (slug) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIKE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.post(
      `/api/blogs/${slug}/add-like/`,
      {},
      config,
    );
    dispatch({
      type: BLOG_LIKE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLikes = (slug) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIKE_GET_REQUEST });
    const response = await axios.get(`/api/blogs/${slug}/likes/`);
    dispatch({
      type: LIKE_GET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
