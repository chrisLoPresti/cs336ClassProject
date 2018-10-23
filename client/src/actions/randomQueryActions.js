import axios from "axios";
import { SET_QUERY, SET_LOADING_QUERY, GET_ERRORS } from "./types";

//get post
export const getQueryResults = query => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/randomQuery", query)
    .then(res => {
      dispatch({
        type: SET_QUERY,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_QUERY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//set loading
export const setLoading = () => {
  return {
    type: SET_LOADING_QUERY
  };
};

//set errorsQuery
export const setQueryErrors = error => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: error
  });
};
