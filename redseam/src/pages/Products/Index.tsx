import { Link, useSearchParams } from "react-router-dom";
import ProductHeaderFilter from "../../components/ProductHeaderFilter";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1"); 

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [page]);

  const { productsData, isPending } = useGetProducts({ page }); 

  if (isPending) {
    return <Spinner />;
  }

  const changeParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams); 
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const from = (productsData?.meta?.current_page - 1) * 10 + 1;
  const to = Math.min(productsData?.meta?.current_page * 10, productsData?.meta?.total);
  const total = productsData?.meta?.total || 0;
  
  return (
    <div className="w-full flex justify-center items-center pt-[72px] px-[100px] flex-col">
      <ProductHeaderFilter from={from} to={to} total={total}/>
      <div className="w-full grid grid-cols-4 space-x-[24px] space-y-[48px] mt-[32px]">
        {productsData?.data.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="max-w-[412px] w-full h-[614px] rounded-[10px] flex flex-col justify-evenly overflow-hidden group transition-shadow duration-300 cursor-pointer"
          >
            <div className="overflow-hidden relative">
              <img
                src={product.cover_image}
                alt={product.name}
                className="w-full h-[549px] object-cover rounded-[10px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/4 group-hover:bg-black/10 transition-colors duration-300 rounded-[10px]" />
            </div>

            <div className="flex flex-col gap-[3px]">
              <h2 className="font-[500] text-[18px] leading-[100%] text-[#10151F]">
                {product.name}
              </h2>
              <p className="text-[16px] font-[500] leading-[100%] text-[#10151F]">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {productsData?.meta && (
        <div className="w-full flex justify-center items-center mb-[216px]">
          <div className="w-auto flex items-center justify-center gap-[8px]">
            <button
              onClick={() => changeParams("page", String(productsData.meta.current_page - 1))}
              disabled={productsData.meta.current_page === 1}
              className="text-[#10151F] rounded-full cursor-pointer disabled:opacity-50"
            >
              <IoIosArrowBack />
            </button>

            {/* Pages */}
            {Array.from({ length: productsData.meta.last_page }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => changeParams("page", String(pageNum))}
                className={`rounded-[4px] cursor-pointer border-[1px] w-[32px] h-[32px] 
                  ${pageNum === productsData.meta.current_page
                    ? "border-[#FF4000] text-[#FF4000] font-bold"
                    : "border-[#F8F6F7] text-[#212B36] hover:border-[#FF4000] hover:text-[#FF4000]"}
                `}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => changeParams("page", String(productsData.meta.current_page + 1))}
              disabled={productsData.meta.current_page === productsData.meta.last_page}
              className="text-[#10151F] rounded-full cursor-pointer disabled:opacity-50"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
