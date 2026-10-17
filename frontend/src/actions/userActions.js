import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      "Content-type": "application/json",
    };
    const response = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config,
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      "Content-type": "application/json",
    };
    const response = await axios.post(
      "/api/users/register/",
      {
        name: name,
        email: email,
        password: password,
      },
      config,
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: response.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProfileData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
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
    const response = await axios.get("/api/users/profile/", config);
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: response.data,
    });

    localStorage.setItem("userProfile", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PROFILE_UPDATE_REQUEST,
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

      const response = await axios.put(
        "/api/users/profile/update/",
        {
          name: name,
          email: email,
          password: password,
        },
        config,
      );
      dispatch({
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: USER_PROFILE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};
