import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/auth/Register"
import Layout from "./layout/Layout"
import Signin from "./pages/auth/Signin"
import Index from "./pages/Products/Index"
import Show from "./pages/Products/Show"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<Show />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App