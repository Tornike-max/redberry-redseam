import Spinner from "../../components/Spinner";
import { useGetCartProduct } from "../../hooks/useGetCartProducts"
import type { Product } from "../../types/types";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useDeleteCartItem } from "../../hooks/useDeleteCartItem";
import { useUpdateToCart } from "../../hooks/useUpdateCart";
import { DELIVERY_PRICE } from "../../constants/constants";
import { useForm } from "react-hook-form";
import { useCheckout } from "../../hooks/useCheckout";

type FormValues = {
    name: string;
    surname: string;
    email: string;
    address: string;
    zip_code: string;
};

const Checkout = () => {
    const { cartData, isCartPending } = useGetCartProduct();
    const { deleteCartItem, isDeleting } = useDeleteCartItem();
    const { updateCart } = useUpdateToCart()
    const {checkout,isPending} = useCheckout()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    if (isCartPending) return <Spinner />

    const handleQuantityChange = (id: number, color: string, size: string, type: "inc" | "dec") => {
        if (!cartData) return;

        const item = cartData.find(
            (i: { id: number; color: string; size: string; }) => i.id === id && i.color === color && i.size === size
        );
        if (!item) return;

        const newQty = type === "inc" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);

        updateCart({ product_id: id, quantity: newQty, color: color, size: size });
    };

    const subtotal = cartData.reduce(
        (acc: number, item: { price: number; quantity: number }) =>
            acc + item.price * item.quantity,
        0
    );

    const totalPrice = subtotal + DELIVERY_PRICE;

    const onSubmit = (data:FormValues ) => {
        checkout(data)
    }


    return (
        <div className="w-full flex justify-center items-center pt-[72px] px-[100px] flex-col">
            <h1 className="w-full text-[42px] text-[#10151F] font-[600]">Checkout</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-[42px] flex items-start gap-[131px]">
                <div className="w-[1129px] text-[#F8F6F7] h-[635px] bg-[#F8F6F7] py-[72px] px-[47px] rounded-[16px]">
                    <h2 className="text-[22px] font-[500] text-[#3E424A]">Order details</h2>
                    <div className="w-[578px] mt-[46px] flex justify-center items-center flex-col gap-[33px]">
                        <div className="w-full flex items-center gap-[24px]">
                            <div className="w-full flex justify-start items-center flex-col gap-[2px]">
                                <input
                                    {...register("name", { required: "The name field is required." })}
                                    type="text"
                                    placeholder="Name"
                                    className="w-[277px] h-[42px] rounded-[8px] border-[1px] border-[#E1DFE1] bg-[#FFFFFF] text-[#3E424A] px-[12px]"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="w-full flex flex-col justify-center items-start gap-[2px]">
                                <input
                                    {...register("surname", { required: "The surname field is required." })}
                                    type="text"
                                    placeholder="Surname"
                                    className="w-[277px] h-[42px] rounded-[8px] border-[1px] border-[#E1DFE1] bg-[#FFFFFF] text-[#3E424A] px-[12px]"
                                />
                                {errors.surname && (
                                    <p className="text-red-500 text-sm">{errors.surname.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex justify-start items-center flex-col gap-[2px]">
                            <input
                                {...register("email", {
                                    required: "The email field is required.",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email.",
                                    },
                                })}
                                type="email"
                                placeholder="Email"
                                className="w-full h-[42px] rounded-[8px] border-[1px] border-[#E1DFE1] bg-[#FFFFFF] text-[#3E424A] px-[12px]"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="w-full flex items-center gap-[24px]">
                            <div className="w-full flex flex-col justify-center items-start gap-[2px]">
                                <input
                                    {...register("address", { required: "Address is required." })}
                                    type="text"
                                    placeholder="Address"
                                    className="w-[277px] h-[42px] rounded-[8px] border-[1px] border-[#E1DFE1] bg-[#FFFFFF] text-[#3E424A] px-[12px]"
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                                )}
                            </div>

                        <div className="w-full flex flex-col justify-center items-start gap-[2px]">
                            <input
                                {...register("zip_code", {
                                    required: "Zip code is required.",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Zip code must be numeric.",
                                    },
                                })}
                                type="text"
                                placeholder="Zip code"
                                className="w-[277px] h-[42px] rounded-[8px] border-[1px] border-[#E1DFE1] bg-[#FFFFFF] text-[#3E424A] px-[12px]"
                            />
                            {errors.zip_code && (
                                <p className="text-red-500 text-sm">{errors.zip_code.message}</p>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
                <div className="w-[460px] h-[635px] flex flex-col justify-center items-center">
                    <div className="max-w-[460px] w-full h-[340px] overflow-y-auto flex flex-col gap-[36px] px-2">
                        {cartData.map((item: Product, i: number) => (
                            <div
                                key={i}
                                className="max-w-[460px] w-full flex justify-between items-center gap-[17px]"
                            >
                                <img
                                    src={
                                        item.images[
                                        item.available_colors.findIndex((c: string) => c === item.color)
                                        ]
                                    }
                                    alt={item.name}
                                    className="w-[120px] h-[134px] object-contain border border-[#E1DFE1] rounded-[10px]"
                                />
                                <div className="w-full flex flex-col gap-[8px]">
                                    <div className="w-full flex justify-between">
                                        <h2 className="font-medium text-[#10151F] text-[14px]">
                                            {item.name}
                                        </h2>
                                        <h2 className="font-medium text-[#10151F] text-[18px]">
                                            ₾{item.price}
                                        </h2>
                                    </div>
                                    <p className="text-[12px] text-[#3E424A]">{item.color}</p>
                                    <p className="text-[12px] text-[#3E424A]">{item.size}</p>

                                    <div className="w-full flex justify-between items-center">
                                        <div className="w-[70px] h-[26px] border border-[#E1DFE1] rounded-[10px] flex justify-center items-center gap-[4px]">
                                            <button onClick={() => handleQuantityChange(item.id, item.color ?? "", item.size ?? "", "dec")}>
                                                <HiMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.id, item.color ?? "", item.size ?? "", "inc")}>
                                                <HiPlus />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => deleteCartItem({ product_id: item.id, color: item.color ?? "", size: item.size ?? "" })}
                                            className="text-[#3E424A] text-[12px] font-[400] cursor-pointer"
                                        >
                                            {isDeleting ? "Deleting..." : "Remove"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="mt-[81px] flex flex-col justify-center items-center gap-[16px]">
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

                    <button onClick={() => { }} className="w-[460px] h-[59px] mt-[81px] bg-[#FF4000] rounded-[10px] flex justify-center items-center text-white text-[18px] font-[500] hover:shadow-md">
                        {isPending ? "Pending" : "Pay"}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default Checkout