import axios from "axios";
import * as types from "../types/prayTypes";

export const getCountries = () => async (dispatch) => {
  dispatch({ type: types.COUNTRY_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getCountries`
    );
    dispatch({ type: types.COUNTRY_LIST_SUCCESS, payload: data.response });
  } catch (error) {
    dispatch({ type: types.COUNTRY_LIST_FAIL, payload: error.message });
  }
};

export const getCities = (country) => async (dispatch) => {
  dispatch({ type: types.CITY_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getCities?cc=${country}`
    );
    dispatch({ type: types.CITY_LIST_SUCCESS, payload: data.response });
  } catch (error) {
    dispatch({ type: types.CITY_LIST_FAIL, payload: error.message });
  }
};

export const getTowns =
  (country, city, year, month, day, timeZone, method) => async (dispatch) => {
    dispatch({ type: types.TOWN_LIST_REQUEST });
    if (method === "") {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getTowns?cc=${country}&cityname=${city}&year=${year}&month=${month}&day=${day}&timezone=${timeZone}&method=DIB`
        );
        dispatch({ type: types.TOWN_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: types.TOWN_LIST_FAIL, payload: error.message });
      }
    } else {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getTowns?cc=${country}&cityname=${city}&year=${year}&month=${month}&day=${day}&timezone=${timeZone}&method=${method}`
        );
        dispatch({ type: types.TOWN_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: types.TOWN_LIST_FAIL, payload: error.message });
      }
    }
  };

export const getByLocation =
  (latitude, longitude, year, month, day, timeZ, method) =>
  async (dispatch) => {
    dispatch({ type: types.GET_BY_LOCATION_REQUEST });
    if (method === "") {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getByLocation?lat=${latitude}&lon=${longitude}&year=${year}&month=${month}&day=${day}&timezone=${timeZ}&method=DIB&flag=0`
        );

        dispatch({ type: types.GET_BY_LOCATION_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: types.GET_BY_LOCATION_FAIL, payload: error.message });
      }
    } else {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getByLocation?lat=${latitude}&lon=${longitude}&year=${year}&month=${month}&day=${day}&timezone=${timeZ}&method=${method}&flag=0`
        );

        dispatch({ type: types.GET_BY_LOCATION_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: types.GET_BY_LOCATION_FAIL, payload: error.message });
      }
    }
  };

export const getSingleTown = (sT) => async (dispatch) => {
  dispatch({ type: types.SINGLE_TOWN_REQUEST });
  if (sT.method === "") {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getPrayTimes?townname=${sT.town}&cityname=${sT.city}&cc=${sT.country}&day=${sT.day}&month=${sT.month}&year=${sT.year}&timezone=${sT.timeZone}&method=DIB&flag=0`
      );
      dispatch({ type: types.SINGLE_TOWN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: types.SINGLE_TOWN_FAIL, payload: error.message });
    }
  } else {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getPrayTimes?townname=${sT.town}&cityname=${sT.city}&cc=${sT.country}&day=${sT.day}&month=${sT.month}&year=${sT.year}&timezone=${sT.timeZone}&method=${sT.method}&flag=0`
      );
      dispatch({ type: types.SINGLE_TOWN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: types.SINGLE_TOWN_FAIL, payload: error.message });
    }
  }
};

export const getMethods = () => async (dispatch) => {
  dispatch({ type: types.METHODS_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getMethods`
    );
    dispatch({ type: types.METHODS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.METHODS_LIST_FAIL, payload: error.message });
  }
};

export const getReverseLocation = (latitude, longitude) => async (dispatch) => {
  dispatch({ type: types.GET_REVERSE_LOCATION_REQUEST });
  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${Number(
        localStorage.getItem("lat")
      )}&lon=${Number(localStorage.getItem("lng"))}&format=json`
    );
    dispatch({ type: types.GET_REVERSE_LOCATION_SUCCESS, payload: data.display_name });
  } catch (error) {
    dispatch({
      type: types.GET_REVERSE_LOCATION_FAIL,
      payload: error.message,
    });
  }
};
