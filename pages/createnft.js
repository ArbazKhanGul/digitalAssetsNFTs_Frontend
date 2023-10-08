import Select from 'react-select';

import options from "../utils/languages.json"
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Editor, useEffect, useState, Navbar, Footer, useRouter, axios, IndividualNFT } from "../components"
import { NFTCreationSchema } from "../schema/index"
import getServerSideProps from "../utils/serversidelogin"
import useValidate from '../utils/useValidate';
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmModal from "../components/nft/createnftmodal.js";
import Image from "next/image";
import crypto from 'crypto';


const style = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: "none"
  }),
}

const generateFileHash = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileContent = event.target.result;

      // Assuming crypto is available in your environment
      const hash = crypto.createHash("sha256");
      hash.update(fileContent);
      const fileHash = hash.digest("hex");

      resolve(fileHash);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};





const Item = ({ userinfo}) => {


  const [duplicateNft, changeDuplicate] = useState("");
  console.log("🚀 ~ file: createnft.js:52 ~ Item ~ duplicateNft:", duplicateNft)
  const [loader, setLoader] = useState(false);
  const [timeNotPass, setTimeNotPass] = useState(false);
  const [type, setType] = useState("");
  const [creationFee, setCreationFee] = useState(0);
  const [contentFee, setContentFee] = useState(0);
  const [hash, setHash] = useState("");



  const [loading, user] = useValidate(userinfo);

  let initialValues = {
    nftName: "",
    nftContentType: "text",
    nftLanguage: "",
    nftVideo: null,
    nftAudio: null,
    nftImage: null,
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


      try {
        setLoader("Verifying NFT Data...");
        setTimeNotPass(false);
        setType("");
        changeDuplicate("");

        let size=0;
        let contentType=values.nftContentType;
        let hashCal;
        console.log("🚀 ~ file: createnft.js:103 ~ onSubmit: ~ hashCal:", hashCal)


        if(contentType=='text'){
          size = values.nftText.length;
          hashCal = createHash("sha256").update(values.nftText).digest("hex");
        }
        else if(contentType=="video"){
          size = (values.nftVideo?.size / 1024 ** 2).toFixed(2);
          hashCal = await generateFileHash(values.nftVideo);
        }
        else if(contentType=="audio"){
          size = (values.nftImage?.size / 1024 ** 2).toFixed(2);
          hashCal = await generateFileHash(values.nftAudio);
        }
        else if(contentType=="image"){
          hashCal = await generateFileHash(values.nftImage);
        }

        console.log("🚀 ~ file: createnft.js:117 ~ onSubmit: ~ hashCal:", hashCal)

        const response = await axios.post("/nftverify", { nftName: values.nftName,size,contentType,hash:hashCal});
      
        console.log("🚀 ~ file: createnft.js:125 ~ onSubmit: ~ response:", response)



        if (response?.data?.status == "success") {
          setTimeNotPass(false);
          changeDuplicate("")
          setHash(hashCal)
          setContentFee(response.data.contentFee);
          setCreationFee(response.data.creationFee);
          setLoader("confirm");

        }
        else if (response?.data?.status == "timeNotPass") {
          setLoader(false);
          setTimeNotPass(Math.ceil(response?.data?.time / 60000));
          setType(response?.data?.type)
        }
        else if (response?.data?.status == "duplicate" && response?.data?.type=="name") {
          setLoader(false);
          setTimeNotPass(false);
          setType(response?.data?.type)
          toast.error(`Nft with this ${response?.data?.type} already exist `, {
            position: "top-center",
          });
          changeDuplicate(response?.data?.result)
        }
        else if (response?.data?.status == "duplicate" && response?.data?.type=="content") {
          setLoader(false);
          setTimeNotPass(false);
          setType(response?.data?.type)
          toast.error(`Nft with this content already exist please change content`, {
            position: "top-center",
          });
          changeDuplicate(response?.data?.result)
        }

      }
      catch (error) {
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

      {loading && (
        <>
          <Navbar></Navbar>
          <form onSubmit={handleSubmit} className='w-[100%]'>
            <div className="flex flex-col justify-center items-center space-y-[1.3rem] mb-[2rem]">

              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 mt-[2.5rem]">
                
              <div className="text-[3rem]  flex  justify-center font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[3.4rem] mb-[1rem] ">
      <div className=" w-fit bord-bottom  flex justify-center "> 

      <div className="text-[#121212] w-fit ">Create New NFT</div>
      <div className=" inline-block w-[3.5rem] h-[4rem] sm:w-[3.2rem] md:w-[4rem] mt-[0.6rem] ml-[0.5rem] sm:h-[3.2rem] md:h-[4rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`/topnft.png`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
      
         </div>
              </div>


              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                <h2 className="font-['Inconsolata'] text-[#000000e5] font-medium text-[2.2rem] tracking-wider">Enter the NFT name:</h2>
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
                    <p className="text-red-500 font-medium text-[1.6rem] errors block">
                      {errors.nftName}
                    </p>
                  ) : null}
                </div>
              </div>




              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                <h2 className="font-['Inconsolata'] text-[#000000e5] font-medium text-[2.2rem] tracking-wider">Choose the Type Of Content</h2>
                <div className="mt-[1rem] w-[100%] relative ">
                  <div className="input_bord_grad  mb-[0.2rem] !w-[100%]">

                    <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"
                      defaultValue={{ "label": "text", "value": "text" }}
                      name="nftContentType"
                      onChange={(e) => {
                        if (e.value !== "text") {
                          setFieldValue("nftTextHTML", "");
                          setFieldValue("nftText", "");
                        }
                        setFieldValue("nftContentType", e.value)
                      }}
                      options={[
                        { "label": "text", "value": "text" },
                        { "label": "audio", "value": "audio" },
                        { "label": "video", "value": "video" },
                        { "label": "image", "value": "image" },
                      ]}
                      styles={style}
                      id="long-value-select"
                      instanceId="long-value-select"
                    />

                  </div>
                  {errors.nftContentType && touched.nftContentType ? (
                    <p className="text-red-500 font-medium text-[1.6rem] block">
                      {errors.nftContentType}
                    </p>
                  ) : null}

                </div>
              </div>







              {values?.nftContentType == "image" ?
                <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                  <div className="reginpfile w-[100%] ">
                    <span className="text-start block w-[84%] font-['Inconsolata'] text-[#000000e5] font-medium text-[2.2rem] tracking-wider">
                      Choose Image For NFT
                    </span>
                  </div>
                  <h2 className="font-['Inconsolata'] text-[#f14343] font-medium text-[1.8rem] tracking-wider mb-[0.5rem]">Instructions:</h2>
                    <h2 className=" text-[1.3rem] font-medium font-['Inconsolata'] text-[#0D1344E5'] flex mb-[0.7rem]">
                      <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">1.</span>
                      <p>Only image up to 15mb is allowd for nft creation
                      </p>
                    </h2>
                  <div className="input_bord_grad w-[100%] ">
                    <input
                      className="form-control block w-full text-[1.6rem] md:text-[1.7rem] placeholder:text-[#746e6e] font-[Inconsolata] text-gray-700 bg-white bg-clip-padding rounded-[1.2rem] p-[0rem]   border-none  transition ease-in-out file:border-none  file:p-[0.9rem]  cursor-pointer m-0 outline-none"
                      type="file"
                      id="nftImage"
                      name="nftImage"
                      // ref={fileRef}
                      accept="image/*"
                      onChange={(e) => {
                        setFieldValue(
                          "nftImage",
                          e.target?.files[0] ? e.target?.files[0] : null
                        );
                      }}
                    />
                  </div>
                  {errors.nftImage && touched.nftImage ? (
                    <p className="text-red-500 font-medium text-[1.6rem] errors block">
                      {errors.nftImage}
                    </p>
                  ) : null}
                </div> : null}


              {values?.nftContentType == "video" ?
                <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                  <div className="reginpfile w-[100%] mb-[0rem] ">
                    <span className="text-start block w-[84%] font-['Inconsolata'] text-[#000000e5] font-medium text-[2.2rem] tracking-wider">
                      Choose Video For NFT
                    </span>
                  </div>
                  <h2 className="font-['Inconsolata'] text-[#f14343] font-medium text-[1.8rem] tracking-wider ">Instructions:</h2>
                    <h2 className=" text-[1.3rem] font-medium font-['Inconsolata'] text-[#0D1344E5'] flex mb-[1rem]">
                      <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">1.</span>
                      <p>Only video up to 50mb is free and then 1 dollar charge is apply for every next 50mb
                      </p>
                    </h2>
                  <div className="input_bord_grad w-[100%] mt-[0.5rem]">
                    <input

                      className="form-control block w-full text-[1.6rem] md:text-[1.7rem] placeholder:text-[#746e6e] font-[Inconsolata] text-gray-700 bg-white bg-clip-padding  rounded-[1.2rem] p-[0rem] border-none  transition ease-in-out  file:border-none  file:p-[0.9rem]  cursor-pointer m-0 outline-none"
                      type="file"
                      id="nftVideo"
                      name="nftVideo"
                      // ref={fileRef}
                      accept="audio/*,video/*"
                      onChange={(e) => {
                        setFieldValue(
                          "nftVideo",
                          e.target?.files[0] ? e.target?.files[0] : null
                        );
                      }}
                    />
                  </div>
                  {errors.nftVideo && touched.nftVideo ? (
                    <p className="text-red-500 font-medium text-[1.6rem] errors block">
                      {errors.nftVideo}
                    </p>
                  ) : null}
                </div> : null}


              {values?.nftContentType == "audio" ?
                <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                  <div className="reginpfile w-[100%] -mt-[0.2rem]">
                    <span className="text-start block w-[84%] font-['Inconsolata'] text-[#000000e5] font-medium text-[2.2rem] tracking-wider">
                      Choose Audio For NFT
                    </span>
                  </div>
                  <h2 className="font-['Inconsolata'] text-[#f14343] font-medium text-[1.8rem] tracking-wider">Instructions:</h2>
                    <h2 className=" text-[1.3rem] font-medium font-['Inconsolata'] text-[#0D1344E5'] flex mt-[0.3rem]">
                      <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">1.</span>
                      <p>Only audio up to 50mb is free and then 1 dollar charge is apply for every next 50mb
                      </p>
                    </h2>



                  <div className="input_bord_grad w-[100%] mt-[1.5rem]">
                    <input

                      className="form-control block w-full text-[1.6rem] md:text-[1.7rem] placeholder:text-[#746e6e] font-[Inconsolata] text-gray-700 bg-white bg-clip-padding  rounded-[1.2rem] p-[0rem] border-none  transition ease-in-out  file:border-none  file:p-[0.9rem]  cursor-pointer m-0 outline-none"
                      type="file"
                      id="nftAudio"
                      name="nftAudio"
                      accept="audio/*"
                      onChange={(e) => {
                        setFieldValue(
                          "nftAudio",
                          e.target?.files[0] ? e.target?.files[0] : null
                        );
                      }}
                    />
                  </div>
                  {errors.nftAudio && touched.nftAudio ? (
                    <p className="text-red-500 font-medium text-[1.6rem] errors block">
                      {errors.nftAudio}
                    </p>
                  ) : null}
                </div> : null}




              {values?.nftContentType == "text" ?
                <>
                  <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                    <h2 className="font-['Inconsolata'] text-[#000000e5] font-medium text-[2.2rem] tracking-wider">Choose language for text of NFT:</h2>
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
                        <p className="text-red-500 font-medium text-[1.6rem] block">
                          {errors.nftLanguage}
                        </p>
                      ) : null}

                    </div>
                  </div>




                  <div className="flex flex-col w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 ">
                    <h2 className="font-['Inconsolata'] text-[#000000e5] font-medium text-[2.4rem] tracking-wider">Enter Text for NFT:</h2>
                    <h2 className="font-['Inconsolata'] text-[#f14343] font-medium text-[1.8rem] tracking-wider">Instructions:</h2>
                    <h2 className=" text-[1.3rem] font-medium font-['Inconsolata'] text-[#0D1344E5'] flex mt-[0.3rem]">
                      <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">1.</span>
                      <p>Only 1000 letter is allowed free for nft text and then 0.1 dollar charge is apply for every next 1000 letters and first 15 characters of nft text is used as title of nft
                      </p>
                    </h2>

                    <h2 className=" text-[1.3rem] font-medium font-['Inconsolata'] text-[#0D1344E5'] flex mt-[0.3rem]">
                      <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">2.</span>
                      <p>Make sure that text belong to you and you don't copy some other person text
                      </p>
                    </h2>

                    <h2 className=" text-[1.3rem] font-medium font-['Inconsolata'] text-[#0D1344E5'] flex mt-[0.3rem]">
                      <span className="text-[1.4rem] font-bold text-black pr-[0.5rem]">3.</span>
                      <p>You can choose file for txt but file format should be txt or you can enter text in editor
                      </p>
                    </h2>



                    <div className="mb-[2rem] mt-[1rem]">

                    <Editor setFieldValue={setFieldValue} initialValue={values.nftTextHTML} />


                    </div>

                  </div>
                  <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 ">
                    {errors.nftText && touched.nftText ? (
                      <p className="text-red-500 font-medium text-[1.6rem] block">
                        {errors.nftText}
                      </p>
                    ) : null}
                  </div>
                </> : null
              }
              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 ">
                <h2 className="font-['Inconsolata'] text-[#000000e5] font-medium text-[2.4rem] tracking-wider">
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
                  <p className="text-red-500 font-medium text-[1.6rem] errors block">
                    {errors.nftDescription}
                  </p>
                ) : null}
              </div>

              <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">

                <button className="bg-[#1b31c4] hover:bg-blue-800  text-white font-normal text-[1.9rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-16 rounded-[1.5rem] font-['Inconsolata'] tracking-wider"
                  type="submit" disabled={loader}>

                  Create

                </button>
              </div>

              {loader =="Verifying NFT Data..."?
                (<>
                  <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">

                    <h2 className="font-['Inconsolata'] text-[1.8rem] ">
                      {loader}
                    </h2>
                  </div>
?
                    <div className="flex justify-center  -mt-[4px]">

                      <ClipLoader
                        color={"#30DCBA"}
                        loading={loader}
                        cssOverride={{ marginBottom: "20px" }}
                        size={110}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                </>) : ""}

            {loader!=="Verifying NFT Data..." && loader ? <ConfirmModal creationFee={creationFee}  contentFee={contentFee} values={values} userinfo={userinfo} setLoader={setLoader} hash={hash}  loader={loader}/>:null}

            </div>
            <div >

              {timeNotPass ? (
                <div className="flex justify-center">
                  <h2 className="mb-[2rem] text-justify w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 font-['Inconsolata'] text-[1.4rem] font-medium text-[red]">
                    NFT with the same {type} is also present but that NFT is waiting for transaction confirmation if that transaction
                    is not mined in {timeNotPass} minutes or some error come in transaction confirmation then you can use this {type} for another NFT after {timeNotPass} minutes so please wait untill the specified time is pass
                  </h2>
                </div>) : ""
              }

              {
                duplicateNft ?

                  (
                    <>
                      <div className="flex justify-center">
                        <h2 className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 font-['Inconsolata'] text-[2.2rem] text-[red]">Your Nft {type} match with below nft {type}:</h2>
                      </div>
                      <div className="flex justify-center mb-[2rem]">
                      <IndividualNFT data={duplicateNft} original={duplicateNft?.original}  nftname={duplicateNft?.nftName} owner={duplicateNft?.owner_email} creator={duplicateNft?.creator_email} price={duplicateNft?.price} creationdate={duplicateNft?.createdAt} type={duplicateNft?.contentType} contentURI={duplicateNft?.contentURI} tokenURI={duplicateNft?.tokenURI} id={duplicateNft?.tokenURI} ></IndividualNFT>
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