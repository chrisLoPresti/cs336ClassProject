import { GET_ERRORS } from "../actions/types";

let initialState = {
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return (
        action.payload !== "undefined" && { ...state, error: action.payload }
      );
    default:
      return state;
  }
}
