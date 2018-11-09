import {
  SET_MANUFACTURERS,
  CLEAR_MANFS,
  CLEAR_MANF,
  SET_LOADING_MANF,
  SET_LOADING_MANF_ONE,
  SET_BAR_TOP_10
} from "../actions/types";

let initialState = {
  manfs: {},
  top10bar: {},
  loadingManf: false,
  loadingManfOne: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MANUFACTURERS:
      return {
        ...state,
        manfs: action.payload,
        loadingManf: false
      };
    case SET_LOADING_MANF:
      return {
        ...state,
        loadingManf: true
      };
    case SET_LOADING_MANF_ONE:
      return {
        ...state,
        loadingManfOne: true
      };
    case CLEAR_MANF:
      return {
        ...state,
        top10bar: {},
        loadingManfOne: false
      };
    case CLEAR_MANFS:
      return {
        manfs: {},
        top10bar: {},
        loadingManf: false
      };
    case SET_BAR_TOP_10:
      return {
        ...state,
        top10bar: action.payload,
        loadingManfOne: false
      };
    default:
      return state;
  }
}
