import ReactPaginate from 'react-paginate';
import { useEffect, useState,axios,useRouter } from '../';
import {memo} from "react";


function Pagination ({url,count,pageShow,div}) {

  let pageCount=parseInt((count-1)/div);
  let router=useRouter();


//   let items=[{nftname:"NFT name",creator:"arbazkhangul123@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2202  24:33:12",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},
//     {nftname:"NFT name",creator:"arbazkhangul123@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2202  24:33:12",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},
// ]
    // const [currentItems, setCurrentItems] = useState(null);
    // const [pageCount, setPageCount] = useState(0);
    // const [itemOffset, setItemOffset] = useState(0);
    const [marginPage, setmarginPage] = useState(1);
    //  const itemsPerPage=8;




useEffect(()=>{
if(window.innerWidth<=600){
  
setmarginPage(()=>(0))
}

},[])


    //  useEffect(() => {
    //   const endOffset = itemOffset + itemsPerPage;
    //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    //   setCurrentItems(items.slice(itemOffset, endOffset));
    //   setPageCount(Math.ceil(items.length / itemsPerPage));
    // }, [itemOffset, itemsPerPage]);
  
    const handlePageClick =async (event) => {
   
       let param=event.selected + 1
    
       const result = router.query
       let route = `/${url}/${param}`
    
       var size = Object.keys(result).length;
       if (size > 1 || ( result['id']===undefined && size >0 ) ) {
        
        route = route + '?'

        for (let key in result) {
            if (key !== 'id') {
    
                if (route.charAt(route.length - 1) === '?') {
                    route = route + key + '=' + result[key].trim().toLowerCase();
                }
                else {
                    route = route + '&' + key + '=' + result[key].trim().toLowerCase();
                }
            }
        }
    }
       console.log("🚀 ~ file: index.js ~ line 44 ~ handlePageClick ~ router.query", router.query)
       
       router.push(route)

      // const newOffset = (event.selected * itemsPerPage) % items.length;
      
      // setItemOffset(newOffset);
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