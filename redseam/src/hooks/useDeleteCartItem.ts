import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem as deleteCartItemApi } from "../api/requests";

export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();
    const { mutate: deleteCartItem, isPending:isDeleting } = useMutation({
        mutationFn: ({product_id,color,size}:{product_id:number,color:string,size:string}) => deleteCartItemApi(product_id,color,size),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product",'cart'] });
        },
        onError: () => {
            throw new Error("Failed to delete the item from cart");
        },
    });

    return { deleteCartItem, isDeleting };
};
