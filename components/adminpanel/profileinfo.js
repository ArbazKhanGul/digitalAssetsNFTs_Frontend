import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { WalletAddressInput } from "../../schema/index"
import copy from 'clipboard-copy';
import Image from "next/image";
import Link from "next/link";
import { shortText } from "limit-text-js";
import axios from "../../utils/axiosconfiguration"

function Detail({ type }) {


  const [user, setUser] = useState("");
  const [loader,setLoader]=useState(false);



  let initialValues = {
    walletAddress: "",
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
    validationSchema: WalletAddressInput,

    onSubmit: async (values, action) => {


        try {

      setLoader(true)
      const result = await axios.get(`/getprofile?address=${values.walletAddress}`);
  
      setLoader(false);
      setUser(result?.data?.profile);

      } catch (error) {
      setLoader(false);
      setUser("")
        if (error?.response?.data?.message?.startsWith("Profile Not Found"))
        {
            toast.error("Profile not found", {
                position: "top-center",
              });
        }
        else if (error?.response?.data?.message?.startsWith("bad address checksum"))
        {
            toast.error("Invalid wallet Address", {
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
         
          Get User Profile
        </span>
      </div>
      <div className="flex flex-col w-[90%]">
        <div className="input_bord_grad mb-[0.2rem] w-[100%]">
          <input type="text"
            step="1"
            className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
            placeholder="Enter wallet address..."
            name="walletAddress"
            value={values.walletAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        {errors.walletAddress && touched.walletAddress ? (
          <p className="text-red-500 z-10 text-[1.4rem]  errors block">
            {errors.walletAddress}
          </p>
        ) : null}
      </div>

      <button type="submit" className="bg-[#1E40AF]  hover:bg-[#4042aa]  text-[#ffffffff] font-normal text-[1.7rem] sm:font-semibold py-3 px-10  sm:py-3 sm:px-16 rounded-full font-['Inconsolata'] tracking-wider"
      disabled={loader}
      >
        {loader ?"Searching...":"Search"}
      </button>

      <div className='flex justify-center items-center space-x-4'>
        <span className="text-start block  font-['Inconsolata'] font-bold text-[#1E2245] text-[2rem] tracking-wider">
          Profile :
        </span>
        <span className="text-start relative justify-center items-center flex  space-x-[1rem] font-medium font-['Inconsolata'] text-[#252424] mt-[0.2rem] h-fit text-[1.9rem]">

      {user ? <li className="inline-block links">
                  <Link href={`/profile/${user._id}`}>
                    <a
                    >
                      <div className="flex items-center space-x-[0.7rem]">
                        <div className=" w-[4.2rem] h-[4.2rem] rounded-full relative">
                          <Image
                            src={`${process.env.SERVER_URL}/images/${user?.profile}`}
                            layout="fill"
                            className="rounded-full"
                          />


                        </div>
                        <h2 className="text-[#1E2245] font-semibold"> {shortText(user.authorName, 10, "...")}</h2>
                      </div>
                    </a>
                  </Link>
                </li> : <span>...</span>
}

        </span>
      </div>


    </form>


  )
}

export default Detail
