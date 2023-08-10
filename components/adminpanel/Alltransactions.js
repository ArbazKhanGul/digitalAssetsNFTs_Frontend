
import useSWR from "swr"
import getDataRoute from "../../utils/getDataRoute";
import {useRouter} from  "next/router";
import {fetcherTransactions} from "../../utils/fetcher"


const AllTransactions=()=>{
   // const router = useRouter();
   // let {route,paramid}=getDataRoute(router,"gettransactions");

   // const { data, error,isValidating ,mutate} = useSWR(route, fetcherTransactions);


   return (
        <div className="overflow-x-auto mx-[5rem] mt-[2rem]">
            <div className="flex w-fit  font-semibold bg-[#7f8c8d] text-white rounded-lg">
               <h2 className="transRowHeader"> Type</h2>
               <h2 className="transRowHeader">NFT Name</h2>
               <h2 className="transRowHeader">Creator</h2>
               <h2 className="transRowHeader">Token Id</h2>
               <h2 className="transRowHeader">Copy Of</h2>
               <h2 className="transRowHeader">Owner</h2>
               <h2 className="transRowHeader">Buyer</h2>
               <h2 className="transRowHeader">Price</h2>
            </div>

            <div className="flex w-fit hover:bg-[#ecf0f1]">
               <h2 className="transRow"> Create</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">First</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">nft@gmail.com</h2>
               <h2 className="transRow">1</h2>
               <h2 className="transRow">0</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">Ali@gmail.com</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">Rehman@gmail.com</h2>
               <h2 className="transRow">1.0 BNB</h2>
            </div>
            <div className="flex w-fit hover:bg-[#ecf0f1]">
               <h2 className="transRow"> Create</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">First</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">nft@gmail.com</h2>
               <h2 className="transRow">1</h2>
               <h2 className="transRow">0</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">Ali@gmail.com</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">Rehman@gmail.com</h2>
               <h2 className="transRow">1.0 BNB</h2>
            </div>
            <div className="flex w-fit hover:bg-[#ecf0f1]">
               <h2 className="transRow"> Create</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">First</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">nft@gmail.com</h2>
               <h2 className="transRow">1</h2>
               <h2 className="transRow">0</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">Ali@gmail.com</h2>
               <h2 className="transRow hover:text-blue-500 cursor-pointer">Rehman@gmail.com</h2>
               <h2 className="transRow">1.0 BNB</h2>
            </div>
        </div>
    )
}

export default AllTransactions;