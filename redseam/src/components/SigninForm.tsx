import { useForm } from "react-hook-form";
import type { SignInData } from "../types/types";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { logInUser,isPending} = useLogin();

  const onSubmit = (data: SignInData) => {
    if(!data)return;
    logInUser(data);
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full pt-[48px] flex justify-center items-start flex-col"
    >

      {/* Email */}
      <div className="w-full pt-[24px] flex flex-col gap-[8px]">
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          autoComplete="email"
          className={`w-full h-[42px] border rounded-[8px] px-[16px] py-[18px] font-poppins text-[14px] outline-none ${
            errors.email ? "border-red-500" : "border-[#E6E8EC]"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="w-full pt-[24px] flex flex-col gap-[8px]">
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 3, message: "Minimum 3 characters required" },
          })}
          placeholder="Password"
          autoComplete="new-password"
          className={`w-full h-[42px] border rounded-[8px] px-[16px] py-[18px] font-poppins text-[14px] outline-none ${
            errors.password ? "border-red-500" : "border-[#E6E8EC]"
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full h-[41px] bg-[#FF4000] rounded-[8px] text-[14px] text-[#FFFFFF] mt-[46px]"
      >
        {isPending ? "Logging in" : "Log In"}
      </button>
      <div className="w-full flex justify-center items-center pt-[24px] gap-[8px]">
        <p className="text-center font-[400] text-[14px] leading-[100%] text-[#3E424A]">Not a member?</p>
        <Link to="/register" className="font-[500] text-[14px] leading-[100%] text-[#FF4000]">Register</Link>
      </div>
    </form>
  );
};

export default SigninForm;
