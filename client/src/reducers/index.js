import { combineReducers } from "redux";
import drinkersReducer from "./drinkersReducer";
import errorReducer from "./errorReducer";
import randomQueryReducer from "./randomQueryReducer";
import barReducer from "./barReducer";

export default combineReducers({
  drinkers: drinkersReducer,
  errors: errorReducer,
  bars: barReducer,
  query: randomQueryReducer
});
