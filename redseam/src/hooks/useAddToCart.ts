import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart as addToCartApi } from "../api/requests";

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const { mutate: addToCart, isPending } = useMutation({
        mutationFn: (data: {
            product_id: number;
            color: string;
            size: string;
            quantity: number;
        }) => addToCartApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product",'cart'] });
        },
        onError: () => {
            throw new Error("Failed to store in cart");
        },
    });

    return { addToCart, isPending };
};
