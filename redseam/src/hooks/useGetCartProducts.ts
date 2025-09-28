import { useQuery } from "@tanstack/react-query";
import { getCartProducts } from "../api/requests";

export const useGetCartProduct = ()=>{
    const { data:cartData, isPending:isCartPending } = useQuery({
        queryFn: ()=> getCartProducts(),
        queryKey: ["product",'cart'],
    })

    return {cartData, isCartPending};
}