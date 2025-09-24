import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io"

const Index = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="w-full flex justify-center items-center pt-[72px] px-[100px]">
            <div className="w-full flex justify-between items-center">
                <h1 className="font-[600] text-[42px] leading-[100%] text-[#10151F]">Products</h1>

                {/*filter div  */}
                <div className="max-w-[404px] w-full flex justify-center items-center gap-[32px]">
                    <p className="text-[12px] text-[#3E424A] font-[400] leading-[100%]">Showing 1–10 of 100 results</p>
                    <div className="h-[14px] w-[1px] bg-[#E1DFE1]"></div>
                    <img src="/icons/filter.png" alt="filter" className="object-cover cursor-pointer w-[16.5px] h-[15px]" />
                    <div className="flex items-center gap-[4px] cursor-pointer relative">
                        <p className="text-[14px] font-[400] leading-[100%] text-[#10151F]">Sort by</p>
                        <IoIosArrowDown
                            className={`cursor-pointer transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                        {dropdownOpen && (
                        <div className="absolute right-0 top-[50px] bg-white shadow-lg rounded-xl p-2 min-w-[120px]">
                            <button
                            onClick={()=>{}}
                            className="w-full text-left text-sm px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                            >
                                SortBy Desc
                            </button>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index