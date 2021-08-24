import Head from "next/head";
import PrayTimes from "../../components/PrayTimes";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";

const NamazVakti = () => {
  const router = useRouter();

  if (router.query.slug) {
    var country = router.query.slug[0];
    var city = router.query.slug[1];
    var timeZone = router.query.slug[2];
  } else {
    return <div>Yükleniyor..</div>;
  }

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
        <PrayTimes country={country} city={city} timeZone={timeZone} />
        <Footer />
      </Layout>
    </div>
  );
};

export default NamazVakti;
