import { useState, useEffect, useRef } from "react";
import type { UseFormSetValue } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";

const QuantityDropdown = ({
  quantity,
  setValue,
}: {
  quantity: number;
  setValue: UseFormSetValue<{
    color: string;
    size: string;
    quantity: number;
  }>;
}) => {
  const [options, setOptions] = useState<number[]>([]);
  const [selected, setSelected] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quantity > 0) {
      const arr = Array.from({ length: quantity }, (_, i) => i + 1);
      setOptions(arr);
    }
  }, [quantity]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[382px] flex flex-col mt-[42px] gap-[16px]" ref={dropdownRef}>
      <h2>Quantity</h2>
      <div className="relative w-[70px] h-[42px]">
        <div
          className="border border-[#E1DFE1] rounded-[10px] px-3 py-2 cursor-pointer flex items-center justify-center gap-[8px]"
          onClick={() => setOpen(!open)}
        >
          {selected}
          <IoIosArrowDown className={`cursor-pointer transition-transform ${open ? "rotate-180" : ""}`} />
        </div>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-[#E1DFE1] rounded-[10px] shadow-lg flex flex-col max-h-60 overflow-y-auto">
            {options.map((num) => (
              <button
                key={num}
                className="w-full text-start px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelected(num);
                  setValue("quantity", num);
                  setOpen(false);
                }}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantityDropdown;
