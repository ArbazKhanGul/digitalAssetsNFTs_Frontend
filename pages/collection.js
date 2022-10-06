import { useState,useEffect } from "react";
import {MdFilterList} from "react-icons/md"
import Navbar  from '../components/navbar'
import Filter from "../components/collection/filter";
import Card from "../components/collection/card";

const Collection=()=>{
    const [showItems, show]=useState(false);

    let result=[];
    for(let i=1;i<10;i++)
    {
      result.push( <Card key={i}/>)
    }
    return <>
     <Navbar></Navbar> 

     <div className="px-[2rem] sm:px-[4rem] md:px-[5.9rem] mt-[1.5rem] -mb-[1rem]">
    <div className="flex flex-col sm:flex-row justify-between items-center mt-[0.5rem] flex-wrap">
        <div className="nft text-[2.7rem] sm:text-[3rem] md:text-[3.3rem] w-fit font-['DynaPuff'] mt-[0.5rem]">All Collections</div>
        <div className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#353846C7] flex items-center font-['Inconsolata']" onClick={()=>{show((prevState)=>{
    return prevState?false:true;
  })}}>Search Collection By filters <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
        </div>
    </div>
    <Filter showItems={showItems}></Filter>
    
    </div>

<div className="px-[0rem] sm:px-[2rem] md:px-[3.9rem] xl:px-[5.9rem] flex  collectionJustification  flex-wrap ">
        
        {
        
result
        }


    </div>
    </>
}

export default Collection;
