import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/requests";

export const useGetProduct = (id:string)=>{
    const { data:product, isPending } = useQuery({
        queryFn: ()=> getProductById(id),
        queryKey: ["product", id],
    })

    return {product, isPending};
}