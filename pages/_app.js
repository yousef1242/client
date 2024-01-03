import { useState, useEffect } from "react";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import SmallHeader from "@/components/smallHeader/SmallHeader";
import MainHeader from "@/components/mainHeader/MainHeader";
import Loading from "@/components/loading/Loding";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  // set loading animation
  useEffect(() => {
    // Simulate a loading time of 3 minutes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        // Display loading screen here
        <>
        <Head>
          <title>MOTOR ONE</title>
        </Head>
        <div className="loading-screen">
          <Loading/>
        </div>
        </>
      ) : (
        // Display the main content when loading is complete
        <div className="main">
          <Provider store={store}>
            <SmallHeader />
            <MainHeader />
            <Component {...pageProps} />
            <Toaster position="top-center" />
          </Provider>
        </div>
      )}
    </>
  );
}
