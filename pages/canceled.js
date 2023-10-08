import { Editor, useEffect, useState, getServerSideProps,Navbar, Footer, axios, IndividualNFT, ToastContainer } from "../components"

import { useRouter } from 'next/router';
import useValidate from "../utils/useValidate";

const Canceled = ({userinfo}) => {

    const [loading, user, address] = useValidate(userinfo, "main");

    let router=useRouter();

    return (
        <>
    {loading &&
    <>
        <Navbar />
        <div className="flex-1 flex min-h-[85vh] justify-center  py-[5rem] sm:p-[4rem] ">
            <div className="bg-white w-[47%] pb-[1rem] rounded-[1.3rem] h-fit  shad">
                <div className="text-[2.8rem] bg-[#1E2346] rounded-t-[1rem] pt-[1rem] pb-[0.7rem] px-[2rem] border-b-[0.17rem] border-[#D9D9D9]  font-bold font-['Inconsolata']">
                    <span className="w-fit text-[#469fd6] font-bold">
                      Buy BNB
                    </span>

                </div>

                    <div className="text-[1.8rem] py-[1rem] font-normal px-[2rem] text-[#3E3B3B] font-['Inconsolata']">
                  
                  <span className="text-[2rem] font-medium">Payment failed... 
                  </span>

                  Please try again
                    </div>

                    <div className="flex px-[2rem] space-x-[1rem]">
                        <div className="pb-[1rem]">

                            <button className="bg-[#1b31c4] hover:bg-[#182ba8]  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-10 rounded-[0.6rem] font-['Inconsolata'] tracking-wider"
                                type="submit"
                            //   disabled={loader}
                            onClick={()=>{router.push("/")}}
                            >
                                Go to Home Page
                            </button>
                        </div>

                    </div>
            </div>

        </div>
        <Footer />

    </>}</>
    )
}

export default Canceled;
export {getServerSideProps}