import { SET_DRINKERS, SET_LOADING_DRINKER } from "../actions/types";

let initialState = {
  drinkers: [],
  loadingDrinker: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DRINKERS:
      return {
        ...state,
        drinkers: action.payload,
        loadingDrinker: false
      };
    case SET_LOADING_DRINKER:
      return {
        ...state,
        loadingDrinker: true
      };
    default:
      return state;
  }
}
