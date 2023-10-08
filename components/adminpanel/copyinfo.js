import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { TokenIDinput } from "../../schema/index"
import { AiOutlineCopy } from "react-icons/ai"
import copy from 'clipboard-copy';
import { ethers } from "ethers";


function Detail({ type }) {


  const [copyOf, setCopyOf] = useState("0");
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [loader,setLoader]=useState(false);

  const handleCopy = () => {
    copy(copyOf);
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
          "function copyOf(uint tokenId) public view returns(uint res)"
      ];

      setLoader(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()

      const nftContract = new ethers.Contract(process.env.Address, NftAbi, signer);

      let result=await nftContract.copyOf(values.tokenId);
      
      setLoader(false);
      setCopyOf(result);
  
      } catch (error) {
      setLoader(false);
      setCopyOf("0")
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
        <span className="text-start block  font-['Inconsolata'] font-bold text-[#1E2245] text-[2.3rem] tracking-wider">
     
          Check Copy Of

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

      <button type="submit" className="bg-[#1E40AF]  hover:bg-[#4042aa]  text-[#ffffffff] font-normal text-[1.7rem] sm:font-semibold py-3 px-10  sm:py-3 sm:px-16 rounded-full font-['Inconsolata'] tracking-wider"
      disabled={loader}
      >
        {loader ?"Searching...":"Search"}
      </button>

      <div className='flex justify-center space-x-[2rem]'>
        <span className="text-start block font-['Inconsolata'] font-bold text-[#1E2245] text-[2rem] tracking-wider">
          Copy of:
        </span>
        <span className="text-start relative justify-center items-center flex  space-x-[1rem] font-medium font-['Inconsolata'] text-[#252424] mt-[0.2rem] h-fit text-[1.9rem]">

        {copyOf} <AiOutlineCopy onClick={handleCopy} className={`text-[1.7rem] ml-[0.5rem] cursor-pointer ${isTooltipVisible ? "text-[#44bd32]":"text-[#444242]"}`} />

          {
isTooltipVisible &&
(<div className="absolute bottom-[2.5rem] -right-[3.4rem] mt-2 bg-[#44bd32] text-white px-4 py-2  rounded-md text-[1.5rem]">
          Copied
        </div>)
      }


        </span>
      </div>


    </form>


  )
}

export default Detail
