
import useSWR from "swr"
import Navbar from "../../../components/navbar";
import { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { MdFilterList } from "react-icons/md"
import Sidebar from "../../../components/adminpanel/sidenav";
import { TransactionFilter as Filter, Pagination, Footer } from "../../../components"
import AllTransactions from "../../../components/adminpanel/transactions/Alltransactions";
import getDataRoute from "../../../utils/getDataRoute";
import { useRouter } from "next/router";
import { fetcherTransactions } from "../../../utils/fetcher"
import PuffLoader from "react-spinners/PuffLoader";
import getServerSideProps from "../../../utils/admin/serverSideAdmin"
import useValidate from '../../../utils/useValidate';


const Transaction = ({ userinfo }) => {

    const [loading,user,address]=useValidate(userinfo);

    const router = useRouter();
    let { route, paramid } = getDataRoute(router, "gettransactions");

    const { data, error, isValidating, mutate } = useSWR(route, fetcherTransactions);

    const [showItems, show] = useState(false);
    return (
        <>
        {loading && (
        <>
            <Navbar></Navbar>

            <div className="flex relative ">

                <Sidebar className="w-[20%]" />

                <div className=" w-[80%] min-h-[80vh] flex flex-col ">

                    <div className="px-[2rem] sm:px-[4rem] md:px-[4.9rem]">
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-[1.5rem] flex-wrap">
                            <div className=" text-[2.7rem] sm:text-[3rem] md:text-[3.3rem] font-semibold w-fit font-['Inconsolata'] color mt-[0.5rem] ">Latest Transactions</div>
                            <div className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#22242ec7] flex items-center font-['Inconsolata']" onClick={() => {
                                show((prevState) => {
                                    return prevState ? false : true;
                                })
                            }}>Search Transaction By filters <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
                            </div>
                        </div>
                        <Filter showItems={showItems} router={router}
                        ></Filter>

                    </div>

                    {
                        isValidating ?
                            (<div className="flex w-[100%] h-[30%] mt-[5rem] justify-center ">

                                <PuffLoader
                                    color={"#30DCBA"}
                                    cssOverride={{ marginBottom: "20px" }}
                                    size={160}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>)
                            : null}

                    {!error && !isValidating && data?.transactions.length > 0 ?
                        <AllTransactions allTransactions={data?.transactions} /> : null
                    }

                     {data?.transactions?.length==0 && !error && !isValidating ? (<div className="px-[2rem] py-[2rem] sm:px-[4rem] md:px-[4.9rem] text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                     }

                     {error ? (<div className="text-[red] px-[2rem] sm:px-[4rem] md:px-[4.9rem] font-bold text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['Inconsolata'] mt-[0.5rem]">
                                Error in getting Transactions Please try later!</div>) : ""
                            }

                    <div>

                        {
                            data?.count > 10 && paramid * 10 < data?.count + 10 ? <Pagination url={"/adminpanel/transactions"} count={data?.count} pageShow={paramid} div={8} /> : ""
                        }
                    </div>

                </div>



            </div>

            <Footer></Footer>
        </>
        )}
        </>
    );
};

export default Transaction;
export {getServerSideProps}