import {
  SET_MOD_BAR,
  SET_MOD_BARFOOD,
  SET_MOD_BARTENDER,
  SET_MOD_BEER,
  SET_MOD_BILLS,
  SET_MOD_DAY,
  SET_MOD_DRINKER,
  SET_MOD_FREQUENTS,
  SET_MOD_INVENTORY,
  SET_MOD_LIKES,
  SET_MOD_OPERATES,
  SET_MOD_SELLSBEER,
  SET_MOD_SELLSFOOD,
  SET_MOD_SHIFTS,
  SET_MOD_TRANSACTIONS,
  SET_MOD_LOADING,
  CLEAR_MODIFICATION
} from "../actions/types";

let initialState = {
  Bar: {},
  BarFood: {},
  Bartender: {},
  Beer: {},
  Bills: [],
  Day: {},
  Drinker: {},
  Frequents: {},
  Inventory: {},
  Likes: {},
  Operates: [],
  SellsBeer: {},
  SellsFood: {},
  Shifts: [],
  Transactions: [],
  loadingModification: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MOD_LOADING:
      return {
        ...state,
        loadingModification: true
      };
    case CLEAR_MODIFICATION:
      return {
        Bar: {},
        BarFood: {},
        Bartender: {},
        Beer: {},
        Bills: [],
        Day: {},
        Drinker: {},
        Frequents: {},
        Inventory: {},
        Likes: {},
        Operates: [],
        SellsBeer: {},
        SellsFood: {},
        Shifts: [],
        Transactions: [],
        loadingModification: false
      };
    case SET_MOD_BAR:
      return {
        ...state,
        Bar: action.payload,
        loadingModification: false
      };
    case SET_MOD_BARFOOD:
      return {
        ...state,
        BarFood: action.payload,
        loadingModification: false
      };
    case SET_MOD_BARTENDER:
      return {
        ...state,
        Bartender: action.payload,
        loadingModification: false
      };
    case SET_MOD_BEER:
      return {
        ...state,
        Beer: action.payload,
        loadingModification: false
      };
    case SET_MOD_BILLS:
      return {
        ...state,
        Bills: [...state.Bills, ...action.payload],
        loadingModification: false
      };
    case SET_MOD_DAY:
      return {
        ...state,
        Day: action.payload,
        loadingModification: false
      };
    case SET_MOD_DRINKER:
      return {
        ...state,
        Drinker: action.payload,
        loadingModification: false
      };
    case SET_MOD_FREQUENTS:
      return {
        ...state,
        Frequents: action.payload,
        loadingModification: false
      };
    case SET_MOD_INVENTORY:
      return {
        ...state,
        Inventory: action.payload,
        loadingModification: false
      };
    case SET_MOD_LIKES:
      return {
        ...state,
        Likes: action.payload,
        loadingModification: false
      };
    case SET_MOD_OPERATES:
      return {
        ...state,
        Operates: [...state.Operates, ...action.payload],
        loadingModification: false
      };
    case SET_MOD_SELLSBEER:
      return {
        ...state,
        SellsBeer: action.payload,
        loadingModification: false
      };
    case SET_MOD_SELLSFOOD:
      return {
        ...state,
        SellsFood: action.payload,
        loadingModification: false
      };
    case SET_MOD_SHIFTS:
      return {
        ...state,
        Shifts: [...state.Shifts, ...action.payload],
        loadingModification: false
      };
    case SET_MOD_TRANSACTIONS:
      return {
        ...state,
        Transactions: [...state.Transactions, ...action.payload],
        loadingModification: false
      };
    default:
      return state;
  }
}
