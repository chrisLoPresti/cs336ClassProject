import axios from "axios";
import {
  SET_DRINKERS,
  SET_LOADING_DRINKER,
  SET_LOADING_ONE_DRINKER,
  GET_ERRORS,
  SET_DRINKER,
  SET_TOP_BEER,
  CLEAR_DRINKER,
  CLEAR_DRINKERS,
  SET_DAILY,
  SET_MONTHLY,
  SET_WEEKLY,
  SET_SPENDING,
  CLEAR_COUNT
} from "./types";

//clear drinkers
export const clearDrinkers = () => dispatch => {
  dispatch({
    type: CLEAR_DRINKERS,
    payload: {}
  });
};

//clear drinker
export const clearDrinker = () => dispatch => {
  dispatch({
    type: CLEAR_DRINKER,
    payload: {}
  });
};

export const clearCount = () => dispatch => {
  dispatch({
    type: CLEAR_COUNT,
    payload: {}
  });
};

//get post
export const getDrinkers = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker"
    )
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

//get post
export const getDailySpending = drinker => dispatch => {
  dispatch(setLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker/spent/day?drinker=${drinker}`
    )
    .then(res => {
      dispatch({
        type: SET_DAILY,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_DAILY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getSpending = drinker => dispatch => {
  dispatch(setLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker/bar/spent?drinker=${drinker}`
    )
    .then(res => {
      dispatch({
        type: SET_SPENDING,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SPENDING,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getWeeklySpending = drinker => dispatch => {
  dispatch(setLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker/spent/week?drinker=${drinker}`
    )
    .then(res => {
      dispatch({
        type: SET_WEEKLY,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_WEEKLY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getMonthlySpending = drinker => dispatch => {
  dispatch(setLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker/spent/month?drinker=${drinker}`
    )
    .then(res => {
      dispatch({
        type: SET_MONTHLY,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_MONTHLY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getDrinker = drinker => dispatch => {
  dispatch(setLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker/transactions?drinker=${drinker}`
    )
    .then(res => {
      dispatch({
        type: SET_DRINKER,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_DRINKER,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getTopBeers = drinker => dispatch => {
  dispatch(setLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker/beer/top?drinker=${drinker}`
    )
    .then(res => {
      dispatch({
        type: SET_TOP_BEER,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TOP_BEER,
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
    type: SET_LOADING_DRINKER
  };
};

export const setLoadingOne = () => {
  return {
    type: SET_LOADING_ONE_DRINKER
  };
};
