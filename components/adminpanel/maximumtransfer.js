import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { Amount } from "../../schema/index"
import { AiOutlineCopy } from "react-icons/ai"
import copy from 'clipboard-copy';
import { ethers } from "ethers";
import axios from "../../utils/axiosconfiguration";

function Detail({setMaximumTransfer}) {


  const [loader, setLoader] = useState(false);



  let initialValues = {
    amount: "",
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
    validationSchema: Amount,

    onSubmit: async (values, action) => {

      try {
        console.log("🚀 ~ file: createnft.js ~ line 39 ~ onSubmit: ~ values", values)

        setLoader(true);

        const response = await axios.post("/changebuyingoption", { maximumTransfer: values.amount });

        setLoader(false);
        setMaximumTransfer(values.amount);
        if (response?.data?.status == "success") {
          toast.success("Successfully updated", {
            position: "top-center"
          })

        }

        setLoader(false);
        action.resetForm();

      } catch (error) {
        setLoader(false);

        toast.error("Server Error Please Try Later", {
          position: "top-center",
        });
      }
    }
  })

  return (





    <form onSubmit={handleSubmit} className="w-[90%]  xs:w-[80%] sm:w-[46.5%] md:w-[43%] xl:w-[40%] mt-[4rem] infoBack h-[25rem] flex flex-col justify-center items-center space-y-[1.5rem]">

      <div className="w-fit ">
        <span className="text-start block font-['Inconsolata'] font-bold text-[#1E2245] text-[2.3rem] tracking-wider">

          Change Maximum BNB Transfer
        </span>
      </div>
      <div className="flex flex-col w-[90%]">
        <div className="input_bord_grad mb-[0.2rem] w-[100%]">
          <input type="number"
            step="1"
            min="0"
            className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
            placeholder="Enter Increment Amount in dollar..."
            name="amount"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        {errors.amount && touched.amount ? (
          <p className="text-red-500 z-10 text-[1.4rem]  errors block">
            {errors.amount}
          </p>
        ) : null}
      </div>

      <button type="submit" className="bg-[#1E40AF]  hover:bg-[#4042aa]  text-[#ffffffef] font-normal text-[1.7rem] sm:font-semibold py-3 px-10  sm:py-3 sm:px-16 rounded-full font-['Inconsolata'] tracking-wider"
        disabled={loader}
      >
        {loader ? "Confirming..." : "Confirm"}
      </button>

      <div className='flex justify-center space-x-4'>
        <span className="text-start block font-['Inconsolata'] font-bold text-[#1E2245] text-[2rem] tracking-wider">
          Current Increment:
        </span>
        <span className="text-start relative justify-center items-center flex  space-x-[1rem] font-medium font-['Inconsolata'] text-[#333641c7] mt-[0.2rem] h-fit text-[1.9rem]">

          {/* {ownerAddress.substr(0, 8) + "..." + ownerAddress.substr(37, 5)} <AiOutlineCopy onClick={handleCopy} className={`text-[1.7rem] ml-[0.5rem] cursor-pointer ${isTooltipVisible ? "text-[#44bd32]" : "text-[#444242]"}`} /> */}


        </span>
      </div>


    </form>


  )
}

export default Detail;
