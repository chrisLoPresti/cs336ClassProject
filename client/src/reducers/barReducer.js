import { SET_BARS, CLEAR_BARS, SET_BARS_LOADING } from "../actions/types";

let initialState = {
  bars: {},
  loadingBars: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BARS:
      return {
        ...state,
        bars: action.payload,
        loadingBars: false
      };
    case CLEAR_BARS:
      return {
        bars: {},
        loadingBars: false
      };
    case SET_BARS_LOADING:
      return {
        ...state,
        loadingBars: true
      };
    default:
      return state;
  }
}
