import { Link, useNavigate } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const getUser = localStorage.getItem("auth_user");
  const user = getUser ? JSON.parse(getUser) : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    navigate("/login");
  };

  return (
    <header className="w-full h-[80px] flex items-center justify-between z-50 py-[28px] px-[100px]">
      <Link to={'/'} className="flex justify-start items-center gap-1">
        <img
          onClick={() => navigate("/")}
          src={"/logo/Vector.png"}
          alt="Logo"
          className="w-[19.5px] h-[21px] cursor-pointer"
        />
        <span className='font-[600] text-[16px] leading-[100%] text-[#10151F]'>RedSeam Clothing</span>
      </Link>
      <div className="flex justify-center items-center gap-1 relative">
        {user !== null ? (
          <div className="w-[108px] flex items-center justify-between gap-[10px]" ref={dropdownRef}>
            <FaCartShopping className="text-xl cursor-pointer" />
            <div className='flex items-center gap-2'>
              <img
                src={user.avatar ? user.avatar : "/logo/user.png"}
                alt="User Avatar"
                className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
              />
              <IoIosArrowDown
                className={`cursor-pointer transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 top-[50px] bg-white shadow-lg rounded-xl p-2 min-w-[120px]">
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <HiUser />
            <Link
              to={"/login"}
              className="text-[#10151F] text-[12px] font-[500] font-poppins"
            >
              Log in
            </Link>
          </>
        )}
      </div>

    </header>
  )
}

export default Header