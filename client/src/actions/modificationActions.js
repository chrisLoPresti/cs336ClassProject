import axios from "axios";
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
  CLEAR_MODIFICATION,
  GET_ERRORS
} from "./types";

//set bartenders loading
export const setModificationLoading = () => {
  return {
    type: SET_MOD_LOADING
  };
};

//clear mods
export const clearModifications = () => {
  return {
    type: CLEAR_MODIFICATION
  };
};

export const getDrinkers = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/drinker"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_DRINKER,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_DRINKER,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getBars = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get("https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bar")
    .then(res => {
      dispatch({
        type: SET_MOD_BAR,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_BAR,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getBeers = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get("https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/beer")
    .then(res => {
      dispatch({
        type: SET_MOD_BEER,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_BEER,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getShifts = (data, num) => dispatch => {
  if (num === 0) {
    dispatch(clearModifications());
  }
  dispatch(setModificationLoading());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/shifts?num=${num}`
    )
    .then(res => {
      dispatch({
        type: SET_MOD_SHIFTS,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_SHIFTS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getBarfood = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/barfood"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_BARFOOD,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_BARFOOD,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getDay = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/day"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_DAY,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_DAY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getFrequents = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/frequents"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_FREQUENTS,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_FREQUENTS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getLikes = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/likes"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_LIKES,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_LIKES,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//dead call not using this
export const getInventory = () => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/inventory"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_INVENTORY,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: SET_MOD_INVENTORY,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getOperates = (data, num) => dispatch => {
  if (num === 0) {
    dispatch(clearModifications());
  }
  dispatch(setModificationLoading());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/operates?num=${num}`
    )
    .then(res => {
      dispatch({
        type: SET_MOD_OPERATES,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_OPERATES,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getSellsbeer = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsbeer"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_SELLSBEER,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_SELLSBEER,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getSellsfood = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsfood"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_SELLSFOOD,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_SELLSFOOD,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getBartenders = data => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/bartender"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_BARTENDER,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_BARTENDER,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//ERRRORORORORORORORORO
export const getBills = (data, num) => dispatch => {
  if (num === 0) {
    dispatch(clearModifications());
  }
  dispatch(setModificationLoading());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bills?num=${num}`
    )
    .then(res => {
      dispatch({
        type: SET_MOD_BILLS,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_BILLS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getTransactions = (data, num) => dispatch => {
  if (num === 0) {
    dispatch(clearModifications());
  }
  dispatch(setModificationLoading());
  axios
    .get(
      `https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/transactions?num=${num}`
    )
    .then(res => {
      dispatch({
        type: SET_MOD_TRANSACTIONS,
        payload: res.data
      });
      if (data) {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        type: SET_MOD_TRANSACTIONS,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//modifications
export const insertDrinker = (name, phone, state, oldname) => dispatch => {
  var obj = { name, phone, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/drinker/insert",
      obj
    )
    .then(res => {
      dispatch(getDrinkers(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteDrinker = (name, phone, state, oldname) => dispatch => {
  var obj = { name, phone, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/drinker/delete",
      obj
    )
    .then(res => {
      dispatch(getDrinkers(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateDrinker = (name, phone, state, oldname) => dispatch => {
  var obj = { name, phone, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/drinker/update",
      obj
    )
    .then(res => {
      dispatch(getDrinkers(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertBarfood = (name, oldname) => dispatch => {
  var obj = { name, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/barfood/insert",
      obj
    )
    .then(res => {
      dispatch(getBarfood(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteBarfood = (name, oldname) => dispatch => {
  var obj = { name, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/barfood/delete",
      obj
    )
    .then(res => {
      dispatch(getBarfood(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateBarfood = (name, oldname) => dispatch => {
  var obj = { name, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/barfood/update",
      obj
    )
    .then(res => {
      dispatch(getBarfood(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertBars = (name, state, oldname) => dispatch => {
  var obj = { name, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bar/insert",
      obj
    )
    .then(res => {
      dispatch(getBars(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteBars = (name, state, oldname) => dispatch => {
  var obj = { name, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bar/delete",
      obj
    )
    .then(res => {
      dispatch(getBars(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateBars = (name, state, oldname) => dispatch => {
  var obj = { name, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bar/update",
      obj
    )
    .then(res => {
      dispatch(getBars(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertBartender = (name, phone, state, oldname) => dispatch => {
  var obj = { name, phone, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bartender/insert",
      obj
    )
    .then(res => {
      dispatch(getBartenders(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteBartender = (name, phone, state, oldname) => dispatch => {
  var obj = { name, phone, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bartender/delete",
      obj
    )
    .then(res => {
      dispatch(getBartenders(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateBartender = (name, phone, state, oldname) => dispatch => {
  var obj = { name, phone, state, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bartender/update",
      obj
    )
    .then(res => {
      dispatch(getBartenders(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertBeer = (name, manf, oldname) => dispatch => {
  var obj = { name, manf, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/beer/insert",
      obj
    )
    .then(res => {
      dispatch(getBeers(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteBeer = (name, manf, oldname) => dispatch => {
  var obj = { name, manf, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/beer/delete",
      obj
    )
    .then(res => {
      dispatch(getBeers(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateBeer = (name, manf, oldname) => dispatch => {
  var obj = { name, manf, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/beer/update",
      obj
    )
    .then(res => {
      dispatch(getBeers(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertDay = (name, oldname) => dispatch => {
  var obj = { name, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/day/insert",
      obj
    )
    .then(res => {
      dispatch(getDay(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteDay = (name, oldname) => dispatch => {
  var obj = { name, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/day/delete",
      obj
    )
    .then(res => {
      dispatch(getDay(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateDay = (name, oldname) => dispatch => {
  var obj = { name, old_name: oldname };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/day/update",
      obj
    )
    .then(res => {
      dispatch(getDay(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertFrequents = (
  bar,
  drinker,
  old_bar,
  old_drinker
) => dispatch => {
  var obj = { drinker, bar, old_bar, old_drinker };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/frequents/insert",
      obj
    )
    .then(res => {
      dispatch(getFrequents(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteFrequents = (
  bar,
  drinker,
  old_bar,
  old_drinker
) => dispatch => {
  var obj = { drinker, bar, old_bar, old_drinker };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/frequents/delete",
      obj
    )
    .then(res => {
      dispatch(getFrequents(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateFrequents = (
  beer,
  drinker,
  old_beer,
  old_drinker
) => dispatch => {
  var obj = { beer, drinker, old_beer, old_drinker };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/frequents/update",
      obj
    )
    .then(res => {
      dispatch(getFrequents(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertLikes = (
  beer,
  drinker,
  old_beer,
  old_drinker
) => dispatch => {
  var obj = { beer, drinker, old_beer, old_drinker };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/likes/insert",
      obj
    )
    .then(res => {
      dispatch(getLikes(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const deleteLikes = (
  beer,
  drinker,
  old_beer,
  old_drinker
) => dispatch => {
  var obj = { beer, drinker, old_beer, old_drinker };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/likes/delete",
      obj
    )
    .then(res => {
      dispatch(getLikes(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
export const updateLikes = (
  beer,
  drinker,
  old_beer,
  old_drinker
) => dispatch => {
  var obj = { drinker, beer, old_beer, old_drinker };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/likes/update",
      obj
    )
    .then(res => {
      dispatch(getLikes(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertOperates = (
  bar,
  day,
  start,
  end,
  date,
  old_bar,
  old_date
) => dispatch => {
  var obj = { bar, day, start, end, date, old_bar, old_date };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/operates/insert",
      obj
    )
    .then(res => {
      dispatch(getOperates(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const deleteOperates = (
  bar,
  day,
  start,
  end,
  date,
  old_bar,
  old_date
) => dispatch => {
  var obj = { bar, day, start, end, date, old_bar, old_date };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/operates/delete",
      obj
    )
    .then(res => {
      dispatch(getOperates(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const updateOperates = (
  bar,
  day,
  start,
  end,
  date,
  old_bar,
  old_date
) => dispatch => {
  var obj = { bar, day, start, end, date, old_bar, old_date };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/operates/update",
      obj
    )
    .then(res => {
      dispatch(getOperates(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertSellsbeer = (
  beername,
  barname,
  price,
  old_bar,
  old_beer
) => dispatch => {
  var obj = { beername, barname, price, old_bar, old_beer };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsbeer/insert",
      obj
    )
    .then(res => {
      dispatch(getSellsbeer(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const deleteSellsbeer = (
  beername,
  barname,
  price,
  old_bar,
  old_beer
) => dispatch => {
  var obj = { beername, barname, price, old_bar, old_beer };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsbeer/delete",
      obj
    )
    .then(res => {
      dispatch(getSellsbeer(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const updateSellsbeer = (
  beername,
  barname,
  price,
  old_bar,
  old_beer
) => dispatch => {
  var obj = { beername, barname, price, old_bar, old_beer };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsbeer/update",
      obj
    )
    .then(res => {
      dispatch(getSellsbeer(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertSellsfood = (
  foodname,
  barname,
  price,
  old_bar,
  old_food
) => dispatch => {
  var obj = { foodname, barname, price, old_bar, old_food };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsfood/insert",
      obj
    )
    .then(res => {
      dispatch(getSellsfood(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const deleteSellsfood = (
  foodname,
  barname,
  price,
  old_bar,
  old_food
) => dispatch => {
  var obj = { foodname, barname, price, old_bar, old_food };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsfood/delete",
      obj
    )
    .then(res => {
      dispatch(getSellsfood(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const updateSellsfood = (
  foodname,
  barname,
  price,
  old_bar,
  old_food
) => dispatch => {
  var obj = { foodname, barname, price, old_bar, old_food };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/sellsfood/update",
      obj
    )
    .then(res => {
      dispatch(getSellsfood(res.data));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertShifts = (
  bar,
  bartender,
  day,
  start,
  end,
  date,
  old_bartender,
  old_bar,
  old_date
) => dispatch => {
  var obj = {
    bar,
    bartender,
    day,
    start,
    end,
    date,
    old_bartender,
    old_bar,
    old_date
  };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/shifts/insert",
      obj
    )
    .then(res => {
      dispatch(getShifts(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const deleteShifts = (
  bar,
  bartender,
  day,
  start,
  end,
  date,
  old_bartender,
  old_bar,
  old_date
) => dispatch => {
  var obj = {
    bar,
    bartender,
    day,
    start,
    end,
    date,
    old_bartender,
    old_bar,
    old_date
  };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/shifts/delete",
      obj
    )
    .then(res => {
      dispatch(getShifts(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//ERRRORORORORORORORORO
export const updateShifts = (
  bar,
  bartender,
  day,
  start,
  end,
  date,
  old_bartender,
  old_bar,
  old_date
) => dispatch => {
  var obj = {
    bar,
    bartender,
    day,
    start,
    end,
    date,
    old_bartender,
    old_bar,
    old_date
  };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/shifts/update",
      obj
    )
    .then(res => {
      dispatch(getShifts(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const insertBills = (
  bar,
  bartender,
  bill_id,
  date,
  day,
  drinker,
  items_price,
  tax_price,
  time,
  tip,
  total_price,
  old_bill_id
) => dispatch => {
  var obj = {
    bar,
    bartender,
    bill_id,
    date,
    day,
    drinker,
    items_price,
    tax_price,
    time,
    tip,
    total_price,
    old_bill_id
  };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bills/insert",
      obj
    )
    .then(res => {
      dispatch(getBills(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const deleteBills = (
  bar,
  bartender,
  bill_id,
  date,
  day,
  drinker,
  items_price,
  tax_price,
  time,
  tip,
  total_price,
  old_bill_id
) => dispatch => {
  var obj = {
    bar,
    bartender,
    bill_id,
    date,
    day,
    drinker,
    items_price,
    tax_price,
    time,
    tip,
    total_price,
    old_bill_id
  };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bills/delete",
      obj
    )
    .then(res => {
      dispatch(getBills(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//ERRRORORORORORORORORO
export const updateBills = (
  bar,
  bartender,
  bill_id,
  date,
  day,
  drinker,
  items_price,
  tax_price,
  time,
  tip,
  total_price,
  old_bill_id
) => dispatch => {
  var obj = {
    bar,
    bartender,
    bill_id,
    date,
    day,
    drinker,
    items_price,
    tax_price,
    time,
    tip,
    total_price,
    old_bill_id
  };
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bills/update",
      obj
    )
    .then(res => {
      dispatch(getBills(res.data, 0));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
