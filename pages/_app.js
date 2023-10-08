import '../styles/globals.css'
import {useEffect} from "react";
import Router from "next/router";
import "nprogress/nprogress.css";
import { store } from '../store'
import { Provider } from 'react-redux'
import NProgress from "nprogress"
import "../styles/nprogress.css"; 
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer } from "react-toastify";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.STRIPE_PUBLISABLE_KEY);


function MyApp({ Component, pageProps }) {


  useEffect(() => {
    NProgress.configure({showSpinner:false});
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();


    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <Provider store={store}>
      <> 
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
         <div className="text-[1.6rem] font-['Inconsolata']">
          <ToastContainer pauseOnHover autoClose={5000} />
        </div>
        </>
 
    </Provider>
  )
}

export default MyApp
