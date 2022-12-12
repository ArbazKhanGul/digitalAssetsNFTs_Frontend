import React from 'react'
import useSWRInfinite from 'swr/infinite'
import notificationFetcher from "./notificationFetcher"

function usePaginationNF() {

    
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        return `https://dummyjson.com/products?skip=${pageIndex * 12}&&limit=12`
      }

     const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(getKey,notificationFetcher)

     const paginatedNotifcations=data?.flat() //convert 2D array to 1D

     const isReachedEnd=data && data[data.length-1]?.length < 12;


  return { data:paginatedNotifcations, error, isLoading,isReachedEnd, mutate, size, setSize }

}

export default usePaginationNF