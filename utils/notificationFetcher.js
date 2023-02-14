import axios from "./axiosconfiguration";

const notificationFetcher = async (url, options) => {
    console.log("🚀 ~ file: notificationFetcher.js:4 ~ notificationFetcher ~ url", url)
    // console.log("Fetcher ",fetcher)
    // try{
     let response= await axios.get(url)
     return response?.data?.notifications;
    // }
    // catch(error)
    // {

        // return [];
    // }

}
  

export default notificationFetcher;