import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import { CartProvider } from "./CartContext";
import Items from "./Pages/Items";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Checkout from "../src/components/Checkout";
import Order from "./components/Order";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("authToken")),
  );
  useEffect(() => {
    const handler = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("authToken")));
    };
    window.addEventListener("authStateChanged", handler);
    return () => window.removeEventListener("authStateChanged", handler);
  }, []);
  return (
    <CartProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ScrollToTop />
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            isAuthenticated ? <Cart /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
