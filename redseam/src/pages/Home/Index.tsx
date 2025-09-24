
import ProductHeaderFilter from "../../components/ProductHeaderFilter";
import { useGetProducts } from "../../hooks/useGetProducts";

const Index = () => {
    const {productsData,isPending} = useGetProducts();
    
    if(isPending){
        return <div>Loading...</div>
    }
    console.log(productsData)
    return (
        <div className="w-full flex justify-center items-center pt-[72px] px-[100px] flex-col">
            <ProductHeaderFilter />
            <div className="w-full grid grid-cols-4 gap-[24px] mt-[32px]">
                {productsData?.data.map((product) => (
                    <div key={product.id} className="border max-w-[412px] w-full h-[614px] border-[#E1DFE1] rounded-[10px] p-[15px] flex flex-col justify-between">
                        <img src={product.cover_image} alt={product.name} className="w-full h-[549px] object-cover rounded-[10px]" />
                        <h2 className="font-[500] text-[18px] leading-[100%] text-[#10151F] mt-[12px]">{product.name}</h2>
                        <p className="text-[16px] font-[500] leading-[100%] text-[#10151F] mt-[2px]">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Index