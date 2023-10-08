import axios from "./axiosconfiguration"

export const fetcherCollection = async (url, options) => {
     let response= await axios.get(url)
     let user=response?.data?.user;
     let count=response?.data?.count;


   let  data={user,count}

     return data;
}

export const fetcherNft = async (url, options) => {

   let response= await axios.get(url)
   let nft=response?.data?.nft;
   let count=response?.data?.count;


 let  data={nft,count}

   return data;
}

export const fetcherHome = async (url, options) => {

  let response= await axios.get(url)
  let nfts=response?.data?.nfts;
  let profiles=response?.data?.profiles;


let  data={nfts,profiles}

  return data;
}

export const fetcherOwnerNft = async (url, options) => {

  let response= await axios.get(url)
  let nft=response?.data?.nft;
  let ownerId=response?.data?.ownerId;
  let transactions=response?.data?.transactions;
  let copyright_status=response?.data?.copyright_status
  let copies=response?.data?.copies
  let copiesCount=response?.data?.copiesCount
  return {nft,ownerId,transactions,copyright_status,copies,copiesCount};
}


export const fetcherCopyrightRequests = async (url, options) => {

  let response= await axios.get(url)
  let requests=response?.data?.data;
  return requests;
}

export const fetcherCount = async (url, options) => {

  console.log("fetcher counter")
  let response= await axios.get(url)
  let count=response?.data?.count;
  console.log("🚀 ~ file: fetcher.js:53 ~ fetcherCount ~ count", count)

  return count;
}





export const fetcherTransactions = async (url, options) => {

  let response= await axios.get(url)
  let transactions=response?.data?.transactions;
  let count=response?.data?.count;


let  data={transactions,count}

  return data;
}