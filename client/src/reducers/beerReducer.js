import {
  SET_MANUFACTURERS,
  CLEAR_MANFS,
  CLEAR_MANF,
  SET_LOADING_MANF,
  SET_LOADING_MANF_ONE,
  SET_BAR_TOP_10,
  SET_BEERS,
  CLEAR_BEERS,
  CLEAR_SELECTED_BEER,
  SET_SOLD_MOST,
  SET_BIGGEST_CONSUMERS,
  SET_TIME_DISTRIBUTION
} from "../actions/types";

let initialState = {
  manfs: {},
  top10bar: {},
  beers: {},
  soldMost: {},
  biggestConsumers: {},
  timeDistribution: {},
  count: 0,
  loadingManf: false,
  loadingManfOne: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MANUFACTURERS:
      return {
        ...state,
        manfs: action.payload,
        loadingManf: false
      };
    case SET_BEERS:
      return {
        ...state,
        beers: action.payload,
        loadingManf: false
      };
    case SET_TIME_DISTRIBUTION:
      return {
        ...state,
        timeDistribution: action.payload,
        count: state.count + 1,
        loadingManfOne: false
      };
    case SET_SOLD_MOST:
      return {
        ...state,
        soldMost: action.payload,
        count: state.count + 1,
        loadingManfOne: false
      };
    case SET_BIGGEST_CONSUMERS:
      return {
        ...state,
        biggestConsumers: action.payload,
        count: state.count + 1,
        loadingManfOne: false
      };
    case SET_LOADING_MANF:
      return {
        ...state,
        loadingManf: true
      };
    case SET_LOADING_MANF_ONE:
      return {
        ...state,
        loadingManfOne: true
      };
    case CLEAR_MANF:
      return {
        ...state,
        top10bar: {},
        loadingManfOne: false
      };
    case CLEAR_BEERS:
      return {
        ...state,
        manfs: {},
        top10bar: {},
        beers: {},
        soldMost: {},
        biggestConsumers: {},
        timeDistribution: {},
        count: 0,
        loadingManf: false,
        loadingManfOne: false
      };
    case CLEAR_SELECTED_BEER:
      return {
        ...state,
        soldMost: {},
        biggestConsumers: {},
        timeDistribution: {},
        count: 0
      };
    case CLEAR_MANFS:
      return {
        manfs: {},
        top10bar: {},
        loadingManf: false
      };
    case SET_BAR_TOP_10:
      return {
        ...state,
        top10bar: action.payload,
        loadingManfOne: false
      };
    default:
      return state;
  }
}
