import { useSearchParams } from "react-router-dom";

const SortDropDownForm = ({dropdownOpen}:{dropdownOpen:boolean}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  }
  
  return (
    <>
        {dropdownOpen && (
            <div className="absolute right-0 top-[50px] bg-white shadow-lg rounded-xl p-[16px] min-w-[223px] z-50">
              <h2 className='text-[16px] font-[600] leading-[100%] text-[#10151F]'>Sort by</h2>
              <button
                onClick={(e) => {
                    e.preventDefault();
                    changeParams("sort", "created_at")
                }}
                className="w-full text-start text-[16px] font-[400] leading-[100%] py-2 cursor-pointer mt-[8px]"
              >
                New product first
              </button>
              <button
                onClick={(e) => {
                    e.preventDefault();
                    changeParams("sort", "price")
                }}
                className="w-full text-start text-[16px] font-[400] leading-[100%] py-2 cursor-pointer"
              >
                Price, low to high
              </button>
              <button
                onClick={(e) => {
                    e.preventDefault();
                    changeParams("sort", "-price")
                }}
                className="w-full text-start text-[16px] font-[400] leading-[100%] py-2 cursor-pointer"
              >
                Price, high to low
              </button>
            </div>
          )}
    </>
  )
}

export default SortDropDownForm