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
  SET_MONTHLY
} from "../actions/types";

let initialState = {
  drinkers: [],
  drinker: {},
  topBeers: {},
  daily: {},
  weekly: {},
  monthly: {},
  loadingDrinker: false,
  loadingOneDrinker: false
};

export default function(state = initialState, action) {
  switch (action.type) {
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
        loadingOneDrinker: false
      };
    case SET_TOP_BEER:
      return {
        ...state,
        topBeers: action.payload,
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
        loadingOneDrinker: true
      };
    case SET_WEEKLY:
      return {
        ...state,
        weekly: action.payload,
        loadingOneDrinker: true
      };
    case SET_MONTHLY:
      return {
        ...state,
        monthly: action.payload,
        loadingOneDrinker: true
      };
    case CLEAR_DRINKER:
      return {
        ...state,
        drinker: {},
        topBeers: {},
        daily: {},
        weekly: {},
        monthly: {},
        loadingOneDrinker: false
      };
    case CLEAR_DRINKERS:
      return {
        drinkers: {},
        loadingDrinker: false
      };
    default:
      return state;
  }
}
