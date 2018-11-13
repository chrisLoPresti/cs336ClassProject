import {
  SET_BARTENDERS,
  SET_BARTENDERS_LOADING,
  CLEAR_BARTENDERS,
  SET_WORKS,
  CLEAR_SELECTED_BARTENDER,
  SET_BARTENDERS_LOADING_ONE,
  SET_SHIFTS,
  SET_SOLD,
  SET_ANALYTICS,
  CLEAR_ANALYTICS,
  LOADING_ANALYTICS
} from "../actions/types";

let initialState = {
  bartenders: {},
  works: {},
  shifts: {},
  sold: {},
  analytics: {},
  count: 0,
  loadingAnalytics: false,
  bartendersLoading: false,
  bartenderLoadingOne: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED_BARTENDER:
      return {
        ...state,
        works: {},
        shifts: {},
        sold: {},
        analytics: {},
        count: 0
      };
    case SET_WORKS:
      return {
        ...state,
        works: action.payload,
        bartendersLoading: false
      };
    case SET_SOLD:
      return {
        ...state,
        sold: action.payload,
        count: state.count + 1,
        bartenderLoadingOne: false
      };
    case SET_ANALYTICS:
      return {
        ...state,
        analytics: action.payload,
        loadingAnalytics: false
      };
    case SET_SHIFTS:
      return {
        ...state,
        shifts: action.payload,
        count: state.count + 1,
        bartenderLoadingOne: false
      };
    case CLEAR_ANALYTICS:
      return {
        ...state,
        analytics: {}
      };
    case CLEAR_BARTENDERS:
      return {
        bartenders: {},
        works: {},
        shifts: {},
        sold: {},
        analytics: {},
        count: 0,
        bartendersLoading: false,
        bartenderLoadingOne: false
      };
    case SET_BARTENDERS_LOADING:
      return {
        ...state,
        bartendersLoading: true
      };
    case SET_BARTENDERS_LOADING_ONE:
      return {
        ...state,
        bartenderLoadingOne: true
      };
    case LOADING_ANALYTICS:
      return {
        ...state,
        loadingAnalytics: true
      };
    case SET_BARTENDERS:
      return {
        ...state,
        bartenders: action.payload,
        bartendersLoading: false
      };
    default:
      return state;
  }
}
