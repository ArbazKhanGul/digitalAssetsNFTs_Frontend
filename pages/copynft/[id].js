import Select from 'react-select';
import options from "../../utils/languages.json"
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Editor, useEffect, Image, useState, Navbar, Footer, useRouter, axios, IndividualNFT, ToastContainer } from "../../components"
import { NFTCopySchema } from "../../schema/index"
import getServerSideProps from "../../utils/serverSideCopy"
import useValidate from '../../utils/useValidate';
import ClipLoader from "react-spinners/ClipLoader";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ipfsUpload from '../../utils/copyIPFSsameContent';
import ipfsUploadDifferent from "../../utils/copyIPFSdifferentContent";

const style = {
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        border: "none"
    }),
}

const Item = ({ userinfo,nftData }) => {
console.log("🚀 ~ file: [id].js:23 ~ Item ~ nftData:", nftData)


    const [duplicateNft, changeDuplicate] = useState("");
    const [loader, setLoader] = useState(false);
    const [timeNotPass, setTimeNotPass] = useState(false);
    const [path, setPath] = useState("");
    // const [type, setType] = useState("");

    const router = useRouter();

    const [loading, user] = useValidate(userinfo);

    let initialValues = {
        nftContentUse:"yes",
        nftContentType: nftData?.contentType,
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
        validationSchema: NFTCopySchema,

        onSubmit: async (values, action) => {


            console.log("🚀 ~ file: createnft.js ~ line 39 ~ onSubmit: ~ values", values)

            try {

                if(values.nftContentUse=="yes"){
                    setLoader("Uploading nft content metadata...")
                    await ipfsUpload(nftData?.tokenURI,nftData?.tokenId,setLoader, setPath)
                 }
                 else{
                   await ipfsUploadDifferent(values,nftData?.tokenURI,nftData?.tokenId,setLoader, setPath)
                 }

            } catch (error) {
                console.log("🚀 ~ file: createnft.js ~ line 95 ~ onSubmit: ~ error", error)
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
        console.log("🚀 ~ file: [id].js:136 ~ Item ~ errors:", errors)




    return (
        <>

            {!loading ? (
                <div className="text-[1.6rem] font-['Inconsolata']">
                    <ToastContainer pauseOnHover autoClose={5000} />
                </div>
            ) : (
                <>
                    <Navbar></Navbar>
                    <form onSubmit={handleSubmit} className='w-[100%] email flex justify-center '>


                        <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 flex my-[3.5rem] py-[1.4rem]  rounded-3xl flex-col px-[2rem] bg-white  space-y-[1rem] mb-[2rem] ">


                            <div className=" flex justify-center mb-[1rem]">
                                <div className="input_bord_grad_bottom w-fit ">
                                    <div className="color text-[3rem] sm:text-[3.4rem] lg:text-[3.7rem] w-fit  tracking-wide font-['Barlow Condensed'] ">
                                        NFT Copy Creation

                                    </div></div>
                            </div>

                            <div className=" mt-[2.5rem]">
                                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2.4rem] sm:text-[2.7rem]   tracking-wider">Original NFT Detail: </h2>

                            </div>

                            <div className="flex space-x-[9rem] items-center">
                                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] sm:text-[2.1rem] tracking-wider">NFT Name: </h2>
                                <h3
                                    onClick={() => { router.push(`/individualnft/${nftData?.tokenURI}`) }}
                                    className="w-fit text-[#069EBF] cursor-pointer decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.7rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                                    {nftData?.nftName}
                                </h3>
                            </div>


                            <div className=" flex space-x-[5rem] items-center">
                                <div className="flex items-center space-x-[4rem]">
                                    <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] sm:text-[2.1rem] tracking-wider">NFT Creator: </h2>
                                    <div onClick={() => { router.push(`/profile/${nftData?.creator?._id}`) }} className={`flex  items-center space-x-[0.4rem] hover:text-[blue] py-[0.9rem] border-[#d4dee2] cursor-pointer`}>
                                        <div className=" w-[4.6rem] h-[4.6rem] sm:px-[1.3rem]">
                                            <div className=" w-[4.5rem] h-[4.5rem] rounded-full relative">
                                                <Image
                                                    src={`${process.env.SERVER_URL}/images/${nftData?.creator?.profile}`}
                                                    // src={'/cover.jpg'}
                                                    layout="fill"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="grow text-ellipsis overflow-x-hidden px-[0.4rem] sm:px-[1.4rem]">
                                            <h3 className="text-[#069EBF] decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                                                {nftData?.creator?.authorName}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex space-x-[4rem] items-center">
                                <div className="flex items-center space-x-[2rem]">
                                    <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] sm:text-[2.1rem] tracking-wider">Current Owner: </h2>
                                    <div onClick={() => { router.push(`/profile/${nftData?.owner?._id}`) }} className={`flex  items-center space-x-[0.4rem] hover:text-[blue] py-[0.9rem] border-[#d4dee2] cursor-pointer`}>
                                        <div className=" w-[4.6rem] h-[4.6rem] sm:px-[1.3rem]">
                                            <div className=" w-[4.5rem] h-[4.5rem] rounded-full relative">
                                                <Image
                                                    src={`${process.env.SERVER_URL}/images/${nftData?.owner?.profile}`}
                                                    // src={'/cover.jpg'}
                                                    layout="fill"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="grow text-ellipsis overflow-x-hidden px-[0.4rem] sm:px-[1.4rem]">
                                            <h3 className="text-[#069EBF] decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                                                {nftData?.creator?.authorName}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="mb-[0.4rem] flex space-x-[5rem] items-center">
                                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] sm:text-[2.1rem] tracking-wider">Content Type: </h2>
                                <h3
                                    // onClick={() => { router.push(`/individualnft/${data?.nftId}`) }}
                                    className="w-fit cursor-pointer text-[#545151]  text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                                    {nftData?.contentType}
                                </h3>
                            </div>


                            <div className="border-b-2">

                            </div>
                            <div className="mt-[0rem]">
                                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2.4rem] sm:text-[2.7rem] font-[2.3rem]  tracking-wider mt-[0.4rem]">NFT Creation Detail: </h2>

                            </div>

                            <div className="">
                                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] sm:text-[2.1rem] tracking-wider">Use the same content of original nft: </h2>
                                <div className='flex space-x-[2rem] mt-[0.5rem]'>
                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" value="yes"
                                         name="nftContentUse"
                                         onChange={handleChange}
                                         checked={values.nftContentUse=="yes"} 
                                         className="w-6 cursor-pointer h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-1" className="ml-2 text-[#000000]  text-[1.9rem] sm:text-[1.7rem] font-['Inconsolata'] font-medium">Yes</label>
                                    </div>

                                    <div class="flex items-center mb-4">
                                        <input id="default-radio-1" type="radio" 
                                        value="no" name="nftContentUse"
                                        onChange={handleChange}
                                        checked={values.nftContentUse=="no"} 
                                        className="w-6 h-6 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-radio-1" className="ml-2 text-[#000000]  text-[1.9rem] sm:text-[1.7rem] font-['Inconsolata'] font-medium">No</label>
                                    </div>
                                </div>
                                {/* <h3 
    // onClick={() => { router.push(`/individualnft/${data?.nftId}`) }}
                 className="w-fit cursor-pointer text-[#545151]  text-[1.9rem] sm:text-[2.2rem] font-['Inconsolata'] font-medium">
                                        {"Video"}
                                    </h3> */}
 
                           </div>
                             {/* <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                                <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2.2rem] tracking-wider">Choose the Type Of Content</h2>
                                <div className="mt-[1rem] w-[100%] relative ">
                                    <div className="input_bord_grad  mb-[0.2rem] !w-[100%]">

                                        <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"
                                            defaultValue={{ "label": "text", "value": "text" }}
                                            name="nftContentType"
                                            onChange={(e) => {
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
                                        <p className="text-red-500 text-[1.4rem] block">
                                            {errors.nftContentType}
                                        </p>
                                    ) : null}

                                </div>
                            </div> */}







                            {nftData?.contentType == "image" && values.nftContentUse=="no"?
                                <div className="">
                                    <div className="reginpfile w-[100%] mb-[1rem] ">
                                        <span className="text-start block w-[84%] font-['Inconsolata'] text-[#0D1344E5'] text-[2.2rem] tracking-wider">
                                            Choose Image For NFT
                                        </span>
                                    </div>
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
                                        <p className="text-red-500 text-[1.4rem] errors block">
                                            {errors.nftImage}
                                        </p>
                                    ) : null}
                                </div> : null}


                            {nftData?.contentType == "video" && values.nftContentUse=="no" ?
                                <div className="">
                                    <div className="reginpfile w-[100%] mb-[1rem] ">
                                        <span className="text-start block w-[84%] font-['Inconsolata'] text-[#0D1344E5'] text-[2.2rem] tracking-wider">
                                            Choose Video For NFT
                                        </span>
                                    </div>
                                    <div className="input_bord_grad w-[100%] ">
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
                                        <p className="text-red-500 text-[1.4rem] errors block">
                                            {errors.nftVideo}
                                        </p>
                                    ) : null}
                                </div> : null}


                            {nftData?.contentType == "audio"  && values.nftContentUse=="no"?
                                <div className="">
                                    <div className="reginpfile w-[100%] mb-[1rem] ">
                                        <span className="text-start block w-[84%] font-['Inconsolata'] text-[#0D1344E5'] text-[2.2rem] tracking-wider">
                                            Choose Audio For NFT
                                        </span>
                                    </div>
                                    <div className="input_bord_grad w-[100%] ">
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
                                        <p className="text-red-500 text-[1.4rem] errors block">
                                            {errors.nftAudio}
                                        </p>
                                    ) : null}
                                </div> : null}




                            {nftData?.contentType == "text"  && values.nftContentUse=="no"?
                                <>
                                    <div className="">
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




                                    <div className="flex flex-col h-fit">
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
                                </> : null
                            }

                            { values.nftContentUse=="no"?
                            <div className="">
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
                            </div>:null}
                                
                            <div className="mb-[2rem]">

                                <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12 mb-[1rem]  sm:py-2 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider"
                                    type="submit" 
                                    // disabled={loader}
                                    >

                                    Create Copy

                                </button>
                            </div>
                            {loader ?
                                (<>
                                    <div className="">

                                        <h2 className="font-['Inconsolata'] text-[1.8rem] ">
                                            {loader}
                                        </h2>
                                    </div>

                                    {loader != "Token transaction verification..." ?
                                        <div className="flex justify-center  -mt-[4px]">

                                            <ClipLoader
                                                color={"#30DCBA"}
                                                loading={loader}
                                                cssOverride={{ marginBottom: "20px" }}
                                                size={110}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div> : ""}
                                </>) : ""}



                            {loader == "Token transaction verification..." ? (<div className="flex justify-center  -mt-[4px]">
                                <CountdownCircleTimer
                                    isPlaying={loader == "Token transaction verification..."}
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
                                </CountdownCircleTimer></div>) : ""
                            }
                        </div>
                        <div >
                            {timeNotPass ? (
                                <div className="flex justify-center">
                                    <h2 className="mb-[2rem] text-justify  font-['Inconsolata'] text-[1.4rem] text-[red]">
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
                                                <h2 className="font-['Inconsolata'] text-[2.2rem] text-[red]">Your Nft {type} match with below nft {type}:</h2>
                                            </div>
                                            <div className="flex justify-center mb-[2rem]">
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