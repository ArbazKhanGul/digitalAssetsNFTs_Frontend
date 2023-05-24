
import { toast } from "react-toastify";
import axios from "./axiosconfiguration";

const CancelCopyRight =async (id,setLoader,setShowModal,nftid,router) => {
console.log("🚀 ~ file: deleteCopyright.js:6 ~ CancelCopyRight ~ id:", id)

    try{

        setLoader(true);
        setShowModal(false);

        const back_res = await axios.delete(`/copyrightdelete/${id}`);

        console.log("🚀 ~ file: copyrights.js:13 ~ CopyRight ~ back_res:", back_res)

         router.push(`/individualnft/${nftid}`);
          setLoader(false);

        }
        catch (err) {
            console.log("🚀 ~ file: cancelRequest.js:29 ~ CancelCopyRight ~ err:", err)
            setLoader(false);
       toast.error( "Something went wrong please try later" , {
                    position: "top-center",
                  });
        }
}
export default CancelCopyRight;
