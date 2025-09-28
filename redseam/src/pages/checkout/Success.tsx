import { HiXMark } from "react-icons/hi2"
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const Success = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-center items-center pt-[72px] px-[100px] flex-col">
        <div className="w-full flex justify-end items-center">
          <HiXMark className="text-4xl cursor-pointer" onClick={()=>navigate("/")}/>
        </div>
        <div className="w-[233px] h-[216px] flex flex-col justify-center items-center gap-[40px] mt-[44px]">
          <div className="w-[72px] h-[72px] rounded-full bg-[#F8F6F7] flex items-center justify-center">
            <FaCheck className="text-5xl text-[#318A1D]"/>
          </div>
          <div className="flex flex-col gap-[16px] justify-center items-center">
            <h1 className="text-[42px] font-[600] text-[#10151F]">Congrats</h1>
            <p className="text-[14px] text-[#3E424A] font-[400]">Your order is placed successfully!</p>
          </div>
        </div>
        <button onClick={()=>navigate("/")} className="w-[214px] h-[41px] bg-[#FF4000] rounded-[10px] flex items-center justify-center text-[14px] font-[400] text-white mt-[84px] cursor-pointer">
          Continue shopping
        </button>
    </div>
  )
}

export default Success