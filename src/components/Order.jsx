import React, { useEffect, useState } from "react";
import { ordersPageStyles } from "../assets/dummyStyles";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders.reverse()); // أحدث طلب فوق
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <div className={ordersPageStyles.page}>
      <div className={ordersPageStyles.container}>
        {/* Header */}
        <div className={ordersPageStyles.header}>
          <h1 className={ordersPageStyles.mainTitle}>
            My <span className={ordersPageStyles.titleSpan}>Orders</span>
          </h1>
          <p className={ordersPageStyles.subtitle}>
            Track all your orders and their status
          </p>
          <div className={ordersPageStyles.titleDivider}>
            <span className={ordersPageStyles.dividerLine}></span>
          </div>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="text-center text-emerald-300 py-20 text-lg">
            You haven’t placed any orders yet 🛒
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-emerald-800/30 rounded-2xl p-6 border border-emerald-700"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-emerald-100 font-bold text-lg">
                      Order #{order.id}
                    </h3>
                    <p className="text-emerald-400 text-sm">{order.date}</p>
                  </div>

                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 w-fit">
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div className="space-y-3 mb-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-emerald-900/40 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="text-emerald-100 font-medium">
                            {item.title}
                          </p>
                          <p className="text-emerald-400 text-sm">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="text-emerald-100 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-emerald-700 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-emerald-300">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300">
                    <span>Taxes</span>
                    <span>${order.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-100 font-bold text-base">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>

                  <div className="text-emerald-400 text-sm mt-2">
                    Payment Method:{" "}
                    <span className="capitalize">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
