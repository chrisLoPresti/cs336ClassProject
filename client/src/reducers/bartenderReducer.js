import {
  SET_BARTENDERS,
  SET_BARTENDERS_LOADING,
  CLEAR_BARTENDERS
} from "../actions/types";

let initialState = {
  bartenders: {},
  bartendersLoading: false,
  bartenderLoadingOne: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_BARTENDERS:
      return {
        bartenders: {},
        bartendersLoading: false,
        bartenderLoadingOne: false
      };
    case SET_BARTENDERS_LOADING:
      return {
        ...state,
        bartendersLoading: true
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
