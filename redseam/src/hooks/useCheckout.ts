import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutCart } from "../api/requests";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkout, isPending } = useMutation({
        mutationFn: (data: {
            name:string;
            surname:string;
            email:string;
            address: string;
            zip_code: string;
        }) => checkoutCart(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product",'cart'] });
            navigate("/success")
        },
        onError: () => {
            throw new Error("Failed to store in cart");
        },
    });

    return { checkout, isPending };
};
