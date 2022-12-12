import axios from "axios";

const notificationFetcher = async (url, options) => {
    // console.log("Fetcher ",fetcher)
    // try{
     let response= await axios.get(url)
     return response?.data?.products;
    // }
    // catch(error)
    // {

        // return [];
    // }

}
  

export default notificationFetcher;