import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
export default function Pagination () {

  let items=[{nftname:"NFT name",creator:"arbazkhangul123@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2202  24:33:12",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},
    {nftname:"NFT name",creator:"arbazkhangul123@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2202  24:33:12",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},
]
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
     const itemsPerPage=8;

     useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    const handlePageClick = (event) => {
      console.log(event)
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={0}
          pageCount={2000}
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