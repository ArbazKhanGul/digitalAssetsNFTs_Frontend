import Individual from './individual'
import usePaginationNF from '../../utils/usePaginationNF';
import Link from 'next/link'
import PuffLoader from "react-spinners/PuffLoader";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useRouter} from '../'
import { useState } from 'react';

const Notification = ({page}) => {

  const [state,setState]=useState(true);

let router=useRouter();
 const { data, error, isLoading, isReachedEnd, mutate, size, setSize } = usePaginationNF(state);
let obj={};

if(page !="main"){
  obj.scrollableTarget=`scrollableDiv`
}


  return (
    <>
          <div className="px-[1.5rem] flex items-center justify-between border-b-[1px] border-[#d4dee2] pb-[0.5rem] pt-[1.2rem]">
      <h2 className="text-[2.3rem] font-bold">Notifications</h2>
      {/* {page!="main"?<h2 className="text-[2rem] font-medium text-[#3e8ef0] pr-[1rem] cursor-pointer" onClick={()=>{router.push("/notification")}}>See All</h2>:""} */}
      </div>
      <div className="flex space-x-[1rem] mt-[1rem]  items-center ml-[1.5rem] mb-[0.5rem]">
        <h2 onClick={()=>setState(true)} className={`font-['DynaPuff'] text-[1.7rem] font-medium cursor-pointer py-[0.7rem] px-[2rem] w-fit ${state?"bg-[#E7F3FF] text-[#3e8ef0] rounded-[2rem]":""}`}>All</h2>
        <h2 onClick={()=>setState(false)} className={`font-['DynaPuff'] text-[1.7rem] font-medium cursor-pointer py-[0.7rem] px-[2rem] w-fit ${!state?"bg-[#E7F3FF] text-[#3e8ef0]  rounded-[2rem]":""}`}>Unread</h2>
      </div>



        <InfiniteScroll 
        next={()=>{console.log("alling") 
        setSize(size+1)}}
        hasMore={!isReachedEnd}

        loader={<PuffLoader
          color={"#30DCBA"}
          loading={true}
          cssOverride={{ marginBottom: "20px" ,marginLeft:"15rem" ,marginTop:"2rem"}}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />}
        
        {...obj}

        endMessage={<p className="text-[2.2rem] text-center py-[0.5rem] font-[Inconsolata] font-medium text-[#5f6668]">
          { error?"Something went wrong": data?.length?"Reached to the end":"Nothing to show"}</p>}
        dataLength={data?.length ?? 0}
        >
        {data?.map((data,index)=>{

          return(
            <Link href={`/notification/${data?._id}?status=${data?.status}`}  key={index}>
               <a>
                <Individual key={index} index={1} data={data}/></a></Link>)
        })}
      </InfiniteScroll>

      </>  )
}

export default Notification
