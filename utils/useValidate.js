import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import validateUser from "./validatUser"; 
import { selectAddress, addAddress } from "../slice/metamask";
import { selectUser, addUser } from "../slice/user";

const useValidate=(userinfo,page="")=>{


  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const address = useSelector(selectAddress);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(addUser(userinfo))
    },[])


  //validate token
  useEffect(() => {
    validateUser(user,address,dispatch,router,setLoading,page)
  }, [address]);

 return [loading,user,address]

}

export default useValidate;