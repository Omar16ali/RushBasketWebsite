import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router";

const Logout = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    window.dispatchEvent(new Event("authStateChanged"));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        <FaSignOutAlt mr-2 />
        Logout
      </button>
      <p>You are already signed in. Click above to Logout</p>
    </div>
  );
};

export default Logout;
