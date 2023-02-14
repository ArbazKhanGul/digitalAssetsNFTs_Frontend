import React from 'react'
import Image from "next/image";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

function individual({data,index}) {

    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US');

  return (
<div className={`flex items-center space-x-[0.4rem] py-[0.9rem] ${data?.status==false?"bg-[#ecf0f1]":"" } rounded-lg px-[0.2rem] transition-all duration-500  linear border-[#d4dee2] cursor-pointer ${index==5?"":"border-b-[1px]"}`}>
                        <div className=" w-[4.9rem] h-[4.9rem]">
                        <div className=" w-[4.7rem] h-[4.7rem] rounded-full relative">
                          <Image
                            src={`/profile.jpg`}
                            layout="fill"
                            className="rounded-full"
                          />


                        </div>
                        </div>
                        <div className="grow text-ellipsis overflow-x-hidden">
                        <h2 className="text-[1.7rem] font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">
                            {/* 0x456775...5555 so come here Buy your nft */}

                            {/* {data.description} */}
                            {data?.type=="creator_profit"?`Your created nft with id ${data?.tokenId} owner has been changed and now the new owner is ${data?.transfer_to}
                             and after selling 10 percent from profit i.e ${data?.price} is successfully transferred to your wallet`:null}

                            {data?.type=="seller_profit"?`Your owner nft with id ${data?.tokenId} that you upload for selling has been sell and ${data?.price} is transferred to your wallet now the new owner is ${data?.transfer_to}
                             and in case you get profit from selling this nft then from profit  10 percent creator profit and 10 percent platform charges is deducted from profit but if you don't get any profit  by selling this  then no profit is deducted and all money  is successfully transferred to your wallet `:null}
                            </h2>
                        <h3 className="-mt-[0.4rem] text-[1.3rem] font-medium text-[#5f6668]">{timeAgo.format(new Date(data?.createdAt))}</h3>
                        </div>
                      </div>
  )
}

export default individual
