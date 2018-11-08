import {
  SET_BARS,
  CLEAR_BARS,
  SET_BARS_LOADING,
  SET_TOP_MANF,
  CLEAR_BAR,
  SET_BARS_LOADING_ONE,
  SET_SPENDERS,
  SET_SALES_DAY,
  SET_SALES_TIME,
  DECREMENT_COUNT,
  SET_FRACTION
} from "../actions/types";

let initialState = {
  bars: {},
  topManf: {},
  spenders: {},
  sales: {},
  time: {},
  fraction: {},
  count: 0,
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
    case SET_FRACTION:
      return {
        ...state,
        fraction: action.payload,
        count: state.count + 1,
        loadingBarsOne: false
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1
      };
    case SET_SALES_DAY:
      return {
        ...state,
        sales: action.payload,
        count: state.count + 1,
        loadingBarsOne: false
      };
    case SET_SALES_TIME:
      return {
        ...state,
        time: action.payload,
        count: state.count + 1,
        loadingBarsOne: false
      };
    case SET_TOP_MANF:
      return {
        ...state,
        topManf: action.payload,
        count: state.count + 1,
        loadingBarsOne: false
      };
    case SET_SPENDERS:
      return {
        ...state,
        spenders: action.payload,
        count: state.count + 1,
        loadingBarsOne: false
      };
    case CLEAR_BARS:
      return {
        ...state,
        bars: {},
        topManf: {},
        spenders: {},
        sales: {},
        time: {},
        fraction: {},
        count: 0,
        loadingBars: false
      };
    case CLEAR_BAR:
      return {
        ...state,
        topManf: {},
        spenders: {},
        sales: {},
        time: {},
        fraction: {},
        count: 0,
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
