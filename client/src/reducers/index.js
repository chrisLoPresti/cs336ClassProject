import { combineReducers } from "redux";
import drinkersReducer from "./drinkersReducer";
import errorReducer from "./errorReducer";
import randomQueryReducer from "./randomQueryReducer";
import barReducer from "./barReducer";
import beerReducer from "./beerReducer";
import bartenderReducer from "./bartenderReducer";

export default combineReducers({
  drinkers: drinkersReducer,
  errors: errorReducer,
  bars: barReducer,
  beer: beerReducer,
  bartenders: bartenderReducer,
  query: randomQueryReducer
});
