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
  BLOG_COMMENT_RESET,
  COMMENT_GET_REQUEST,
  COMMENT_GET_SUCCESS,
  COMMENT_GET_FAIL,
  BLOG_LIKE_REQUEST,
  BLOG_LIKE_SUCCESS,
  BLOG_LIKE_FAIL,
  BLOG_LIKE_RESET,
  LIKE_GET_REQUEST,
  LIKE_GET_SUCCESS,
  LIKE_GET_FAIL,
  TOP_GET_REQUEST,
  TOP_GET_SUCCESS,
  TOP_GET_FAIL,
} from "../constants/blogConstants";

export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_LIST_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogs,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload, blogs: [] };
    default:
      return state;
  }
};

export const blogDetailsReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, blog: action.payload };
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload, blog: {} };

    default:
      return state;
  }
};

export const postBlogCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_COMMENT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case BLOG_COMMENT_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case BLOG_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getBlogCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case COMMENT_GET_REQUEST:
      return { loading: true, ...state };
    case COMMENT_GET_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENT_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_LIKE_REQUEST:
      return { loading: true, ...state };
    case BLOG_LIKE_SUCCESS:
      return { loading: false, success: true };
    case BLOG_LIKE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_LIKE_RESET:
      return {};
    default:
      return state;
  }
};
export const getBlogLikesReducer = (state = { likes: [] }, action) => {
  switch (action.type) {
    case LIKE_GET_REQUEST:
      return { loading: true, ...state };
    case LIKE_GET_SUCCESS:
      return { loading: false, likes: action.payload };
    case LIKE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogTopReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case TOP_GET_REQUEST:
      return { loading: true, blogs: [] };
    case TOP_GET_SUCCESS:
      return { loading: false, blogs: action.payload };
    case TOP_GET_FAIL:
      return { loading: false, error: action.payload, blogs: [] };
    default:
      return state;
  }
};
