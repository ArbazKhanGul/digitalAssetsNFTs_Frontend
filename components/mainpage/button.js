import {memo} from "react";
import { useRouter } from "next/router";
const Button=()=>{

    let router=useRouter();
    return (<><div className="cursor-pointer bord_grad w-fit text-[2.1rem]" onClick={()=>{console.log("wroking");router.push("/nfts/1")}}><span className="block px-[3rem] py-[0.4rem] buttonnft ">More...</span></div></>)
}

export default memo(Button);
