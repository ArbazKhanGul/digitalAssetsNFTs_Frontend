import Image from "next/image";
import Navbar from "../../components/navbar";
import { useState, useEffect, useRef } from "react";
import Footer from "../../components/footer";
import "react-toastify/dist/ReactToastify.css";
import { MdFilterList } from "react-icons/md"
import Sidebar from "../../components/adminpanel/sidenav";
import Info from "../../components/adminpanel/info";

import { NftFilter as Filter,AdminNFT as NFT  } from "../../components"

const profileUpdate = ({ userinfo }) => {

    //   const [loading,user,address]=useValidate(userinfo);

    const [showItems, show] = useState(false);
    return (
        <>
            {/* {!loading ? ( */}
            {/* // <div className="text-[1.6rem] font-['Inconsolata']"> */}
            {/* //   <ToastContainer pauseOnHover autoClose={5000} /> */}
            {/* // </div> */}
            {/* ) : ( */}
            <>
                <Navbar></Navbar>




                <div className="flex relative ">

                    <Sidebar className="w-[20%]" />

                    <div className="backside w-[80%] min-h-[90vh] flex flex-col">

                        <div className="px-[2rem] sm:px-[4rem] md:px-[4.9rem]">
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-[1.5rem] flex-wrap">
                                <div className=" text-[2.7rem] sm:text-[3rem] md:text-[3.3rem] font-semibold w-fit font-['Inconsolata'] nft mt-[0.5rem] ">Search NFT Token ID</div>
                                <div className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#353846C7] flex items-center font-['Inconsolata']" onClick={() => {
                                    show((prevState) => {
                                        return prevState ? false : true;
                                    })
                                }}>Search Token By filters <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
                                </div>
                            </div>
                            <Filter showItems={showItems}
                            ></Filter>

                        </div>

                        <div className=" cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[3.5rem] mt-[0.5rem] font-medium text-[#99a1a5] flex-1 flex items-center justify-center font-['Inconsolata']">

                           <span  className="block w-fit ">Nothing to Show...</span> 
                        </div>

                           <div>

                                               </div>
                    </div>



                </div>

                <Footer></Footer>
            </>
            {/* )} */}
        </>
    );
};

export default profileUpdate;
// export {getServerSideProps}