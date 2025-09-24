import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/auth/Register"
import Layout from "./layout/Layout"
import Signin from "./pages/auth/Signin"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />}/>
          <Route path="/signin" element={<Signin />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App