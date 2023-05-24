import useSWRInfinite from 'swr/infinite'
import { fetcherCopyrightRequests } from "./fetcher";

function useCopyrightPagination(nftName,requester,status) {

    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        return `/copyrightrequests/${nftName}?skip=${pageIndex * 10}&&requester=${requester}&&status=${status}`
      }

     const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(getKey,fetcherCopyrightRequests)

     const paginatedNotifcations=data?.flat() //convert 2D array to 1D

     const isReachedEnd=data && data[data.length-1]?.length < 10;


  return { data:paginatedNotifcations, error, isLoading,isReachedEnd, mutate, size, setSize }

}

export default useCopyrightPagination;