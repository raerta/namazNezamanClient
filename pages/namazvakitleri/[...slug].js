import Head from "next/head";
import PrayTimes from "../../components/PrayTimes";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTown, getTowns } from "../../redux/actions/actions";

const NamazVakti = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cityList = useSelector((state) => state.cityListReducer);
  const {
    loading: loadingCities,
    error: errorCities,
    success: succesCities,
    cities: cities,
  } = cityList;

  const countryList = useSelector((state) => state.countryListReducer);
  const {
    loading: loadingCountries,
    error: errorCountries,
    countries,
  } = countryList;

  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [city, setCity] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [method, setMethod] = useState("DIB");
  const [town, setTown] = useState("");

  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();

  useEffect(() => {
    if (router.query.slug) {
      setCountry(router.query.slug[0]);
      setTimeZone(router.query.slug[1]);
      setCity(router.query.slug[2]);
      setTown(router.query.slug[3] && router.query.slug[3]);
    } else {
      return <div>Yükleniyor..</div>;
    }
  }, [router.query.slug]);

  useEffect(() => {
    if (city) {
      dispatch(getTowns(country, city, year, month, day, timeZone, method));
      setTown("");
      router.replace(`/namazvakitleri/${country}/${timeZone}/${city}`);
    }
  }, [city]);

  useEffect(() => {
    if (city && cities) {
      const data = cities.filter((c) => c === city);
      setCity(data[0]);
    }
  }, [cities]);

  useEffect(() => {
    if (countries && country) {
      const data = countries.filter((c) => c.cc === country);
      setCountryName(data[0]?.cn && data[0].cn);
    }
  }, [countries, country]);

  useEffect(() => {
    if (town) {
      dispatch(
        getSingleTown(town, city, country, day, month, year, timeZone, method)
      );
    }
  }, [town, dispatch, method]);

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
        <title>NamazNezaman.com</title>
        <meta
          name="keywords"
          content="namaz vakitleri, namaz vakti, Pray Times, öğlen namazı kaçta, sabah namazı kaçta, akşam namazı kaçta, sabah namazı kaçta, ikindi namazı vakti"
        />
        <meta
          key="description"
          name="description"
          content="Namaz Vakitleri, Pray Times"
        />
      </Head>

      <Layout>
        <Navbar />
        <PrayTimes
          country={country}
          city={city}
          timeZone={timeZone}
          countryName={countryName}
        />
        <Footer />
      </Layout>
    </div>
  );
};

export default NamazVakti;
