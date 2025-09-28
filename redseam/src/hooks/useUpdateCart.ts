import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartApi } from "../api/requests";

export const useUpdateToCart = () => {
    const queryClient = useQueryClient();
    const { mutate: updateCart, isPending } = useMutation({
        mutationFn: ({quantity,product_id,color,size}:{product_id:number,quantity:number,color:string,size:string}) => updateCartApi(quantity,product_id,color,size),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product",'cart'] });
        },
        onError: () => {
            throw new Error("Failed to update the cart");
        },
    });

    return { updateCart, isPending };
};
