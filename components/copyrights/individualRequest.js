import Image from "next/image";
import cliTruncate from 'cli-truncate';
import { ethers } from "ethers";
import { useRouter } from "next/router";


function IndividualRequest({num,data}) {

  let date=new Date();

    return (
    <div className="w-[100%]  bg-[#1E40AF] flex flex-col overflow-hidden text-ellipsis">


<div className="px-[2rem] text-[#c0cecf] text-right  text-[1.8rem] sm:text-[1.8rem] -mb-[1.6rem] mt-[0.4rem] whitespace-nowrap overflow-hidden text-ellipsis">
<span className="text-[#f5f5f5] font-semibold text-[1.9rem] capitalize mr-[1.5rem]">{data?.status}</span>            {date.toLocaleString()}
          </div>

      <div className=" px-[2rem] border-b-[0.1rem] border-[#c9c1c1] flex flex-col sm:flex-row space-x-[3rem] lg:space-x-[6rem]">    
      
      <div className="flex items-center space-x-[3rem] sm:space-x-[1rem] w-[60%] mt-[0.8rem] sm:mt-0">

                                    <h3 className="whitespace-nowrap text-[#f5f5f5] font-semibold text-[1.9rem] sm:text-[2.1rem]  tracking-wider">
                                  <span>{num + 1}. </span>       Requester:
                                    </h3>

      <div  className={`flex  items-center space-x-[0.4rem] hover:text-[blue] py-[0.9rem] border-[#d4dee2] cursor-pointer`}>
                                        <div className=" w-[4.6rem] h-[4.6rem] sm:px-[1.3rem]">
                                            <div className=" w-[4.5rem] h-[4.5rem] rounded-full relative">
                                                <Image
                                                    src={`${process.env.SERVER_URL}/images/${data?.requestorProfile
                                                    }`}
                                                    // src={'/cover.jpg'}
                                                    layout="fill"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-ellipsis overflow-x-hidden px-[0.5rem] sm:px-[1.4rem]">
                                            <h3 className="text-[#d7cdeb] whitespace-nowrap  text-[1.9rem] sm:text-[2.1rem]  font-medium">

                                            {cliTruncate(data?.requestorName?data?.requestorName:"", 8, {position: 'end'})}
                                            </h3>
                                        </div>
                                    </div>

                                    </div>


                                    <div className="flex items-center w-[40%] space-x-[8rem] sm:space-x-[1rem] ">
                                    <h3 className="text-[#eee8e8] font-semibold text-[1.9rem] sm:text-[2.1rem]  tracking-wider">
                                        Offer:
                                    </h3>
                                    <h3 className="text-[#d7cdeb] whitespace-nowrap text-[1.9rem] sm:text-[2.1rem]  font-medium">
                                    {cliTruncate(ethers.utils.formatUnits(data?.offeredMoney.toLocaleString('fullwide', { useGrouping: false }), 18),9)}  BNB
                                    
                                    </h3>
                                </div>


      </div>
    </div>
  )
}

export default IndividualRequest
