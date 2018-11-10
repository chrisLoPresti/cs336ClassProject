import { GET_ERRORS } from "./types";

export const clearErrors = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};
