import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const Layout = () => {
  return (
    <div className="max-w-[1920px] w-full mx-auto bg-[#FFFFFF] min-h-screen flex justify-start items-center flex-col">
        <Header />
        <main className="w-full mt-[100px] flex justify-center items-center h-auto gap-[20px]">
            <Outlet />
        </main>
    </div>

  )
}

export default Layout