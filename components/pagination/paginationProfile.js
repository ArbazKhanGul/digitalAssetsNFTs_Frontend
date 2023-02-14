import ReactPaginate from 'react-paginate';
import { useEffect, useState,axios,useRouter } from '../';
import {memo} from "react";


function Pagination ({count,pageShow,setPageIndex}) {
console.log("🚀 ~ file: paginationProfile.js:7 ~ Pagination ~ count", count)

  let pageCount=parseInt((count-1)/8);
  console.log("🚀 ~ file: paginationProfile.js:10 ~ Pagination ~ pageCount", pageCount)
  let router=useRouter();


    const [marginPage, setmarginPage] = useState(1);




useEffect(()=>{
if(window.innerWidth<=600){
  
setmarginPage(()=>(0))
}

},[])


  
    const handlePageClick =async (event) => {
   
       let param=event.selected
       console.log("🚀 ~ file: paginationProfile.js:43 ~ handlePageClick ~ param", param)
         setPageIndex(param)
    };
  
    return (
      <>
        <ReactPaginate
          
          breakLabel="..."
          nextLabel=">"
          forcePage={pageShow-1}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={marginPage}
          pageCount={pageCount+1}
          previousLabel="<"
          renderOnZeroPageCount={null}
          breakClassName='page_num'
          containerClassName="pagination"
          pageLinkClassName='page_num'
          previousLinkClassName='page_num'
          nextLinkClassName='page_num'
          activeLinkClassName='active'
        />
      </>
    );
  }

  export default memo(Pagination);