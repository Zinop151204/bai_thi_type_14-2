import { Route, Routes } from "react-router-dom"
import Layout from "./Product/Layout"
import List from "./Product/List"
import Add from "./Product/Add"
import Edit from "./Product/Edit"
import Signin from "./Login/Signin"
import Signup from "./Login/Signup"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/products" element={<List />} />
          <Route path="/products/add" element={<Add />} />
          <Route path="/products/:id" element={<Edit />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
