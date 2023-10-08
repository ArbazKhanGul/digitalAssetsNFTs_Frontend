import {ethers} from "ethers";
import { useRouter } from "next/router";
const IndividualTransactions=({data})=>{
  let router=useRouter();
  let date=new Date(data.createdAt).toLocaleString()
    return (

             <div className="flex w-fit hover:bg-[rgb(236,240,241)]  font-['Inconsolata']">
                <h2 className="transRow font-bold "> {data.type}</h2>
                <h2 className="transRow hover:text-blue-500 cursor-pointer" onClick={()=>{router.push(`/individualnft/${data.nftId}`)}}>{data.nftName}</h2>
                <h2 className="transRow hover:text-blue-500 cursor-pointer" onClick={()=>{router.push(`/profile/${data.ownerId}`)}}>{data?.ownerName}</h2>
                <h2 className="transRow">{data.tokenId}</h2>
                <h2 className="transRow font-bold">{data.original?"true":"false"}</h2>
                <h2 className="transRow hover:text-blue-500 cursor-pointer" onClick={()=>{router.push(`/profile/${data.buyerId}`)}}>{data?.buyerName!==undefined?data?.buyerName:"..."}</h2>
                <h2 className="transRow">  {
                  // Number(data?.price).toLocaleString('fullwide', { useGrouping: false })
                // data?.price.toLocaleString('fullwide', { useGrouping: false })
                } BNB</h2>
                <h2 className="transRow">  {date}</h2>
             </div>
     )
 }

 export default IndividualTransactions;