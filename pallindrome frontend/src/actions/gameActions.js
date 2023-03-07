import axios from "axios";
import {
  START_GAME_REQUEST,
  START_GAME_SUCCESS,
  START_GAME_FAILED,
  UPDATE_GAME_STRING_REQUEST,
  UPDATE_GAME_STRING_SUCCESS,
  UPDATE_GAME_STRING_FAILED,
  GET_GAME_STRING_REQUEST,
  GET_GAME_STRING_SUCCESS,
  GET_GAME_STRING_FAILED,
} from "../constants/gameConstants";

export const startGame = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: START_GAME_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log("token = ", userInfo.token);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/games/start/`, {}, config);
    console.log("game data = ", data);

    dispatch({
      type: START_GAME_SUCCESS,
      payload: data,
    });
    console.log("data = ", data);
    localStorage.setItem("gameInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: START_GAME_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateGame = (game) => async (dispatch, getState) => {
  // game = {
  //   id,
  //   user,
  //   string,
  // }
  try {
    dispatch({
      type: UPDATE_GAME_STRING_REQUEST,
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

    const { data } = await axios.put(`/api/games/start/`, game, config);

    dispatch({
      type: UPDATE_GAME_STRING_SUCCESS,
      payload: data,
    });
    localStorage.setItem("gameInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_GAME_STRING_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getGame = (game) => async (dispatch, getState) => {
  // game = {
  //   id,
  //   user,
  //   string,
  // }
  try {
    dispatch({
      type: GET_GAME_STRING_REQUEST,
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

    const { data } = await axios.put(`/api/games/start/getGame/`, game, config);

    dispatch({
      type: GET_GAME_STRING_SUCCESS,
      payload: data,
    });
    localStorage.setItem("gameInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_GAME_STRING_FAILED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
