import { combineReducers } from "redux";
import * as types from "../types/prayTypes";

export const countryListReducer = (
  state = { loading: false, countries: [] },
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
  state = { loading: false, success: false, cities: [] },
  action
) => {
  switch (action.type) {
    case types.CITY_LIST_REQUEST:
      return { loading: true, success: false, cities: [] };
    case types.CITY_LIST_SUCCESS:
      return {
        success: true,
        loading: false,
        cities: action.payload,
      };
    case types.CITY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case types.CITY_LIST_RESET:
      return { loading: false, success: false};
    default:
      return state;
  }
};

export const townListReducer = (
  state = { loading: false, success: false, towns: [], praytimes: [] },
  action
) => {
  switch (action.type) {
    case types.TOWN_LIST_REQUEST:
      return { loading: true, success: false, towns: [], praytimes: [] };
    case types.TOWN_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        towns: action.payload.towns,
        praytimes: action.payload.praytime,
      };
    case types.TOWN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case types.TOWN_LIST_RESET:
      return { loading: false, towns: [], praytimes: [] };
    default:
      return state;
  }
};

export const getByLocationReducer = (
  state = { loading: false, success: false, praytime: [] },
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
  state = { loading: false, prayTimes: [] },
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
  state = { loading: false, methods: [] },
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

export const getReverseLocationReducer = (
  state = { loading: false, success: false, displayName: [] },
  action
) => {
  switch (action.type) {
    case types.GET_REVERSE_LOCATION_REQUEST:
      return { loading: true, success: false, displayName: [] };
    case types.GET_REVERSE_LOCATION_SUCCESS:
      return {
        loading: false,
        success: true,
        displayName: action.payload,
      };
    case types.GET_REVERSE_LOCATION_FAIL:
      return { loading: false, error: action.payload };
    case types.GET_REVERSE_LOCATION_RESET:
      return { loading: false, displayName: null };
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
  getReverseLocationReducer: getReverseLocationReducer,
};

export default combineReducers(reducers);
