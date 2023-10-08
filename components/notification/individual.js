import Image from "next/image";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import typeTemplates from "./notificationObject"




function individual({data,index,id}) {

    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US');

    const template = typeTemplates[data.type];

  return (
<div className={`flex  items-center space-x-[0.4rem] hover:text-[blue] py-[0.9rem] ${data?.status==false?"bg-[#ecf0f1]":"" } rounded-lg px-[0.2rem] transition-all duration-500  linear ${id==data?._id?"text-[blue]":""} border-[#d4dee2] cursor-pointer ${index==5?"":"border-b-[1px]"}`}>
                        <div className=" w-[4.9rem] h-[4.9rem] sm:px-[1.3rem]">
                        <div className=" w-[4.7rem] h-[4.7rem] rounded-full relative">
                          <Image
                            src={`${process.env.SERVER_URL}/images/${data?.owner_profile}`}
                            layout="fill"
                            className="rounded-full"
                          />
                        </div>
                        </div>
                        <div className="grow text-ellipsis overflow-x-hidden px-[1.4rem]">
                        <h2 className="text-[1.7rem] font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">
                            {/* 0x456775...5555 so come here Buy your nft */}

                            {/* {data.description} */}
                            {template ? template(data) : null}
                            </h2>
                        <h3 className={`-mt-[0.4rem] text-[1.3rem] font-medium text-[#5f6668]`}>{timeAgo.format(new Date(data?.createdAt))}</h3>
                        </div>
                      </div>
  )
}

export default individual
