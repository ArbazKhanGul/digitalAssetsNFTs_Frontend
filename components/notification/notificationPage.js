import Individual from './individual'
import usePaginationNF from '../../utils/usePaginationNF';
import Link from 'next/link'
import PuffLoader from "react-spinners/puffLoader";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useRouter} from '../'
import { useEffect } from 'react';

const Notification = ({page}) => {

    let router=useRouter();
    const { data, error, isLoading, isReachedEnd, mutate, size, setSize } = usePaginationNF();


    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
          // SWR mutate function
          mutate()
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange)
        }
      }, [])




  return (
    <>
          <div className=" flex items-center justify-between border-b-[1px] border-[#d4dee2] pb-[0.5rem] pt-[1.2rem]">
      <h2 className="text-[2.3rem] font-bold">Notifications</h2>
      {page!="main"?<h2 className="text-[2rem] font-medium text-[#3e8ef0] pr-[1rem] cursor-pointer" onClick={()=>{router.push("/notification")}}>See All</h2>:""}
      </div>
      <div className="flex space-x-[1rem] mt-[1rem]  items-center ml-[1.5rem] mb-[0.5rem]">
        <h2 className="font-['DynaPuff'] text-[1.7rem] font-medium w-fit">All</h2>
        <h2 className="font-['DynaPuff'] text-[1.7rem] font-medium bg-[#E7F3FF] w-fit text-[#3e8ef0] py-[0.7rem] px-[2rem] rounded-[2rem]">Unread</h2>
       
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
        scrollableTarget="scrollable"

        endMessage={<p className="text-[2.2rem] text-center py-[0.5rem] font-[Inconsolata] font-medium text-[#5f6668]">
          { error?"Something went wrong": data?.length?"Reached to the end":"Nothing to show"}</p>}
        dataLength={data?.length ?? 0}
        >
        {data?.map((data,index)=>{

          return(
            <Link href={`/notification/${data?._id}?status=${data?.status}`}   key={index}>
               <a>
                <Individual key={index} index={1} data={data} /></a></Link>)
                
        })}
      </InfiniteScroll>

      </>  )
}

export default Notification
