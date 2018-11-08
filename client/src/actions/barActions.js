import axios from "axios";
import {
  SET_BARS_LOADING,
  SET_BARS_LOADING_ONE,
  CLEAR_BARS,
  SET_BARS,
  GET_ERRORS,
  SET_TOP_MANF,
  CLEAR_BAR
} from "./types";

export const clearBars = () => dispatch => {
  dispatch({
    type: CLEAR_BARS,
    payload: {}
  });
};

export const clearBar = () => dispatch => {
  dispatch({
    type: CLEAR_BAR,
    payload: {}
  });
};

export const setBarsLoading = () => {
  return {
    type: SET_BARS_LOADING
  };
};

export const setBarsLoadingOne = () => {
  return {
    type: SET_BARS_LOADING_ONE
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

export const getTopBrands = params => dispatch => {
  dispatch(setBarsLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/beer/top?bar=${
        params.bar
      }&day_of_week=${params.day}`
    )
    .then(res => {
      dispatch({
        type: SET_TOP_MANF,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TOP_MANF,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
