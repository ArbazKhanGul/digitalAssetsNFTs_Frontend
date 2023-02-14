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
  return {nft,ownerId};
}