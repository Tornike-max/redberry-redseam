import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';

const ProductHeaderFilter = () => {
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
        <div className="w-full flex justify-between items-center">
            <h1 className="font-[600] text-[42px] leading-[100%] text-[#10151F]">Products</h1>

            <div className="max-w-[404px] w-full flex justify-center items-center gap-[32px]">
                <p className="text-[12px] text-[#3E424A] font-[400] leading-[100%]">Showing 1–10 of 100 results</p>
                <div className="h-[14px] w-[1px] bg-[#E1DFE1]"></div>
                <img src="/icons/filter.png" alt="filter" className="object-cover cursor-pointer w-[16.5px] h-[15px]" />
                <div className="flex items-center gap-[4px] cursor-pointer relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className='flex items-center justify-center gap-1 cursor-pointer'>
                        <p className="text-[14px] font-[400] leading-[100%] text-[#10151F]">Sort by</p>
                        <IoIosArrowDown
                            className={`cursor-pointer transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                    
                    {dropdownOpen && (
                        <div className="absolute right-0 top-[50px] bg-white shadow-lg rounded-xl p-[16px] min-w-[223px] z-50">
                            <h2 className='text-[16px] font-[600] leading-[100%] text-[#10151F]'>Sort by</h2>
                            <button
                                onClick={() => { }}
                                className="w-full text-start text-[16px] font-[400] leading-[100%] py-2 cursor-pointer mt-[8px]"
                            >
                                New product first
                            </button>
                            <button
                                onClick={() => { }}
                                className="w-full text-start text-[16px] font-[400] leading-[100%] py-2 cursor-pointer"
                            >
                                Price, low to high
                            </button>
                            <button
                                onClick={() => { }}
                                className="w-full text-start text-[16px] font-[400] leading-[100%] py-2 cursor-pointer"
                            >
                                Price, high to low
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductHeaderFilter