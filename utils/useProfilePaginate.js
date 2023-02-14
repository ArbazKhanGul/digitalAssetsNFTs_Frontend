import useSWRInfinite from 'swr/infinite'
import notificationFetcher from "./notificationFetcher"
import { fetcherNft } from "./fetcher";

function usePaginationNF(email) {


    const getKey = (pageIndex, previousPageData) => {
        // console.log("🚀 ~ file: usePaginationNF.js:9 ~ getKey ~ previousPageData", previousPageData)
        console.log("🚀 ~ file: usePaginationNF.js:9 ~ getKey ~ pageIndex", pageIndex)
        if (previousPageData && !previousPageData.length) return null // reached the end
        return `/profilenft/${email}?skip=${pageIndex * 8}`
      }

     const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(getKey,fetcherNft)

     const paginatedNfts=data?.flat() //convert 2D array to 1D

     const isReachedEnd=data && data[data.length-1]?.length < 8;


  return { data:paginatedNfts, error, isLoading,isReachedEnd, mutate, size, setSize }

}

export default usePaginationNF