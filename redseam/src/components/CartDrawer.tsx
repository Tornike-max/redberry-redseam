import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { HiMinus, HiPlus, HiXMark } from "react-icons/hi2";
import { DELIVERY_PRICE } from "../constants/constants";
import { useGetCartProduct } from "../hooks/useGetCartProducts";
import { useUpdateToCart } from "../hooks/useUpdateCart";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({
    cartDrawerOpen,
    setCartDrawerOpen,
}: {
    cartDrawerOpen: boolean;
    setCartDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { cartData, isCartPending } = useGetCartProduct();
    const { updateCart } = useUpdateToCart()
    const { deleteCartItem, isDeleting } = useDeleteCartItem();
    const navigate = useNavigate();
    const handleQuantityChange = (id: number, color: string, size: string, type: "inc" | "dec") => {
        if (!cartData) return;

        const item = cartData.find(
            (i: { id: number; color: string; size: string; }) => i.id === id && i.color === color && i.size === size
        );
        if (!item) return;

        const newQty = type === "inc" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);

        updateCart({ product_id: id, quantity: newQty, color: color, size: size });
    };


    if (isCartPending) return <div>Loading...</div>;


    const subtotal = cartData.reduce(
        (acc: number, item: { price: number; quantity: number }) =>
            acc + item.price * item.quantity,
        0
    );

    const totalPrice = subtotal + DELIVERY_PRICE;

    return (
        <Drawer
            anchor="right"
            open={cartDrawerOpen}
            onClose={() => setCartDrawerOpen(false)}
        >
            <Box sx={{ width: 540, p: 2 }} role="presentation">
                <div className="w-full flex flex-col justify-center items-center p-[41px]">
                    <div className="w-full flex justify-between items-center">
                        <h2 className="font-[500] text-[#10151F] text-[20px]">
                            Shopping Cart ({cartData.length})
                        </h2>
                        <button
                            onClick={() => setCartDrawerOpen(false)}
                            className="text-[30px] font-[500]"
                        >
                            <HiXMark />
                        </button>
                    </div>

                    {cartData.length === 0 ? (
                        <div className="w-full flex justify-center items-center mt-[174px] flex-col">
                            <img src="/icons/shoppingIcon.png" alt="cartIcon" className="w-[120px] h-[97px]" />
                            <h2 className="font-[600] text-[#10151F] text-[24px] mt-[24px]">Ooops!</h2>
                            <p className="font-[400] text-[#3E424A] text-[14px] mt-[10px]">You’ve got nothing in your cart just yet...</p>
                            <button onClick={()=>{
                                setCartDrawerOpen(false)
                                navigate("/")
                            }} className="w-[214px] h-[41px] mt-[58px] bg-[#FF4000] rounded-[10px] flex justify-center items-center text-white text-[14px] font-[400] hover:shadow-md cursor-pointer">
                                Start shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="w-full flex flex-col justify-center items-center mt-[63px] gap-[36px]">
                                {cartData?.map((item: {
                                    available_colors: string[];
                                    images: string[]; id: number; name: string; cover_image: string; price: string | number; color: string; size: string; quantity: number; 
                                        }, i: number) => (
                                    <div
                                        key={i}
                                        className="w-[460px] flex justify-between items-center gap-[17px]"
                                    >
                                        <img
                                            src={
                                                item.images[
                                                item.available_colors.findIndex((c: string) => c === item.color)
                                                ]
                                            }
                                            alt={item.name}
                                            className="w-[120px] h-[134px] object-contain border-[1px] border-[#E1DFE1] rounded-[10px]"
                                            />
                                        <div className="w-[343px] flex flex-col justify-start items-start gap-[8px]">
                                            <div className="w-full flex justify-between items-center">
                                                <h2 className="font-[500] text-[#10151F] text-[14px]">
                                                    {item.name}
                                                </h2>
                                                <h2 className="font-[500] text-[#10151F] text-[18px]">
                                                    ₾{item.price}
                                                </h2>
                                            </div>
                                            <p className="text-[12px] text-[#3E424A]">{item.color}</p>
                                            <p className="text-[12px] text-[#3E424A]">{item.size}</p>

                                            <div className="w-full flex justify-between items-center">
                                                <div className="w-[70px] h-[26px] border border-[#E1DFE1] rounded-[10px] flex justify-center items-center gap-[4px]">
                                                    <button onClick={() => handleQuantityChange(item.id, item.color, item.size, "dec")}>
                                                        <HiMinus />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => handleQuantityChange(item.id, item.color, item.size, "inc")}>
                                                        <HiPlus />
                                                    </button>
                                                </div>
                                                <button onClick={() => {
                                                    deleteCartItem({ product_id: item.id, color: item.color, size: item.size })
                                                }} className="text-[#3E424A] text-[12px] font-[400] cursor-pointer">
                                                    {isDeleting ? "Deleting..." : "Remove"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price summary */}
                            <div className="mt-[60px] flex flex-col justify-center items-center gap-[16px]">
                                <div className="w-[460px] flex justify-between items-center">
                                    <h2 className="text-[16px] font-[400]">Items subtotal</h2>
                                    <h2 className="text-[16px] font-[400]">₾ {subtotal}</h2>
                                </div>
                                <div className="w-[460px] flex justify-between items-center">
                                    <h2 className="text-[16px] font-[400]">Delivery</h2>
                                    <h2 className="text-[16px] font-[400]">₾ {DELIVERY_PRICE}</h2>
                                </div>
                                <div className="w-[460px] flex justify-between items-center">
                                    <h2 className="text-[20px] font-[500]">Total</h2>
                                    <h2 className="text-[20px] font-[500]">₾ {totalPrice}</h2>
                                </div>
                            </div>

                            <button onClick={()=>{
                                setCartDrawerOpen(false);
                                navigate("/checkout")
                            }} className="w-[460px] h-[59px] mt-[40px] bg-[#FF4000] rounded-[10px] flex justify-center items-center text-white text-[18px] font-[500] hover:shadow-md">
                                Checkout
                            </button>
                        </>
                    )}
                </div>
            </Box>
        </Drawer>
    );
}
