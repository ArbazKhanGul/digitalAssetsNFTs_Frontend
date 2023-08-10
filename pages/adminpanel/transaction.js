import Image from "next/image";
import Navbar from "../../components/navbar";
import { useState, useEffect, useRef } from "react";
import Footer from "../../components/footer";
import "react-toastify/dist/ReactToastify.css";
import { MdFilterList } from "react-icons/md"
import Sidebar from "../../components/adminpanel/sidenav";
import { TransactionFilter as Filter } from "../../components"
import AllTransactions from "../../components/adminpanel/Alltransactions";
import {useRouter} from  "next/router";

const Transaction = ({ userinfo }) => {

    //   const [loading,user,address]=useValidate(userinfo);
    
    const router = useRouter();
    const [showItems, show] = useState(false);
    return (
        
           
            <>
                <Navbar></Navbar>

                <div className="flex relative ">

                    <Sidebar className="w-[20%]" />

                    <div className="backside w-[80%] min-h-[90vh] flex flex-col">

                        <div className="px-[2rem] sm:px-[4rem] md:px-[4.9rem]">
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-[1.5rem] flex-wrap">
                                <div className=" text-[2.7rem] sm:text-[3rem] md:text-[3.3rem] font-semibold w-fit font-['Inconsolata'] nft mt-[0.5rem] ">Latest Transactions</div>
                                <div className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#353846C7] flex items-center font-['Inconsolata']" onClick={() => {
                                    show((prevState) => {
                                        return prevState ? false : true;
                                    })
                                }}>Search Transaction By filters <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
                                </div>
                            </div>
                            <Filter showItems={showItems} router={router}
                            ></Filter>

                        </div>

                        {/* <div className=" cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[3.5rem] mt-[0.5rem] font-medium text-[#99a1a5] flex-1 flex items-center justify-center font-['Inconsolata']">

                           <span  className="block w-fit ">Nothing to Show...</span> 
                        </div> */}

                        <AllTransactions/>

                        <div>

                        </div>

                    </div>



                </div>

                <Footer></Footer>
            </>
        
    );
};

export default Transaction;
// export {getServerSideProps}