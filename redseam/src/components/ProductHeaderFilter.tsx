import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import FilterDropDownForm from './FilterDropDownForm';
import SortDropDownForm from './SortDropDownForm';



const ProductHeaderFilter = ({ from, to, total }: { from: number, to: number, total: number }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="font-[600] text-[42px] leading-[100%] text-[#10151F]">Products</h1>

      <div className="max-w-[404px] w-full flex justify-center items-center gap-[32px]">
        <p className="text-[12px] text-[#3E424A] font-[400] leading-[100%]">Showing {from}–{to} of {total} results</p>
        <div className="h-[14px] w-[1px] bg-[#E1DFE1]"></div>
        <div className="relative" ref={filterRef}>
          <img
            src="/icons/filter.png"
            alt="filter"
            className="object-cover cursor-pointer w-[16.5px] h-[15px]"
            onClick={() => {
              setFilterDropdownOpen(!filterDropdownOpen)
              if (dropdownOpen) setDropdownOpen(false)

            }}
          />

          <FilterDropDownForm setFilterDropdownOpen={setFilterDropdownOpen} filterDropdownOpen={filterDropdownOpen}/>
        </div>

        <div className="flex items-center gap-[4px] cursor-pointer relative">
          <button onClick={() => {
            setDropdownOpen(!dropdownOpen)
            if (filterDropdownOpen) setFilterDropdownOpen(false)
          }} className='flex items-center justify-center gap-1 cursor-pointer'>
            <p className="text-[14px] font-[400] leading-[100%] text-[#10151F]">Sort by</p>
            <IoIosArrowDown
              className={`cursor-pointer transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          <SortDropDownForm dropdownOpen={dropdownOpen} />
        </div>
      </div>
    </div>
  )
}

export default ProductHeaderFilter