import axios from "axios";
import {
  SET_BARTENDERS,
  SET_BARTENDERS_LOADING,
  CLEAR_BARTENDERS,
  GET_ERRORS
} from "./types";

//set bartenders loading
export const setBartendersLoading = () => {
  return {
    type: SET_BARTENDERS_LOADING
  };
};

//clear bartenders
export const clearBartenders = () => dispatch => {
  dispatch({
    type: CLEAR_BARTENDERS,
    payload: {}
  });
};

//get all bartenders
export const getAllBartenders = () => dispatch => {
  dispatch(setBartendersLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bartender"
    )
    .then(res => {
      dispatch({
        type: SET_BARTENDERS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_BARTENDERS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
