import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getByLocation,
  getCities,
  getCountries,
  getMethods,
  getReverseLocation,
  getSingleTown,
  getTowns,
} from "../redux/actions/actions";
import dynamic from "next/dynamic";
import { GET_REVERSE_LOCATION_RESET } from "../redux/types/prayTypes";

const PrayTimes = (props) => {
  const DraggableMarker = dynamic(() => import("./DraggableMarker"), {
    ssr: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const countryList = useSelector((state) => state.countryListReducer);
  const {
    loading: loadingCountries,
    error: errorCountries,
    countries,
  } = countryList;

  const cityList = useSelector((state) => state.cityListReducer);
  const {
    loading: loadingCities,
    error: errorCities,
    success: succesCities,
    cities: citiesR,
  } = cityList;

  const methodR = useSelector((state) => state.methodListReducer);
  const { loading: loadingMethods, error: errorMethods, methods } = methodR;

  const getByLocationR = useSelector((state) => state.getByLocationReducer);
  const {
    loading: loadingByLocation,
    error: errorByLocation,
    praytime: prayTimeByLocation,
  } = getByLocationR;

  const singleTown = useSelector((state) => state.singleTownReducer);
  const {
    loading: loadingSingleTown,
    error: errorSingleTown,
    prayTimes: townPrayTime,
  } = singleTown;

  const getReverseR = useSelector((state) => state.getReverseLocationReducer);
  const {
    loading: loadingReverseLoc,
    error: errorReverseLoc,
    success: successReverseLoc,
    displayName: displayNameReverse,
  } = getReverseR;

  const townR = useSelector((state) => state.townListReducer);
  const {
    loading: loadingTowns,
    error: errorTowns,
    success: successTownlist,
    towns,
    praytimes: prayTime,
  } = townR;

  const [date, setDate] = useState(
    new Date().toLocaleTimeString().substring(0, 5)
  );
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [method, setMethod] = useState("DIB");
  const [timeZone, setTimeZone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [mapIsVisible, setMapIsVisible] = useState(false);
  const [pos, setPos] = useState("");
  const [prayTimes, setPrayTimes] = useState(null);
  const [cities, setCities] = useState("");

  const { fajr, sunrise, dhuhr, asr, maghrib, isha } =
    prayTimes !== null && prayTimes;

  const timeZ = moment().clone().format("Z");
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();

  // app ilk açıldığında ülke listesi ve method listesini getiriyor.
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getMethods());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleTimeString().substring(0, 5));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // lokasyon bilgisinden adres bilgisi getiren yapı.
  useEffect(() => {
    if (mapIsVisible) {
      dispatch(getReverseLocation(latitude, longitude));
      if (errorReverseLoc) {
        console.log(errorReverseLoc);
      }
    }
  }, [pos]);

  // ilçeler getirildiğinde ilin merkezinin ya da alfabetik olarak ilk sıradaki ilçesinin namaz vakitleri:
  useEffect(() => {
    if (successTownlist) {
      setPrayTimes(prayTime);
    }
    return () => {};
  }, [successTownlist]);

  //ilçe değiştirildiğinde ilçeye göre namaz vakitlerini getirir.
  useEffect(() => {
    if (townPrayTime) {
      setPrayTimes(townPrayTime);
    }
  }, [townPrayTime]);

  useEffect(() => {
    if (prayTime) {
      setPrayTimes(prayTime);
    }
  }, [prayTime]);

  // ülke değiştiğinde yapılan işlemler.
  useEffect(() => {
    if (country) {
      setCity("");
      setTown("");
      setPrayTimes([]);
      setMethod("");
      setMapIsVisible(false);
      router.replace(`/namazvakitleri/${country}/${timeZone}`);
      dispatch(getCities(country));
    }
  }, [country, dispatch]);

  // Şehir değiştiğinde yapılan işlemler.
  useEffect(() => {
    if (city) {
      setTown("");
      router.push(
        `/namazvakitleri/${props.country ? props.country : country}/${
          props.timeZone ? props.timeZone : timeZone
        }/${city}`
      );
    }
  }, [city]);

  // marker posizyonu değiştiğinde yapılan işlemler.
  useEffect(() => {
    if (pos) {
      setLatitude(pos.lat);
      setLongitude(pos.lng);
    }
  }, [pos, dispatch]);

  // lon lat değerleri getirildiğinde yapılan işlemler.
  useEffect(() => {
    if (latitude && longitude) {
      dispatch(
        getByLocation(latitude, longitude, year, month, day, timeZ, method)
      );
    }
  }, [dispatch, longitude, latitude, method]);

  // lokasyon bilgisi apiye gönderildikten sonra namaz vakitlerini getiriyor.
  useEffect(() => {
    if (prayTimeByLocation) {
      setPrayTimes(prayTimeByLocation);
    }
  }, [prayTimeByLocation]);

  useEffect(() => {
    if (succesCities) {
      setCities(citiesR);
    }
  }, [succesCities, cities, citiesR]);

  // ilçe değiştiğinde çalışan işlem.
  useEffect(() => {
    if (town) {
      setMethod("");
      router.replace(
        `/namazvakitleri/${props.country}/${props.timeZone}/${props.city}/${town}`
      );
    }
  }, [town]);

  // daha önce haritadan konum bilgisi seçilmişse namaz vakitlerini getiriyor.
  useEffect(() => {
    if (localStorage.getItem("lat")) {
      dispatch(
        getByLocation(
          localStorage.getItem("lat"),
          localStorage.getItem("lng"),
          year,
          month,
          day,
          timeZ,
          method
        )
      );
      dispatch(
        getReverseLocation(
          localStorage.getItem("lat"),
          localStorage.getItem("lng")
        )
      );
    }
  }, []);

  //method değiştiğinde namaz vakitlerini güncelliyor.
  useEffect(() => {
    if (
      method !== "" &&
      props.country !== "" &&
      props.city !== undefined &&
      props.timeZone !== undefined &&
      town === ""
    ) {
      dispatch(
        getTowns(
          props.country,
          props.city,
          year,
          month,
          day,
          props.timeZone,
          method
        )
      );
    }
  }, [method]);

  useEffect(() => {
    if (method && town !== "") {
      dispatch(
        getSingleTown(
          town,
          props.city,
          props.country,
          day,
          month,
          year,
          props.timeZone,
          method
        )
      );
    }
  }, [town, dispatch, method]);

  // map açıldığında yapılan işlemler.
  useEffect(() => {
    if (mapIsVisible) {
      setCity("");
      setTown("");
      setCountry("");
    }
  }, [mapIsVisible]);

  //location bilgisini state e yazdırıyoruz. onclick eventi çalıştığında.
  const handleGetLocation = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    setMapIsVisible(!mapIsVisible);

    function success(pos) {
      var crd = pos.coords;
      localStorage.setItem("lat", crd.latitude);
      localStorage.setItem("lng", crd.longitude);
      setLatitude(crd.latitude);
      setLongitude(crd.longitude);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col container xl:mt-20">
        <div className="flex flex-col mx-auto lg:w-4/6 w-full md:px-0">
          <p className="text-white font-bold text-6xl mb-4 min-h-[60px]">
            {date}
          </p>
          <div className="flex w-full flex-wrap sm:flex-nowrap mx-auto text-white font-semibold text-opacity-50">
            <div
              onClick={() => handleGetLocation()}
              className="bg-green-800 max-w-[176px] w-1/5 h-20 items-center justify-center text-center border-l-2 rounded-l-xl border-transparent flex flex-col hover:text-green-500 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {latitude ? (
                <p className="sm:text-base text-xs text-blue-50 font-semibold">
                  Konumunuz ayarlandı
                </p>
              ) : (
                <p className="sm:text-base text-xs text-blue-50 font-semibold">
                  Konumdan bul
                </p>
              )}
            </div>
            <div className="bg-[#C4C4C4] w-1/5 h-20 flex items-center justify-center">
              <select
                placeholder="Ülke Seçiniz"
                className="bg-[#1FAB89] w-full truncate  text-white pl-1 h-20 flex border-none outline-none font-bold"
                value={country ? country : props.country}
                onChange={(e) => {
                  setCountry(
                    e.target.value.substr(0, e.target.value.indexOf(","))
                  );
                  setTimeZone(
                    e.target.value.substr(
                      e.target.value.indexOf(",") + 1,
                      e.target.value.length
                    )
                  );
                }}
              >
                <option
                  className="text-white"
                  value={props.country ? props.country : country}
                >
                  {props.countryName
                    ? props.countryName || country
                    : "Ülke Seçiniz"}
                </option>

                {countries &&
                  countries.map((c) => (
                    <option
                      className="text-white"
                      key={c.cc}
                      value={`${c.cc},${c.tz}`}
                    >
                      {c.cn}
                    </option>
                  ))}
              </select>
            </div>
            <div className="bg-[#C4C4C4] w-1/5 h-20 flex items-center justify-center">
              <select
                placeholder="Şehir Seçiniz"
                className="bg-[#1FAB89] w-full truncate  text-white pl-1 h-20 flex border-none outline-none font-bold"
                value={props.city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option className="text-white" value={props.city}>
                  {props.city ? props.city : "Şehir Seçiniz"}
                </option>
                {cities &&
                  cities.map((c, i) => (
                    <option className="text-white" key={i} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
            <div className="bg-[#C4C4C4] w-1/5 h-20 flex items-center justify-center ">
              <select
                placeholder="Şehir Seçiniz"
                className="bg-[#1FAB89] w-full truncate  text-white pl-1 h-20 flex border-none outline-none font-bold"
                value={town}
                onChange={(e) => {
                  setTown(e.target.value);
                }}
              >
                <option className="text-white" value={town}>
                  {town ? town : "İlçe Seçiniz"}
                </option>
                {towns &&
                  towns.map((c) => (
                    <option className="text-white" key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
            <div className="bg-[#C4C4C4] w-1/5 h-20 flex items-center justify-center border-r-2 rounded-r-xl">
              <select
                placeholder="Şehir Seçiniz"
                className="bg-[#1FAB89] w-full truncate text-white pl-1 h-20 flex border-none outline-none font-bold border-r-2 rounded-r-xl"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
              >
                <option className="text-white" value={method}>
                  {method ? method : "Method Seçiniz"}
                </option>
                {methods &&
                  methods.map((c) => (
                    <option className="text-white" key={c.name} value={c.name}>
                      {c.description}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div
            className={
              mapIsVisible
                ? "min-h-[300px] flex w-11/12 lg:w-3/4 justify-center m-auto mt-2"
                : ""
            }
          >
            {mapIsVisible && (
              <DraggableMarker
                newSet={(markerPosition) => setPos(markerPosition)}
                latitude={latitude ? latitude : 38.754082999999994}
                longitude={longitude ? longitude : 35.288086}
              />
            )}
          </div>
          {successReverseLoc && !city ? (
            <div className="text-white font-bold text-lg m-auto bg-green-400 mt-4 px-4 py-2 border-2 rounded-xl">
              <p>{displayNameReverse} adresi için namaz vakitleri getirildi.</p>
            </div>
          ) : (
            town && (
              <div className="text-white font-bold text-lg m-auto bg-green-400 mt-4 px-4 py-2 border-2 rounded-xl">
                <p>
                  {props.city} ili, {town} ilçesi, {props.countryName} adresi
                  için namaz vakitleri getirildi.
                </p>
              </div>
            )
          )}

          <p className="text-white font-semibold text-xl  sm:bg-transparent p-4">
            İster haritadan bir konum seç, ister kayıtlı konumlardan bir
            tanesini.
            <b className="ml-1">Doğru namaz saatlerinin</b> adresi
            namaznezaman.com
          </p>
        </div>
        <div className="sm:pb-56">
          {loadingTowns || loadingSingleTown || loadingByLocation ? (
            <div className="flex flex-wrap w-5/6 gap-6 md:w-full px-2 md:px-0 mx-auto md:mt-6 mt-0 md:justify-center justify-between text-white font-bold pb-6 h-96">
              Loading...
            </div>
          ) : (
            <div className="flex flex-wrap w-5/6 gap-6 md:w-full px-2 md:px-0 mx-auto md:mt-6 mt-0 md:justify-center justify-between text-white font-bold pb-6">
              <div className="flex flex-col justify-between items-center max-w-[176px] w-2/6 h-32 md:h-40 bg-[#B3A394] bg-opacity-50 border-2 hover:border-2 hover:border-[#1FAB89]">
                <p>İmsak</p>
                <p>
                  <i className="imsak"></i>
                </p>
                <p>{fajr}</p>
              </div>

              <div className="flex flex-col justify-between items-center max-w-[176px] w-2/6 h-32 md:h-40 bg-[#B3A394] bg-opacity-50 border-2 hover:border-2 hover:border-[#1FAB89] hover:border-solid">
                <p className="">Güneş</p>
                <i className="sunrise"></i>

                <p>{sunrise}</p>
              </div>

              <div className="flex flex-col justify-between items-center max-w-[176px] w-2/6 h-32 md:h-40 bg-[#B3A394] bg-opacity-50 border-2 hover:border-2 hover:border-[#1FAB89] hover:border-solid">
                <p>Öğle</p>
                <p>
                  <i className="dhur"></i>
                </p>

                <p>{dhuhr}</p>
              </div>

              <div className="flex flex-col justify-between items-center max-w-[176px] w-2/6 h-32 md:h-40 bg-[#B3A394] bg-opacity-50 border-2 hover:border-2 hover:border-[#1FAB89] hover:border-solid">
                <p>İkindi</p>
                <i className="asr"></i>
                <p>{asr}</p>
              </div>

              <div className="flex flex-col justify-between items-center max-w-[176px] w-2/6 h-32 md:h-40 bg-[#B3A394] bg-opacity-50 border-2 hover:border-2 hover:border-[#1FAB89] hover:border-solid">
                <p>Akşam</p>
                <i className="maghrib"></i>
                <p>{maghrib}</p>
              </div>

              <div className="flex flex-col justify-between items-center max-w-[176px] w-2/6 h-32 md:h-40 bg-[#B3A394] bg-opacity-50 border-2 hover:border-2 hover:border-[#1FAB89] hover:border-solid">
                <p>Yatsı</p>
                <i className="isha"></i>
                <p>{isha}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayTimes;
