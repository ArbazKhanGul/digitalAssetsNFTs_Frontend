import Individualtransaction from "./individualtransaction";


const AllTransactions=({allTransactions})=>{


   return (
        <div className="overflow-x-auto  pb-[1.3rem] mx-[5rem] mt-[2rem] mb-[2rem]">
            <div className="flex w-fit  font-semibold bg-[#21265a] text-white rounded-lg">
               <h2 className="transRowHeader"> Type</h2>
               <h2 className="transRowHeader">NFT Name</h2>
               <h2 className="transRowHeader">Owner</h2>
               <h2 className="transRowHeader">Token Id</h2>
               <h2 className="transRowHeader">Original</h2>
               <h2 className="transRowHeader">Buyer</h2>
               <h2 className="transRowHeader">Price</h2>
               <h2 className="transRowHeader">Time</h2>
            </div>


                        {  allTransactions && allTransactions.map((data, index) => {
                                      return <Individualtransaction data={data}  key={index} index={index} />
                                    })
                            }
        </div>
    )
}

export default AllTransactions;