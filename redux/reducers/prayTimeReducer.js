import { combineReducers } from "redux";
import * as types from "../types/prayTypes";

export const countryListReducer = (
  state = { loading: true, countries: [] },
  action
) => {
  switch (action.type) {
    case types.COUNTRY_LIST_REQUEST:
      return { loading: true, countries: [] };
    case types.COUNTRY_LIST_SUCCESS:
      return {
        loading: false,
        countries: action.payload,
      };
    case types.COUNTRY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const cityListReducer = (
  state = { loading: true, cities: [] },
  action
) => {
  switch (action.type) {
    case types.CITY_LIST_REQUEST:
      return { loading: true, cities: [] };
    case types.CITY_LIST_SUCCESS:
      return {
        loading: false,
        cities: action.payload,
      };
    case types.CITY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const townListReducer = (
  state = { loading: true, success: false, towns: [], praytimes: [] },
  action
) => {
  switch (action.type) {
    case types.TOWN_LIST_REQUEST:
      return { loading: true, success: false, towns: [], praytimes: [] };
    case types.TOWN_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        towns: action.payload.response,
        praytimes: action.payload.praytime,
      };
    case types.TOWN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getByLocationReducer = (
  state = { loading: true, success: false, praytime: [] },
  action
) => {
  switch (action.type) {
    case types.GET_BY_LOCATION_REQUEST:
      return { loading: true, success: false, praytime: [] };
    case types.GET_BY_LOCATION_SUCCESS:
      return {
        loading: false,
        success: true,
        praytime: action.payload.praytime,
      };
    case types.GET_BY_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleTownReducer = (
  state = { loading: true, prayTimes: [] },
  action
) => {
  switch (action.type) {
    case types.SINGLE_TOWN_REQUEST:
      return { loading: true, prayTimes: [] };
    case types.SINGLE_TOWN_SUCCESS:
      return {
        loading: false,
        prayTimes: action.payload.praytime,
      };
    case types.SINGLE_TOWN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const methodListReducer = (
  state = { loading: true, methods: [] },
  action
) => {
  switch (action.type) {
    case types.METHODS_LIST_REQUEST:
      return { loading: true, methods: [] };
    case types.METHODS_LIST_SUCCESS:
      return {
        loading: false,
        methods: action.payload,
      };
    case types.METHODS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const reducers = {
  countryListReducer: countryListReducer,
  cityListReducer: cityListReducer,
  townListReducer: townListReducer,
  methodListReducer: methodListReducer,
  singleTownReducer: singleTownReducer,
  getByLocationReducer: getByLocationReducer,
};

export default combineReducers(reducers);
