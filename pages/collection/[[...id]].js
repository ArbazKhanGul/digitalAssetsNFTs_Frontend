import { MdFilterList } from "react-icons/md"
import Filter from "../../components/collection/filter";
import "react-toastify/dist/ReactToastify.css";

import {
    useEffect, Navbar, Pagination, Footer, useState,
    useRouter, validateUser, getServerSideProps, toast, ToastContainer, useSelector,
    useDispatch, selectAddress, addAddress, Card, selectUser, addUser
} from "../../components"

import getDataRoute from "../../utils/getDataRoute";
import useSWR from 'swr'
import useValidate from "../../utils/useValidate";
import {fetcherCollection} from "../../utils/fetcher"

const Collection = ({ userinfo }) => {

    const router = useRouter();
    let {route,paramid}=getDataRoute(router,"getcollection");
    const { data, error } = useSWR(route, fetcherCollection);
    const [showItems, show] = useState(false);


    const [loading, user, address] = useValidate(userinfo, "main");


    // const address = useSelector(selectAddress);
    // const [loading, setLoading] = useState(false);
    // const user = useSelector(selectUser);
    // const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(addUser(userinfo))
    // }, [])


    // useEffect(() => {
    //     validateUser(user, address, dispatch, router, setLoading, "main")
    // }, [address, user]);


    return <>


        {!loading ? (
            <div className="text-[1.6rem] font-['Inconsolata']">
                <ToastContainer pauseOnHover autoClose={5000} />
            </div>
        ) : (
            <>
                <Navbar></Navbar>


                <div className="px-[2rem] mb-[2rem] sm:px-[4rem] md:px-[4.9rem] mt-[1.5rem]">
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-[0.5rem] flex-wrap">
                        <div className="nft text-[2.7rem] sm:text-[3rem] md:text-[3.3rem] w-fit font-['DynaPuff'] mt-[0.5rem]">All Collections</div>
                        <div className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#353846C7] flex items-center font-['Inconsolata']" onClick={() => {
                            show((prevState) => {
                                return prevState ? false : true;
                            })
                        }}>Search Collection By filters <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
                        </div>
                    </div>
                    <Filter showItems={showItems}></Filter>



                    <div>
                        <div className=" flex  collectionJustification flex-wrap minheight mb-[3rem]">



                            {error ? (<div className="nft text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['DynaPuff'] mt-[0.5rem]">
                                Error in getting Collections Please try later</div>) : ""
                            }

                            {
                                (!error && data) ?

                                    data?.user.map((data, index) => {
                                        return <Card key={index} data={data} />


                                    }) : ""
                            }

{data?.user?.length==0 && !error? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem]">
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