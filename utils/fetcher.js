import axios from "./axiosconfiguration"

const fetcher = async (url, options) => {
    // console.log("Fetcher ",fetcher)
     let response= await axios.get(url)
     let user=response?.data?.user;
     let count=response?.data?.count;


   let  data={user:user,count:count}

     return data;
}


export default fetcher;