import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { TokenIDinput } from "../../schema/index"
import { AiOutlineCopy } from "react-icons/ai"
import copy from 'clipboard-copy';
import { ethers } from "ethers";


function Detail({ type }) {


  const [ownerAddress, setOwnerAddress] = useState("0x0000000000000000000000000000000000000000");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [loader,setLoader]=useState(false);

  const handleCopy = () => {
    copy(ownerAddress);
    setTooltipVisible(true);

    setTimeout(() => {
      setTooltipVisible(false);
    }, 1500);
  };

  let initialValues = {
    tokenId: "",
  };

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
    validationSchema: TokenIDinput,

    onSubmit: async (values, action) => {


      console.log("🚀 ~ file: createnft.js ~ line 39 ~ onSubmit: ~ values", values)


      try {
        const NftAbi = [
          // Get the creator of token
          "function ownerOf(uint256 tokenId) public view virtual returns (address)"
      ];

      setLoader(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()

      const nftContract = new ethers.Contract(process.env.Address, NftAbi, signer);

      let result=await nftContract.ownerOf(values.tokenId);
      
      setLoader(false);
      setOwnerAddress(result);
      console.log("🚀 ~ file: info.js:21 ~ tokenOwner ~ result:", result)

      } catch (error) {
      setLoader(false);
      setOwnerAddress("0x0000000000000000000000000000000000000000")
        if (error.message.startsWith("call revert exception"))
        {
            toast.error("Wrong token Id", {
                position: "top-center",
              });
        }
        else{
      toast.error("Please Try Later", {
        position: "top-center",
      });
      }
      }
    }
  })

  return (





    <form onSubmit={handleSubmit} className="w-[90%]  xs:w-[80%] sm:w-[46.5%] md:w-[43%] xl:w-[40%] mt-[4rem] infoBack h-[25rem] flex flex-col justify-center items-center space-y-[1.5rem]">

      <div className="w-fit ">
        <span className="text-start block font-medium font-['Inconsolata'] text-[#333641c7] text-[2.3rem] tracking-wider">
          {type == "creator" && "Check Token Creator"}

          {type == "owner" && "Check Token Onwer"}

          {type == "copy" && "Check Copy Of"}

          {type == "profile" && "Get User Profile"}
        </span>
      </div>
      <div className="flex flex-col w-[90%]">
        <div className="input_bord_grad mb-[0.2rem] w-[100%]">
          <input type="number"
            step="1"
            className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
            placeholder="Enter Token ID..."
            name="tokenId"
            value={values.tokenId}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        {errors.tokenId && touched.tokenId ? (
          <p className="text-red-500 z-10 text-[1.4rem]  errors block">
            {errors.tokenId}
          </p>
        ) : null}
      </div>

      <button type="submit" className="bg-blue-500  hover:bg-blue-700  text-[#f1eeee] font-normal text-[1.7rem] sm:font-semibold py-3 px-10  sm:py-3 sm:px-16 rounded-full font-['Inconsolata'] tracking-wider"
      disabled={loader}
      >
        {loader ?"Searching...":"Search"}
      </button>

      <div className='flex justify-center space-x-4'>
        <span className="text-start block font-medium font-['Inconsolata'] text-[#333641c7] text-[2rem] tracking-wider">
          Creator:
        </span>
        <span className="text-start relative justify-center items-center flex  space-x-[1rem] font-medium font-['Inconsolata'] text-[#333641c7] mt-[0.2rem] h-fit text-[1.9rem]">

        {ownerAddress.substr(0, 8) + "..." + ownerAddress.substr(37, 5)} <AiOutlineCopy onClick={handleCopy} className={`text-[1.7rem] ml-[0.5rem] cursor-pointer ${isTooltipVisible ? "text-[#44bd32]":"text-[#444242]"}`} />

          {
isTooltipVisible &&
(<div className="absolute bottom-[2.5rem] -right-[3.4rem] mt-2 bg-[#44bd32] text-white px-4 py-2  rounded-lg">
          Copied
        </div>)
      }


        </span>
      </div>


    </form>


  )
}

export default Detail;
