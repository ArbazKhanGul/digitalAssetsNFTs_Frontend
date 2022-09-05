
import IndividualCollections from "./IndividualCollection"
const TopCollections=()=>{


let temp=[{collectionname:"Collection1",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection2",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection3",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection4",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection5",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection6",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection7",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection8",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection9",volume:100,price:123,image:"/col.jpeg"}]

    return (
        <div>
    <div className="color w-fit text-[2.7rem] ml-[2rem] font-['DynaPuff'] sm:text-[3rem] md:text-[3.7rem]  m-[1.2rem] sm:ml-[3.5rem] md:ml-[5rem]">
    Top Collections :
    </div>

    <div className="space-y-[2rem] flex-col justify-center">
        <div className="  hidden sm:flex justify-around items-center ml-[5.3rem]">
        

            <div className="ml-[4rem] text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] w-fit colgrad">Collections</div>
            <div className="ml-[9.5rem] text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] w-fit colgrad">Volume (USD)</div>
            <div className="text-[2.3rem] sm:text-[2rem] md:text-[2.3rem] w-fit colgrad">Floor Price (USD)</div>
        </div>
        {temp.map((value,index)=>{
            return(<IndividualCollections key={index} num={index+1} collectionname={value.collectionname} volume={value.volume} price={value.price} image={value.image}></IndividualCollections>)
        })

}
    </div>

    </div>
    )
}

export default TopCollections;