import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { addAddress } from '../slice/metamask'
// import {selectAddress} from '../slice/metamask'


export const connectWallet = async (dispatch,address) => {


console.log("PRinting adress cheking value ",address);

  // const count = useSelector(selectAddress)
// const dispatch = useDispatch()

    try {
      if (!window.ethereum)
        return toast.warn("Please install MetaMask.", {
          position: "top-center",
        });



        const accountsFirst = await ethereum.request({
          method: "eth_requestAccounts",
        });
         

        
        
      if(accountsFirst.length > 0 && address==undefined)
        {
          console.log("first time account connect ",accountsFirst,address);
           
          dispatch(addAddress(accountsFirst[0])); 
        toast.success("Account Connected", {
            position: "top-center",
          });
        }


        window.ethereum.on('accountsChanged', function (accounts) {
          dispatch(addAddress(accounts[0]));
        })

    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };