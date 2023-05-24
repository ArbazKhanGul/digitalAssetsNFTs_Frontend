
import { toast } from "react-toastify";
import axios from "./axiosconfiguration";

const allowCopyRight =async (nftid,price,setLoader,setShowModal,setCopyrightStatus,setCopyrightPrice) => {
console.log("🚀 ~ file: allowRequest.js:6 ~ allowCopyRight ~ nftid:", nftid)


    try{

        setLoader(true);
        setShowModal(false);

        const back_res = await axios.post("/copyrightallow", {
            id: nftid,
            price:price
        });

        console.log("🚀 ~ file: copyrights.js:13 ~ CopyRight ~ back_res:", back_res)

        toast.success("Copyright requests status updated successfully" , {
            position: "top-center",
          });
          setCopyrightStatus("allowed");
          setCopyrightPrice(price)
          setLoader(false);

        }
        catch (err) {
            console.log("🚀 ~ file: allowRequest.js:32 ~ allowCopyRight ~ err:", err)
            setLoader(false);
       toast.error( "Something went wrong please try later" , {
                    position: "top-center",
                  });
        }
}
export default allowCopyRight;
