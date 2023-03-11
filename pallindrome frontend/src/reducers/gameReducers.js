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
  GET_USER_GAMES_REQUEST,
  GET_USER_GAMES_SUCCESS,
  GET_USER_GAMES_FAILED,
} from "../constants/gameConstants";

export const startGameReducer = (state = {}, action) => {
  switch (action.type) {
    case START_GAME_REQUEST:
      return { loading: true };

    case START_GAME_SUCCESS:
      return { loading: false, game: action.payload };

    case START_GAME_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateGameStringReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GAME_STRING_REQUEST:
      return { loading: true };

    case UPDATE_GAME_STRING_SUCCESS:
      return { loading: false, success: true, game: action.payload };

    case UPDATE_GAME_STRING_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getGameStringReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_GAME_STRING_REQUEST:
      return { loading: true };

    case GET_GAME_STRING_SUCCESS:
      return { loading: false, success: true, game: action.payload };

    case GET_GAME_STRING_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getUserGamesListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_GAMES_REQUEST:
      return { loading: true };

    case GET_USER_GAMES_SUCCESS:
      return { loading: false, success: true, usergames: action.payload };

    case GET_USER_GAMES_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
