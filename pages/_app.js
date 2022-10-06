import '../styles/globals.css'
import {useEffect} from "react";
import Router from "next/router";
import "nprogress/nprogress.css";
import { store } from '../store'
import { Provider } from 'react-redux'
import NProgress from "nprogress"
import "../styles/nprogress.css"; 

function MyApp({ Component, pageProps }) {


  useEffect(() => {
    NProgress.configure({showSpinner:false});
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();


    Router.events.on("routeChangeStart", handleRouteStart);
    // Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      // Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <Provider store={store}>
  <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
