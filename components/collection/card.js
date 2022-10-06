import Image from "next/image";
import { shortText } from "limit-text-js";

const Card = () => {
    return <>
        <div className="border-[#87757587] border-2 widthCard rounded-[4rem] mt-[3rem] ">

            <div>
                <div>
                    <div className=" w-[100.28%] -ml-[0.13%]  h-[17rem]  relative">
                        <Image
                            src={`/cover.jpg`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-tl-[3.7rem] rounded-tr-[3.7rem]"
                        />
                    </div>
                </div>

                {/* <div className="flex justify-center md:block"> */}
                    <div className="   flex justify-center -mt-[4.5rem] z-50 relative rounded-full">
                        <div className="border-white z-50 relative border-[0.6rem] rounded-full">
                        <div className="w-[7.3rem] h-[7.3rem]  relative rounded">
                            <Image
                                src={`/profile.jpg`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    </div>
                {/* </div> */}

            </div>


            <div className=" pb-[1.5rem]">

                <div className="text-[#545151] flex mt-[0.5rem] lg:mt-[1rem] justify-center w-[100%] font-['DynaPuff'] text-[2.2rem] font-medium">
                {shortText("Times of Logger", 20, "...")}
                </div>

                <div className="flex justify-center lg:mt-[0.3rem]">
                    <span className="text-[#6d6363cf] text-[2rem] font-medium"><pre>By </pre></span>
                    <span className="text-[#646161] font-['DynaPuff'] text-[1.9rem] "> {shortText("Rogger", 20, "...")}</span>
                </div>

                <div className="flex justify-between px-[1rem] pt-[1rem] lg:pt-[1.5rem] box-border">
                   <div>
                    <span className="text-[#524848cf]  cardText font-medium font-['Inconsolata']">Volume </span>
                    <span className="text-[#221f1fcf] cardText font-bold font-['Inconsolata'] whitespace-nowrap mr-[4]">{shortText("1234.65", 7, "")} USD  </span>
                   </div>

                   <div>

                    <span className="text-[#524848cf] cardText font-medium font-['Inconsolata']">Floor Price </span>
                    <span className="text-[#221f1fcf] cardText font-bold font-['Inconsolata'] whitespace-nowrap">{shortText("1234.65", 7, "")} USD</span>
                   </div>
                </div>
            </div>
        </div>
    </>
}

export default Card;