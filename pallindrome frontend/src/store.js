import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  getGameStringReducer,
  startGameReducer,
  updateGameStringReducer,
} from "./reducers/gameReducers";

const reducer = combineReducers({
  // user registration
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  // game registration
  Game: startGameReducer,
  updateGame: updateGameStringReducer,
  getGameString: getGameStringReducer,
});

//get localstorage useInfo and add to userLogin if loggedIn
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//get localstorage useInfo and add to userLogin if loggedIn
const gameInfoFromStorage = localStorage.getItem("gameInfo")
  ? JSON.parse(localStorage.getItem("gameInfo"))
  : null;

const middleware = [thunk];
const initialState = {
  Game: gameInfoFromStorage,
  userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
