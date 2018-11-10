import axios from "axios";
import {
  SET_MANUFACTURERS,
  CLEAR_MANFS,
  CLEAR_MANF,
  SET_LOADING_MANF,
  SET_LOADING_MANF_ONE,
  GET_ERRORS,
  SET_BAR_TOP_10,
  SET_BEERS,
  CLEAR_BEERS,
  SET_SELECTED_BEER,
  CLEAR_SELECTED_BEER
} from "./types";

export const setManfsLoading = () => {
  return {
    type: SET_LOADING_MANF
  };
};

export const setManfOneLoading = () => {
  return {
    type: SET_LOADING_MANF_ONE
  };
};

export const clearManfOne = () => dispatch => {
  dispatch({
    type: CLEAR_MANF,
    payload: {}
  });
};

export const clearBeers = () => dispatch => {
  dispatch({
    type: CLEAR_BEERS,
    payload: {}
  });
};

export const clearManfs = () => dispatch => {
  dispatch({
    type: CLEAR_MANFS,
    payload: {}
  });
};

export const getManfs = () => dispatch => {
  dispatch(setManfsLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/manufacturer"
    )
    .then(res => {
      dispatch({
        type: SET_MANUFACTURERS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_MANUFACTURERS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getBarTop10 = manf => dispatch => {
  dispatch(setManfOneLoading());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/rank/sales/manf?manf=${manf}`
    )
    .then(res => {
      dispatch({
        type: SET_BAR_TOP_10,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_BAR_TOP_10,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getBeers = () => dispatch => {
  dispatch(setManfsLoading());
  axios
    .get("https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/beer")
    .then(res => {
      dispatch({
        type: SET_BEERS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_BEERS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
