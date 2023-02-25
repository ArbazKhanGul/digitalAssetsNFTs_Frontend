import useSWRInfinite from 'swr/infinite'
import notificationFetcher from "./notificationFetcher"


function usePaginationNF(state) {
// console.log("🚀 ~ file: usePaginationNF.js:6 ~ usePaginationNF ~ state", state)


    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null // reached the end
        return `/notification?skip=${pageIndex * 12}&state=${state}`
      }

     const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(getKey,notificationFetcher)

     const paginatedNotifcations=data?.flat() //convert 2D array to 1D

     const isReachedEnd=data && data[data.length-1]?.length < 12;


  return { data:paginatedNotifcations, error, isLoading,isReachedEnd, mutate, size, setSize }

}

export default usePaginationNF