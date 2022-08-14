import Image from "next/image";

const Work=()=>{

return (<>
<div className=" h-fit  xl:h-fit work mt-[2.5rem] flex flex-col lg:flex-row py-[2.5rem] lg:py-[7rem] px-[2.5rem] lg:px-[7rem] items-center justify-between">

<div className="w-[100%] lg:w-[47%]"><h2 className="workhead  text-[2.8rem] sm:text-[3rem] xl:text-[3.8rem] font-bold  font-['Inconsolata'] leading-[3.5rem]">How Golden Words Nfts Work:</h2>
<p className="text-[#f5f1f1] text-[1.9rem] xl:text-[1.8rem] text-justify pt-[1.5rem] font-['Inconsolata']">
Golden Words NFTs is a latest method of creating NFTs, in which one can create NFTs of Golden Words 
(text format) instead of pictures. Moreover, no one can create a copy of any other person's Golden Words
 NFTs. In addition to the aforementioned, there is a strong authentication system and with every 
 NFT collection, a verified email is associated with it which can verify each an 
 every person, so that no one can create NFT on behalf of some other person and use some other person name.
  Because, every person have a unique email on internet and no two persons can have same email addresses, 
 that's why we use this for authentication of person's. Last but the not the least,
  all the data about these NFTs is stored on Blockchain and you can check this by simply visiting 
 all contracts and we hope you will like this new way of creating NFTs and appreciate our work. And you can 
 sell your text also if some one want to buy this and if you create NFT of text and you sell it then on every 
 selling of this text you can 8% from profit and this profit is transferrd automatically to your account. 
</p>
</div>
<div className="w-[100%] lg:w-[46%] xl:w-[42.5%] 2xl:w-[43.5%] sm:hidden lg:block relative">
<div className=" w-[100%] resheight mt-[2.5rem] sm:mt-[6.8rem] object-cover rounded-2xl  lg:w-[47rem] lg:h-[31rem]  xl:w-[50rem] xl:h-[30rem] 2xl:w-[53rem] 2xxl:h-[32rem]    relative">
  <Image 
  className="rounded-2xl"
  src="/workimage.jpg"
  layout="fill"
  objectFit="cover"
  />
</div>

</div>
</div>
</>)

}

export default Work;