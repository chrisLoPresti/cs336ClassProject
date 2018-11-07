import axios from "axios";
import { SET_BARS_LOADING, CLEAR_BARS, SET_BARS, GET_ERRORS } from "./types";

export const clearBars = () => dispatch => {
  dispatch({
    type: CLEAR_BARS,
    payload: {}
  });
};

export const setBarsLoading = () => {
  return {
    type: SET_BARS_LOADING
  };
};

export const getBars = () => dispatch => {
  dispatch(setBarsLoading());
  axios
    .get("https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar")
    .then(res => {
      dispatch({
        type: SET_BARS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_BARS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
