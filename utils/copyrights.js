
import { toast } from "react-toastify";
import axios from "./axiosconfiguration";

const CopyRight =async (nftName,offeredMoney,setLoader,setShowModal,setChecker,mutate,ownerId) => {
   try{

        setLoader(true);
        setShowModal(false);
        setChecker("price")

        const back_res = await axios.post("/requestcopyright", {
            nftName: nftName,
            offeredMoney: offeredMoney,
            ownerId
        });

        console.log("🚀 ~ file: copyrights.js:13 ~ CopyRight ~ back_res:", back_res)

        toast.success("Copyright request submitted successfully" , {
            position: "top-center",
          });
          mutate();
          setLoader(false);
          


        }
        catch (err) {
            setLoader(false);

       toast.error( "Something went wrong please try later" , {
                    position: "top-center",
                  });

        }
}
export default CopyRight;
