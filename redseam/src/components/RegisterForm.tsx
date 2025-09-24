import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import type { RegisterData } from "../types/types";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      avatar: null,
    },
  });
  const { registerUser,isPending} = useRegister();

  const [preview, setPreview] = useState<string>("/auth/users/user1.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: RegisterData) => {
    if(!data)return;
    registerUser(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPG, PNG, or WEBP images are allowed.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setValue("avatar", file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleRemove = () => {
    setValue("avatar", null);
    setPreview("/auth/users/user1.jpg");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full pt-[48px] flex justify-center items-start flex-col"
    >
      {/* Avatar Upload */}
      <div className="flex justify-start items-center gap-[39px]">
        <img
          src={preview}
          alt="user"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <div className="flex items-center gap-[15px]">
          <label
            htmlFor="avatar"
            className="font-[400] text-[14px] leading-[100%] text-[#3E424A] cursor-pointer"
          >
            Upload now
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="font-[400] text-[14px] leading-[100%] text-[#3E424A] cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Username */}
      <div className="w-full pt-[46px] flex flex-col gap-[8px]">
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "Minimum 3 characters required" },
          })}
          placeholder="Username"
          autoComplete="username"
          className={`w-full h-[42px] border rounded-[8px] px-[16px] py-[18px] font-poppins text-[14px] outline-none ${
            errors.username ? "border-red-500" : "border-[#E6E8EC]"
          }`}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message}</span>
        )}
      </div>

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

      <div className="w-full pt-[24px] flex flex-col gap-[8px]">
        <input
          type="password"
          {...register("password_confirmation", {
            required: "Please confirm your password",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          })}
          placeholder="Confirm Password"
          autoComplete="new-password"
          className={`w-full h-[42px] border rounded-[8px] px-[16px] py-[18px] font-poppins text-[14px] outline-none ${
            errors.password_confirmation ? "border-red-500" : "border-[#E6E8EC]"
          }`}
        />
        {errors.password_confirmation && (
          <span className="text-red-500 text-sm">
            {errors.password_confirmation.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full h-[41px] bg-[#FF4000] rounded-[8px] text-[14px] text-[#FFFFFF] mt-[46px]"
      >
        {isPending ? "Registering" : "Register"}
      </button>
      <div className="w-full flex justify-center items-center pt-[24px] gap-[8px]">
        <p className="text-center font-[400] text-[14px] leading-[100%] text-[#3E424A]">Already member?</p>
        <Link to="/signin" className="font-[500] text-[14px] leading-[100%] text-[#FF4000]">Log in</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
