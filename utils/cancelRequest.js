
import { toast } from "react-toastify";
import axios from "./axiosconfiguration";

const CancelCopyRight =async (nftid,setLoader,setShowModal,setCopyrightStatus,setCopyrightPrice) => {

    try{

        setLoader(true);
        setShowModal(false);
        
        const back_res = await axios.post("/copyrightcancel", {
            id: nftid,
        });

        console.log("🚀 ~ file: copyrights.js:13 ~ CopyRight ~ back_res:", back_res)

        toast.success("Copyright request submitted successfully" , {
            position: "top-center",
          });
          setCopyrightStatus("notallowed");
          setCopyrightPrice(0);
          setLoader(false);

        }
        catch (err) {
            console.log("🚀 ~ file: cancelRequest.js:29 ~ CancelCopyRight ~ err:", err)
            setLoader(false);
       toast.error( "Something went wrong please try dlater" , {
                    position: "top-center",
                  });
        }
}
export default CancelCopyRight;
