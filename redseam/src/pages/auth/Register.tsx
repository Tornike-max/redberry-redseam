import RegisterForm from "../../components/RegisterForm"

const Register = () => {
  return (
    <div className="w-full h-full flex gap:[172px]">
        <img src="/auth/register.webp" alt="registerImg" className="max-w-[948px] w-full h-[900px] object-cover"/>
        <div className="w-full flex justify-center items-center">
            <div className="max-w-[554px] w-full flex justify-center items-center flex-col">
                <h1 className="font-semibold text-[42px] leading-none w-full text-start">Registration</h1>
                <RegisterForm />
            </div>
        </div>
    </div>
  )
}

export default Register