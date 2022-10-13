import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import {
    useEffect, Navbar,  Footer, useState,
    useRouter, validateUser, getServerSideProps, toast, ToastContainer, useSelector,
    useDispatch, selectAddress, addAddress,NFTPortion,Work,TopCollections,Main,selectUser,addUser
} from "../components"





export default function Home({userinfo}) {

  console.log("🚀 ~ file: index.js ~ line 20 ~ Home ~ user", userinfo)
  

  const address = useSelector(selectAddress);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();


  useEffect(() => {
  dispatch(addUser(userinfo))
  },[])


  useEffect(() => {
    validateUser(user,address,dispatch,router,setLoading,"main")

    // load(address,dispatch,router,setLoading,"main");

  }, [address,user]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loading ? (
              <div className="text-[1.6rem] font-['Inconsolata']">
              <ToastContainer pauseOnHover autoClose={5000} />
            </div>
      ) : (
        <>
          <Navbar></Navbar>
          <Main></Main>
          <TopCollections></TopCollections>
          <Work></Work>
          <NFTPortion></NFTPortion>
          <Footer></Footer>
        </>
      )}
    </div>
  );
}

export {getServerSideProps}