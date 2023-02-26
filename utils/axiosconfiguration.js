import axios from "axios";

const API=axios.create({
    baseURL: process.env.SERVER_URL,
    withCredentials: true,
    crossDomain: true,
})

export default API;