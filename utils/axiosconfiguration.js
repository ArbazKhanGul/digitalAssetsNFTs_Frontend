import axios from "axios";

const API=axios.create({
    baseURL: process.env.SERVER_URL
})

export default API;