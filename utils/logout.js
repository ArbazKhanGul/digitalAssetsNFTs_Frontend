import {addUser } from "../slice/user";
import api from "./axiosconfiguration"

const logout=async (dispatch,router) => {
    try{
        
        await api.get("/logout");
        console.log("success request")
        dispatch(addUser(undefined))
        router.push("/");
    }
    catch(error){
        console.log(error);
    }

}

export default logout;