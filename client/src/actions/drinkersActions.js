import axios from "axios";
import { SET_DRINKERS, SET_LOADING, GET_ERRORS } from "./types";

//get post
export const getDrinkers = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/drinkers")
    .then(res => {
      dispatch({
        type: SET_DRINKERS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_DRINKERS,
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
    type: SET_LOADING
  };
};
