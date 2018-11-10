import {
  SET_QUERY,
  SET_LOADING_QUERY,
  CLEAR_QUERY_RESULTS
} from "../actions/types";

let initialState = {
  query: [],
  loadingQuery: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
        loadingQuery: false
      };
    case SET_LOADING_QUERY:
      return {
        ...state,
        loadingQuery: true
      };
    case CLEAR_QUERY_RESULTS:
      return {
        query: [],
        loadingQuery: false
      };
    default:
      return state;
  }
}
