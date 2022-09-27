import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../Component/Cart";
import Fragrance from "../Component/Fragrance";
import Groceries from "../Component/Groceries";
import Home from "../Component/Home";
import HomeDecor from "../Component/HomeDecor";
import Laptop from "../Component/Laptop";
import Login from "../Component/Login";
import Readmore from "../Component/Readmore";
import Register from "../Component/Register";
import Skincare from "../Component/Skincare";
import Smartphone from "../Component/Smartphone";
import User from "../Component/User";
import Address from "../Component/Address";
import Pay from "../Component/Pay";
import Success from "../Component/Success";
export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Readmore />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/smartphone" element={<Smartphone />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/fragrances" element={<Fragrance />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/home_decor" element={<HomeDecor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<User />} />
          <Route path="/checkout/address" element={<Address />} />
          <Route path="/checkout/payment" element={<Pay />} />
          <Route path="/checkout/success" element={<Success/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
