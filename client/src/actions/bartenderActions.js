import axios from "axios";
import {
  SET_BARTENDERS,
  SET_BARTENDERS_LOADING,
  CLEAR_BARTENDERS,
  GET_ERRORS,
  SET_WORKS,
  CLEAR_SELECTED_BARTENDER,
  SET_BARTENDERS_LOADING_ONE,
  SET_SHIFTS,
  SET_SOLD,
  SET_ANALYTICS,
  CLEAR_ANALYTICS,
  LOADING_ANALYTICS
} from "./types";

//set bartenders loading
export const setBartendersLoading = () => {
  return {
    type: SET_BARTENDERS_LOADING
  };
};

//set analytics loading
export const setAnalyticsLoading = () => {
  return {
    type: LOADING_ANALYTICS
  };
};

//set bartenders loading
export const setBartendersLoadingOne = () => {
  return {
    type: SET_BARTENDERS_LOADING_ONE
  };
};

//clear bartenders
export const clearBartenders = () => dispatch => {
  dispatch({
    type: CLEAR_BARTENDERS,
    payload: {}
  });
};

//clear analytics
export const clearAnalytics = () => dispatch => {
  dispatch({
    type: CLEAR_ANALYTICS,
    payload: {}
  });
};

//clear selected bartender
export const clearSelectedBartender = () => dispatch => {
  dispatch({
    type: CLEAR_SELECTED_BARTENDER,
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
        payload: err.response
      });
    });
};

//get all bar where the bartender works
export const getWorkingBars = bartender => dispatch => {
  dispatch(setBartendersLoading());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bartender/works?bartender=${bartender}`
    )
    .then(res => {
      dispatch({
        type: SET_WORKS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_WORKS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get all bar where the bartender works
export const getShifts = (bartender, bar) => dispatch => {
  dispatch(setBartendersLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bartender/shifts/past?bartender=${bartender}&bar=${bar}`
    )
    .then(res => {
      dispatch({
        type: SET_SHIFTS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SHIFTS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//get all bar where the bartender works
export const getSold = (bartender, bar) => dispatch => {
  dispatch(setBartendersLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bartender/sold/beer/brands?bartender=${bartender}&bar=${bar}`
    )
    .then(res => {
      dispatch({
        type: SET_SOLD,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SOLD,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getAnalytics = (bar, day, start, end) => dispatch => {
  dispatch(setAnalyticsLoading());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bartender/rank/sold/beers?bar=${bar}&day=${day}&startTime=${start}&endTime=${end}`
    )
    .then(res => {
      dispatch({
        type: SET_ANALYTICS,
        payload: res.data
      });
      if (res.data.length === 0) {
        dispatch({
          type: GET_ERRORS,
          payload:
            "We could not find any results for your given input. Please try again."
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: {}
        });
      }
    })
    .catch(err => {
      dispatch({
        type: SET_ANALYTICS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
