import {
  SET_DRINKERS,
  SET_LOADING_DRINKER,
  SET_LOADING_ONE_DRINKER,
  SET_DRINKER,
  SET_TOP_BEER,
  CLEAR_DRINKERS,
  CLEAR_DRINKER,
  SET_DAILY,
  SET_WEEKLY,
  SET_MONTHLY,
  SET_SPENDING,
  CLEAR_COUNT
} from "../actions/types";
import { LOCATION_CHANGE } from "react-router-redux";

let initialState = {
  drinkers: [],
  drinker: {},
  topBeers: {},
  daily: {},
  weekly: {},
  monthly: {},
  spending: {},
  count: 0,
  loadingDrinker: false,
  loadingOneDrinker: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        drinkers: [],
        drinker: {},
        topBeers: {},
        daily: {},
        weekly: {},
        monthly: {},
        spending: {},
        count: 0,
        loadingDrinker: false,
        loadingOneDrinker: false
      };
    case CLEAR_COUNT:
      return {
        ...state,
        count: 0,
        loadingDrinker: false
      };
    case SET_DRINKERS:
      return {
        ...state,
        drinkers: action.payload,
        loadingDrinker: false
      };
    case SET_DRINKER:
      return {
        ...state,
        drinker: action.payload,
        count: state.count === 6 ? state.count : state.count + 1,
        loadingOneDrinker: false
      };
    case SET_TOP_BEER:
      return {
        ...state,
        topBeers: action.payload,
        count: state.count === 6 ? state.count : state.count + 1,
        loadingOneDrinker: false
      };
    case SET_LOADING_DRINKER:
      return {
        ...state,
        loadingDrinker: true
      };
    case SET_LOADING_ONE_DRINKER:
      return {
        ...state,
        loadingOneDrinker: true
      };
    case SET_DAILY:
      return {
        ...state,
        daily: action.payload,
        count: state.count === 6 ? state.count : state.count + 1,
        loadingOneDrinker: false
      };
    case SET_WEEKLY:
      return {
        ...state,
        count: state.count === 6 ? state.count : state.count + 1,
        weekly: action.payload,
        loadingOneDrinker: false
      };
    case SET_MONTHLY:
      return {
        ...state,
        count: state.count === 6 ? state.count : state.count + 1,
        monthly: action.payload,
        loadingOneDrinker: false
      };
    case SET_SPENDING:
      return {
        ...state,
        count: state.count === 6 ? state.count : state.count + 1,
        spending: action.payload,
        loadingOneDrinker: false
      };
    case CLEAR_DRINKER:
      return {
        ...state,
        drinker: {},
        topBeers: {},
        daily: {},
        weekly: {},
        monthly: {},
        spending: {},
        count: 0,
        loadingOneDrinker: false
      };
    case CLEAR_DRINKERS:
      return {
        drinkers: {},
        drinker: {},
        topBeers: {},
        daily: {},
        weekly: {},
        monthly: {},
        spending: {},
        count: 0,
        loadingDrinker: false
      };
    default:
      return state;
  }
}
