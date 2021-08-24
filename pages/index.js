import Head from "next/head";
import PrayTimes from "../components/PrayTimes";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
        <title>NamazNeZaman.com</title>
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
        <PrayTimes />
        <Footer />
      </Layout>
    </div>
  );
};

export default Home;
