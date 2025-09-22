import { Link, useNavigate } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed w-full h-[80px] flex items-center justify-between z-50 py-[28px] px-[100px]">
      <div className="flex justify-start items-center gap-1">
        <img
          onClick={() => navigate("/")}
          src={"/logo/Vector.png"}
          alt="Logo"
          className="w-[19.5px] h-[21px] cursor-pointer"
        />
        <span className='font-[600] text-[16px] leading-[100%] text-[#10151F]'>RedSeam Clothing</span>
      </div>
      <div className="flex justify-center items-center gap-1">
        <HiUser />
        <Link to={'/login'} className='text-[#10151F] text-[12px] font-[500] font-poppins'>Log in</Link>
      </div>
    </header>
  )
}

export default Header