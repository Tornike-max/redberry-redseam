import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

type PriceFilter = {
  priceFrom: string;
  priceTo: string;
}

const FilterDropDownForm = ({setFilterDropdownOpen,filterDropdownOpen}:{setFilterDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>,filterDropdownOpen: boolean}) => {
    const [searchParams,setSearchParams ] = useSearchParams()

    const {register, handleSubmit, formState: { errors }, } = useForm<PriceFilter>({
        defaultValues: {
          priceFrom: searchParams.get("price_from") || "",
          priceTo: searchParams.get("price_to") || ""
        }
      });

    const onSubmit = (data: PriceFilter) => {
        if(searchParams.get('page')){
        searchParams.delete('page')
        }
        const newParams = new URLSearchParams(searchParams); 
        newParams.set("price_from", data.priceFrom);
        newParams.set("price_to", data.priceTo);

        setSearchParams(newParams);  
        setFilterDropdownOpen(false);
  };
  return (
    <>
        {filterDropdownOpen && (
            <form onSubmit={handleSubmit(onSubmit)} className="absolute right-0 top-[30px] bg-white shadow-lg rounded-xl p-[16px] min-w-[392px] z-50">
              <h2 className="text-[16px] font-[600] leading-[100%] text-[#10151F]">
                Select Price
              </h2>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-[400] text-[#3E424A] hidden">
                    Price from
                  </label>
                  <input
                    type="number"
                    placeholder="From"
                    {...register("priceFrom",{
                      validate: value => value === "" || (parseFloat(value) < parseFloat((document.querySelector('input[name="priceTo"]') as HTMLInputElement)?.value || "Infinity")) || "Price from must be less than Price to"
                    })}
                    className="border rounded-md px-3 py-2 text-[14px] border-[#E1DFE1] focus:outline-none focus:ring-2 focus:ring-[#FF4000]"
                  />
                  {errors.priceFrom && <span className="text-red-500 text-sm">{errors.priceFrom.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[14px] font-[400] text-[#3E424A] hidden">
                    Price to
                  </label>
                  <input
                    type="number"
                    placeholder="To"
                    {...register("priceTo",{
                      validate: value => value === "" || (parseFloat(value) > parseFloat((document.querySelector('input[name="priceFrom"]') as HTMLInputElement)?.value || "0")) || "Price to must be greater than Price from"
                    })}
                    className="border rounded-md px-3 py-2 text-[14px] border-[#E1DFE1] focus:outline-none focus:ring-2 focus:ring-[#FF4000]"
                  />
                  {errors.priceTo && <span className="text-red-500 text-sm">{errors.priceTo.message}</span>}
                </div>

              </div>
              <div className='w-full flex justify-end items-center'>
                <button
                  type='submit'
                  className="mt-2 bg-[#FF4000] text-[14px] w-[124px] h-[41px] text-white py-2 rounded-[10px] hover:bg-[#e63a00] transition"
                >
                  Apply
                </button>
              </div>
            </form>
          )}
    </>
  )
}

export default FilterDropDownForm