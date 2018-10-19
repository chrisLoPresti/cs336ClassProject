import { SET_DRINKERS, SET_LOADING } from "../actions/types";

let initialState = {
  drinkers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DRINKERS:
      return {
        ...state,
        drinkers: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
