
<div className="px-[13px] justify-center items-center  flex overflow-hidden overflow-y-auto my-[5rem] fixed inset-0 z-50 outline-none focus:outline-none">
<div className="relative w-auto my-6 mx-auto max-w-4xl">
  {/*content*/}
  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    {/*header*/}
    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
      <h3 className="text-3xl font-semibold">
    All Copyrights Requests

        </h3>

    </div>
    {/*body*/}
    <div className={"relative pb-6 flex-auto"}>
      <div>
        <div>
          <div className="flex  w-auto    flex-wrap  items-center justify-center">

<div className="max-h-[80%] w-fit">

        <IndividualRequest/>
        <IndividualRequest/>
        <IndividualRequest/>
        <IndividualRequest/>
        <IndividualRequest/>
        <IndividualRequest/>
        <IndividualRequest/>
        <IndividualRequest/>
        {/* <IndividualRequest/> */}

        {/* <IndividualRequest/> */}
        {/* <IndividualRequest/> */}
          </div>
          </div>
        </div>
      </div>
    </div>
    {/*footer*/}
    <div className="flex items-center justify-end p-6 py-[1rem] border-t border-solid border-slate-200 rounded-b">
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-[1.3rem] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {setShowModal(false)
        }}
      >
        Close
      </button>

    </div>
  </div>
</div>
</div>
<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
