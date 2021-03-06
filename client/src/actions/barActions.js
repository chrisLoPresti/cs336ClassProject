import axios from "axios";
import {
  SET_BARS_LOADING,
  SET_BARS_LOADING_ONE,
  CLEAR_BARS,
  SET_BARS,
  GET_ERRORS,
  SET_TOP_MANF,
  CLEAR_BAR,
  SET_SPENDERS,
  SET_SALES_DAY,
  SET_SALES_TIME,
  DECREMENT_COUNT,
  SET_FRACTION,
  SET_HOURS,
  SET_TOP10_BY_DAY,
  CLEAR_TOP_10_DAY
} from "./types";

export const decrementCount = () => dispatch => {
  dispatch({
    type: DECREMENT_COUNT,
    payload: {}
  });
};

export const clearTop10Day = () => dispatch => {
  dispatch({
    type: CLEAR_TOP_10_DAY,
    payload: {}
  });
};

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
        payload: err.response
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
        payload: err.response
      });
    });
};

export const getSpenders = bar => dispatch => {
  dispatch(setBarsLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/top/spenders?bar=${bar}`
    )
    .then(res => {
      dispatch({
        type: SET_SPENDERS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SPENDERS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getSales = bar => dispatch => {
  dispatch(setBarsLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/sale/distribution/days?bar=${bar}`
    )
    .then(res => {
      dispatch({
        type: SET_SALES_DAY,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SALES_DAY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getSalesTime = bar => dispatch => {
  dispatch(setBarsLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/sale/time/distribution?bar=${bar}`
    )
    .then(res => {
      dispatch({
        type: SET_SALES_TIME,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SALES_TIME,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getFraction = bar => dispatch => {
  dispatch(setBarsLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/inventory/fraction?bar=${bar}`
    )
    .then(res => {
      dispatch({
        type: SET_FRACTION,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_FRACTION,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getHours = bar => dispatch => {
  dispatch(setBarsLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/operates?bar=${bar}`
    )
    .then(res => {
      dispatch({
        type: SET_HOURS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_HOURS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getTop10ByDay = day => dispatch => {
  dispatch(setBarsLoadingOne());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar/rank/sales/day?day=${day}`
    )
    .then(res => {
      dispatch({
        type: SET_TOP10_BY_DAY,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TOP10_BY_DAY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
