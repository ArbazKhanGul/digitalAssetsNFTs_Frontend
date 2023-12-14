import ClipLoader from "react-spinners/ClipLoader"
import { useState, useRouter } from "../"
import { AiOutlineClose } from "react-icons/ai";
import deleteNotification from "../../utils/deleteNotification";

function Delete({ id }) {

  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  let router = useRouter();

  return (
    <>
      <button
        className="bg-[#1b31c4] hover:bg-[#182ba8]  w-[100%] xs:w-fit py-4 xs:py-3 rounded-[1.3rem] xs:rounded-full    text-white font-normal text-[1.72rem] sm:font-semibold  px-[4rem]   tracking-wider"
        type="button"
        onClick={() => { setShowModal(true) }}
        disabled={loader}
      >
        Delete 
      </button>


    


      


      {showModal ? (
        <>
          <div className="px-[13px] justify-center items-center flex overflow-x-hidden h-fit fixed inset-0 z-50 outline-none focus:outline-none top-[15%]">
            <div className="relative  my-6 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">

              <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="bg-[#1E2346] rounded-t-[1rem] flex items-start justify-between py-5 px-[2rem] border-b border-solid border-slate-200">
                  <h3 className="text-[2rem] text-[white] font-semibold">

                    Delete Notificaition

                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                   disabled={loader=="waiting"}
                    onClick={() => {
                      setShowModal(false)
                      setLoader(false)
                    }}
                  >

                    <AiOutlineClose className="text-[red] text-[2.2rem]"></AiOutlineClose>

                    {/* <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span> */}
                  </button>
                </div>
                {/*body*/}
             
              {!loader ?
               <div>
                <div className={"relative pb-6 flex-auto"}>
                  <div>
                    <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.5rem] ">
                      <h2 className="font-['Inconsolata'] text-[#0D1344E5']  text-[1.8rem] font-medium ml-[0.3rem] mb-[0.4rem] tracking-wider">
                        Are you sure to delete this notification?
                      </h2>
                    </div>


                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem]   text-white font-normal text-[1.7rem] sm:font-semibold py-3 px-[3rem] rounded-full  tracking-wider"
                    type="button"
                    onClick={() => deleteNotification(id, router,setLoader,setShowModal)}
                  >
                    Confirm
                  </button>

      
                </div>

                </div>:
                    <div className="flex justify-center  mt-[2rem]">

                      <ClipLoader
                        color={"#30DCBA"}
                        // loading={loader}
                        cssOverride={{ marginBottom: "20px" }}
                        size={140}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>

              }

              </div>

            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


    </>
  )
}

export default Delete;
