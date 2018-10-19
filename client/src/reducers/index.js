import { combineReducers } from "redux";
import drinkersReducer from "./drinkersReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  drinkers: drinkersReducer,
  errors: errorReducer
});
