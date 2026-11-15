import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartStyles, checkoutStyles } from "../assets/dummyStyles";
import { useCart } from "../CartContext";

export default function Checkout() {
  const { cart = [], getCartTotal, clearCart } = useCart(); // استخدمنا cart بدل cartItems
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const subtotal = getCartTotal();
    const taxes = subtotal * 0.05;
    const total = subtotal + taxes;

    // اعلان واحد فقط عن الطلب الجديد
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: "Out for delivery",
      paymentMethod,
      items: cart, // استخدام cart هنا
      subtotal,
      taxes,
      total,
    };

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...oldOrders, newOrder]));

    toast.success("Order placed successfully!");
    clearCart();

    setTimeout(() => {
      navigate("/order");
    }, 1500);
  };

  return (
    <div className={checkoutStyles.page}>
      <div className={checkoutStyles.container}>
        <Link to="/cart" className={checkoutStyles.backLink}>
          ← Back to Cart
        </Link>

        <div className={checkoutStyles.header}>
          <h1 className={checkoutStyles.mainTitle}>Checkout</h1>
          <p className={checkoutStyles.subtitle}>
            Complete your order securely
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className={checkoutStyles.card}>
              <h2 className={checkoutStyles.sectionTitle}>
                Customer Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className={checkoutStyles.input}
                  placeholder="First Name"
                />
                <input
                  className={checkoutStyles.input}
                  placeholder="Last Name"
                />
                <input
                  className={checkoutStyles.input}
                  placeholder="Email Address"
                />
                <input
                  className={checkoutStyles.input}
                  placeholder="Phone Number"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className={checkoutStyles.card}>
              <h2 className={checkoutStyles.sectionTitle}>Shipping Address</h2>
              <div className="space-y-4">
                <input
                  className={checkoutStyles.input}
                  placeholder="Street Address"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input className={checkoutStyles.input} placeholder="City" />
                  <input
                    className={checkoutStyles.input}
                    placeholder="Postal Code"
                  />
                </div>
                <input className={checkoutStyles.input} placeholder="Country" />
              </div>
            </div>

            {/* Payment */}
            <div className={checkoutStyles.card}>
              <h2 className={checkoutStyles.sectionTitle}>Payment Method</h2>
              <div
                className={checkoutStyles.radioCard}
                onClick={() => setPaymentMethod("card")}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  readOnly
                />
                <div className="ml-3">
                  <p className="text-emerald-100 font-medium">
                    Credit / Debit Card
                  </p>
                  <p className="text-emerald-400 text-sm">
                    Visa, MasterCard, Meeza
                  </p>
                </div>
              </div>

              <div
                className={checkoutStyles.radioCard}
                onClick={() => setPaymentMethod("cash")}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "cash"}
                  readOnly
                />
                <div className="ml-3">
                  <p className="text-emerald-100 font-medium">
                    Cash on Delivery
                  </p>
                  <p className="text-emerald-400 text-sm">
                    Pay when you receive your order
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">
            <div className={cartStyles.orderSummaryCard}>
              <h2 className={cartStyles.orderSummaryTitle}>Order Summary</h2>
              <div className="space-y-4 text-sm sm:text-base">
                <div className={cartStyles.orderSummaryRow}>
                  <span className={cartStyles.orderSummaryLabel}>Subtotal</span>
                  <span className={cartStyles.orderSummaryValue}>
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className={cartStyles.orderSummaryRow}>
                  <span className={cartStyles.orderSummaryLabel}>Shipping</span>
                  <span className={cartStyles.orderSummaryValue}>Free</span>
                </div>
                <div className={cartStyles.orderSummaryRow}>
                  <span className={cartStyles.orderSummaryLabel}>
                    Taxes (5%)
                  </span>
                  <span className={cartStyles.orderSummaryValue}>
                    ${(getCartTotal() * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className={cartStyles.orderSummaryDivider}></div>
                <div className={cartStyles.orderSummaryTotalRow}>
                  <span className={cartStyles.orderSummaryTotalLabel}>
                    Total
                  </span>
                  <span className={cartStyles.orderSummaryTotalValue}>
                    ${(getCartTotal() * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className={cartStyles.checkoutButton}
                onClick={handleConfirmOrder}
              >
                Confirm the order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
