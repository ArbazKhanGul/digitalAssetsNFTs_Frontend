import { MdFilterList } from "react-icons/md"
import Binance from 'binance-api-node'
import getDataRoute from "../../utils/getDataRoute";
import useValidate from "../../utils/useValidate";
import {fetcherCollection} from "../../utils/fetcher"
import {
    useEffect, Navbar, Pagination, Footer, useState,
    useRouter, getServerSideProps, PuffLoader,ToastContainer, Card, ethers,useSWR,CollectionFilter as Filter
} from "../../components"
import Image from "next/image";

const Collection = ({ userinfo }) => {


    const [dollar, setDollar] = useState(0);

    const BNBPrice = async () => {
      try {
  
        const client = Binance()
        let ticker = await client.prices({ symbol: 'BNBUSDT' });
        setDollar(ticker?.BNBUSDT); 
      }
      catch (error) {
        console.log(error)
      }
    }


    const router = useRouter();
    let {route,paramid}=getDataRoute(router,"getcollection");
    const { data, error,isLoading } = useSWR(route, fetcherCollection);
    const [showItems, show] = useState(false);


    const [loading, user, address] = useValidate(userinfo, "main");

  
  
    useEffect(() => {
        if (data?.user?.length != 0) {
          BNBPrice();
        }
      }, [data])
  
  

    return <>


        {!loading ? (
            <div className="text-[1.6rem] font-['Inconsolata']">
                <ToastContainer pauseOnHover autoClose={5000} />
            </div>
        ) : (
            <>
                <Navbar></Navbar>


                <div className="px-[2rem]  sm:px-[4rem] md:px-[4.9rem] ">
                <div className="flex justify-between w-[100%] items-center flex-wrap flex-col xs:flex-row mb-[1rem]">
    <div className=" w-fit text-[3rem] font-bold  bord-bottom  flex justify-center mt-[2rem]"> 

<div className="text-[#121212] w-fit "> All Profiles</div>

    <div className=" inline-block w-[3.5rem] h-[4rem] sm:w-[3.2rem] md:w-[4rem] mt-[0.6rem] ml-[0.5rem] sm:h-[3.2rem] md:h-[4rem] rounded-full relative">
      <Image
        className="rounded-full"
        src={`/profilepic.png`}
        layout="fill"
      //   objectFit="cover"
      /></div>
  </div>

  <div className="cursor-pointer text-[1.8rem] mt-[2rem] font-semibold text-[#000000c7] flex items-center " onClick={()=>{show((prevState)=>{
    return prevState?false:true;
  })}}>Search Profiles By filters <MdFilterList className="text-[2.3rem] pl-[0.3rem]"></MdFilterList>
        </div>
        </div>
                    <Filter showItems={showItems}></Filter>



                    <div>
                        <div className=" flex  collectionJustification flex-wrap minheight mb-[3rem]">

                        {
            isLoading ?
             ( <div className="flex w-[100%] h-[100%] justify-center ">

            <PuffLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "20px" }}
              size={160}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>)
           :null }

                            {error ? (<div className="text-[red]  font-bold text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['Inconsolata']  mt-[0.5rem]">
                                Error in getting Collections Please try later!</div>) : ""
                            }

                            {
                                (!error && data) ?

                                    data?.user.map((data, index) => {
                                        return <Card key={index} data={data} priceDollar={(ethers.utils.formatUnits(data?.volume.toLocaleString('fullwide', {useGrouping:false}), 18) * dollar).toFixed(2)}/>


                                    }) : ""
                            }

{data?.user?.length==0 && !error? (<div className="text-[#cbcdcf]  text-[1.7rem] w-[100%] flex justify-center sm:text-[2rem] md:text-[3.3rem]  font-['Inconsolata'] mt-[1.5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                            }
                        </div>
                    </div>
                    {
                        data?.count > 9 && paramid * 9 < data?.count + 9 ? <Pagination url={"collection"} count={data?.count} pageShow={paramid} div={9} /> : ""
                    }
                    <div>


                    </div>
                </div>
                <Footer></Footer>

            </>
        )}
    </>
}

export default Collection;


export { getServerSideProps }