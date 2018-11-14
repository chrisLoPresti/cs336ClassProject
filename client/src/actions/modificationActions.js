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

export const getShifts = () => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/shifts"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_SHIFTS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getDay = () => dispatch => {
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
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getFrequents = () => dispatch => {
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
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getLikes = () => dispatch => {
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
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getOperates = () => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/operates"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_OPERATES,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getSellsbeer = () => dispatch => {
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
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getSellsfood = () => dispatch => {
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
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getBills = () => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/bills"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_BILLS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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

export const getTransactions = () => dispatch => {
  dispatch(setModificationLoading());
  axios
    .get(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/modification/transactions"
    )
    .then(res => {
      dispatch({
        type: SET_MOD_TRANSACTIONS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
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
