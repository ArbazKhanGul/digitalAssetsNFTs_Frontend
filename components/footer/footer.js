
import   {BsFacebook} from "react-icons/bs"
import   {BsInstagram} from "react-icons/bs"
import   {BsTwitter} from "react-icons/bs"

const Footer=()=>{
    const d = new Date();
    let year = d.getFullYear();
    
    return (<div className="navbar mt-[2rem] text-[white] flex justify-between px-[4rem] py-[2rem] items-center footerdirection">

        <div>
            <h2 className="text-[1.4rem] mb-[1rem]">Golden Words NFTs</h2>
            <div className="flex justify-between"><BsFacebook className="text-[blue] text-[2.2rem] bg-[white] rounded-full"></BsFacebook>
            <BsInstagram className="insta text-[2.2rem] text-[white] "></BsInstagram>
            <BsTwitter className="text-[white] bg-[#00ACEE] p-[3.9px] rounded-[10px] text-[2.3rem]"></BsTwitter>
            </div>
        </div>
        <div className="text-[1.4rem]">

            Copyright-{year}
        </div>
        <div className="text-[1.4rem] mb-[0.5rem] flex justify-center flex-col items-center">
            <div>Contact Us</div>
            <div>{process.env.CONTACT}</div>

        </div>
    </div>)
}

export default Footer;