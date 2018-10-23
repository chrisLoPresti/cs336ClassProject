import { combineReducers } from "redux";
import drinkersReducer from "./drinkersReducer";
import errorReducer from "./errorReducer";
import randomQueryReducer from "./randomQueryReducer";

export default combineReducers({
  drinkers: drinkersReducer,
  errors: errorReducer,
  query: randomQueryReducer
});
