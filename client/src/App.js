import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import MyProducts from './pages/admin/MyProducts';
import RegisterCustomer from "./pages/customer/Register";
import LoginCustomer from "./pages/customer/Login";
import RegisterAdmin from "./pages/admin/Register";
import LoginAdmin from "./pages/admin/Login";
import Cart from "./pages/customer/Cart";
import Beranda from "./pages/customer/Beranda";
import Checkout from "./pages/customer/Checkout";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="myProducts" />} replace="true" />
        <Route path="/myProducts" element={<MyProducts />} />
        <Route path="/registerCustomer" element={<RegisterCustomer />} />
        <Route path="/loginCustomer" element={<LoginCustomer />} />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;