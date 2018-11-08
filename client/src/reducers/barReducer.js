import {
  SET_BARS,
  CLEAR_BARS,
  SET_BARS_LOADING,
  SET_TOP_MANF,
  CLEAR_BAR,
  SET_BARS_LOADING_ONE
} from "../actions/types";

let initialState = {
  bars: {},
  topManf: {},
  loadingBars: false,
  loadingBarsOne: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BARS:
      return {
        ...state,
        bars: action.payload,
        loadingBars: false
      };
    case SET_TOP_MANF:
      return {
        ...state,
        topManf: action.payload,
        loadingBarsOne: false
      };
    case CLEAR_BARS:
      return {
        ...state,
        bars: {},
        topManf: {},
        loadingBars: false
      };
    case CLEAR_BAR:
      return {
        ...state,
        topManf: {},
        loadingBarsOne: false
      };
    case SET_BARS_LOADING:
      return {
        ...state,
        loadingBars: true
      };
    case SET_BARS_LOADING_ONE:
      return {
        ...state,
        loadingBarsOne: true
      };
    default:
      return state;
  }
}
