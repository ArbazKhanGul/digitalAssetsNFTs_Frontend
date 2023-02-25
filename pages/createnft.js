import Select from 'react-select';
import options from "../utils/languages.json"
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Editor, useEffect, useState, Navbar, Footer, useRouter, axios, IndividualNFT, ToastContainer } from "../components"
import { NFTCreationSchema } from "../schema/index"
import { nftTokenCreate } from "../utils/nftCreate"
import getServerSideProps from "../utils/serversidelogin"
import useValidate from '../utils/useValidate';
import ClipLoader from "react-spinners/ClipLoader";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const style = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: "none"
  }),
}

const Item = ({ userinfo }) => {

  const [duplicateNft, changeDuplicate] = useState("");
  const [loader, setLoader] = useState(false);
  const [timeNotPass, setTimeNotPass] = useState(false);
  const [path, setPath] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();

  const [loading, user] = useValidate(userinfo);

  let initialValues = {
    nftName: "",
    nftLanguage: "",
    nftText: "",
    nftTextHTML: "",
    nftDescription: "",
  };


  const handleSelect = (e) => {

    setFieldValue("nftLanguage", e.value)
  }

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({

    initialValues,
    validationSchema: NFTCreationSchema,

    onSubmit: async (values, action) => {


      console.log("🚀 ~ file: createnft.js ~ line 39 ~ onSubmit: ~ values", values)


      try {
        setLoader("Verifying Text...");
        setTimeNotPass(false);
        let reqObject = {
          nftName: values.nftName,
          nftLanguage: values.nftLanguage,
          nftText: values.nftTextHTML,
          nftDescription: values.nftDescription
        }


        const response = await axios.post("/nftcreation", reqObject);
        console.log("🚀 ~ file: createnft.js ~ line 59 ~ onSubmit: ~ response", response)


        if (response?.data?.status == "success") {
          setTimeNotPass(false);
          setLoader("Waiting for transaction confirmation and mined transaction...");

          changeDuplicate("")

          await nftTokenCreate(response?.data?.price, response?.data?.ipfspath, setLoader,setPath);

        }
        else if(response?.data?.status == "timeNotPass"){
          setLoader(false);
           setTimeNotPass(Math.ceil(response?.data?.time / 60000));
           setType(response?.data?.type)
        }
        else if (response?.data?.status == "duplicate") {
          setLoader(false);
          setTimeNotPass(false);
          setType(response?.data?.type)
          toast.error(`Nft with this ${response?.data?.type} already exist `, {
            position: "top-center",
          });
          changeDuplicate(response?.data?.result)
        }

      } catch (error) {
        setTimeNotPass(false);
        console.log("🚀 ~ file: createnft.js ~ line 95 ~ onSubmit: ~ error", error)
        changeDuplicate("")
        setLoader(false)
        if (error?.response?.data == undefined) {
          toast.error("Server Error Please Try Later", {
            position: "top-center",
          });
        } else {
          toast.error(error?.response?.data.message, {
            position: "top-center",
          });
        }
      }
    }
  })




  return (
    <>

      {!loading ? (
        <div className="text-[1.6rem] font-['Inconsolata']">
          <ToastContainer pauseOnHover autoClose={5000} />
        </div>
      ) : (
        <>
          <Navbar></Navbar>
          <form onSubmit={handleSubmit} className='w-[100%]'>
            <div className="flex flex-col justify-center items-center space-y-[1.3rem] mb-[2rem]">

              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 mt-[2rem]">
                <div className="color text-[3.5rem] w-fit font-medium font-['Inconsolata']">
                  Create New NFT

                </div>
              </div>


              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2.2rem] tracking-wider">Enter the NFT name:</h2>
                <div className="mt-[1rem] w-[100%] relative ">
                  <div className="input_bord_grad mb-[0.2rem] !w-[100%]">
                    <input type="text"
                      className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                      placeholder="NFT Name.."
                      name="nftName"
                      value={values.nftName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                    />
                  </div>
                  {errors.nftName && touched.nftName ? (
                    <p className="text-red-500 text-[1.4rem] errors block">
                      {errors.nftName}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2.2rem] tracking-wider">Choose language for text of NFT:</h2>
                <div className="mt-[1rem] w-[100%] relative ">
                  <div className="input_bord_grad  mb-[0.2rem] !w-[100%]">

                    <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"
                      defaultValue={"Select Language"}
                      name="nftLanguage"
                      onChange={handleSelect}
                      options={options}
                      styles={style}
                      id="long-value-select"
                      instanceId="long-value-select"
                    />

                  </div>
                  {errors.nftLanguage && touched.nftLanguage ? (
                    <p className="text-red-500 text-[1.4rem] block">
                      {errors.nftLanguage}
                    </p>
                  ) : null}

                </div>
              </div>




              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 ">
                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2.4rem] tracking-wider">Enter Text for NFT:</h2>
                <h2 className="font-['Inconsolata'] text-[red] text-[1.8rem] tracking-wider">Instructions:</h2>
                <h2 className=" text-[1.3rem] font-['Inconsolata'] text-[#0D1344E5'] flex mt-[0.3rem]">
                  <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">1.</span>
                  <p>Only 500 letter is allowed free for nft text and then 0.1 dollar charge is apply for every next 1000 letters and first 15 characters of nft text is used as title of nft
                  </p>
                </h2>

                <h2 className=" text-[1.3rem] font-['Inconsolata'] text-[#0D1344E5'] flex mt-[0.3rem]">
                  <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">2.</span>
                  <p>Make sure that text belong to you and you don't copy some other person text
                  </p>
                </h2>
                <div className="mb-[2rem] mt-[1rem]">

                  <Editor setFieldValue={setFieldValue}></Editor>

                </div>

              </div>
              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 ">
                {errors.nftText && touched.nftText ? (
                  <p className="text-red-500 text-[1.4rem] block">
                    {errors.nftText}
                  </p>
                ) : null}
              </div>
              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 ">
                <h2 className="font-['Inconsolata'] text-[2.2rem] ">
                  Description
                </h2>
                <div className="w-[100%] input_bord_grad flex justify-center  space-y-[0.5rem] mt-[0.8rem]">
                  <textarea
                    name="nftDescription"
                    value={values?.nftDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    placeholder="Description..."
                    className="rounded-2xl resize-none outline-none h-[13rem]  w-[100%]  block placeholder:text-[#746e6e] p-[0.8rem] text-black text-[1.7rem] sm:text-[1.8rem] bg-transparent font-['Inconsolata']"
                  ></textarea>

                </div>

                {errors.nftDescription && touched.nftDescription ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                    {errors.nftDescription}
                  </p>
                ) : null}
              </div>

              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">

                <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider"
                  type="submit" disabled={loader}>

                  Create

                </button>
              </div>

              {loader ?
                (<>
                  <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">

                    <h2 className="font-['Inconsolata'] text-[1.8rem] ">
                      {loader}
                    </h2>
                  </div>

          {loader!="Token transaction verification..."?
                  <div className="flex justify-center  -mt-[4px]">

                    <ClipLoader
                      color={"#30DCBA"}
                      loading={loader}
                      cssOverride={{ marginBottom: "20px" }}
                      size={110}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>:""}
                </>) : ""}



{loader=="Token transaction verification..."?(<div>
<CountdownCircleTimer
    isPlaying={loader=="Token transaction verification..."}
    duration={8}
    size={95}
    strokeWidth={5}
    colors={['#7f8c8d', '#95a5a6']}
    colorsTime={[5, 2]}
    onComplete={() => {
      router.push(`/individualnft/${path}`);
    }}
  >
    {({ remainingTime }) => <h2 className="font-['Inconsolata'] text-[2rem] ">{remainingTime}</h2>}
  </CountdownCircleTimer></div>):""
}
            </div>
            <div >
                 { timeNotPass?(
                      <div className="flex justify-center">
                      <h2 className="mb-[2rem] text-justify w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 font-['Inconsolata'] text-[1.4rem] text-[red]">
                        NFT with the same {type} is also present but that NFT is waiting for transaction confirmation if that transaction
                        is not mined in {timeNotPass} minutes or some error come in transaction confirmation then you can use this {type} for another NFT after {timeNotPass} minutes so please wait untill the specified time is pass
                      </h2>
                    </div>  ):""
                 }
                {
                duplicateNft ?

                  (
                    <>
                      <div className="flex justify-center">
                        <h2 className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 font-['Inconsolata'] text-[2.2rem] text-[red]">Your Nft {type} match with below nft {type}:</h2>
                      </div>
                      <div class="flex justify-center mb-[2rem]">
                        <IndividualNFT index={1} nftname={duplicateNft.nftName} owner={duplicateNft.owner_email} creator={duplicateNft.creator_email} price={duplicateNft.price} creationdate={duplicateNft.createdAt} nfttext={duplicateNft.title} priceDollar={0} id={duplicateNft?.tokenURI}></IndividualNFT>
                      </div>
                    </>
                  ) : ""
              }
            </div>
          </form>

          <Footer /> </>)}
    </>
  )
}

export default Item;

export { getServerSideProps };