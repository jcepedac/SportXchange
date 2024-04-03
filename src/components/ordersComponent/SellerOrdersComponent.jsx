import React, { useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";

const SellerOrdersComponent = ({ orders }) => {
  const navigate = useNavigate();
  const [orderStatuses, setOrderStatuses] = useState({});

  // 导航到订单详情页面
  const handleOrderDetailsClick = (orderId) => {
    navigate(`/seller/order-details/${orderId}`);
  };

  // 更新订单状态为已发货
  const handleMarkAsShipped = (orderId) => {
    setOrderStatuses({
      ...orderStatuses,
      [orderId]: "Shipped",
    });
    // 这里可以添加更多的逻辑，比如调用API更新后端订单状态
  };

  return (
    <main>
      {!orders.length ? (
        <h1 className="text-2xl font-bold">No Orders Found</h1>
      ) : (
        <div>
          {orders.map((order, index) => (
            <section
              className="w-full my-6 shadow-md rounded-md cursor-pointer hover:bg-base-200 duration-200"
              key={index}
              onClick={() => handleOrderDetailsClick(order.id)}
            >
              <div className="p-4 bg-base-200">
                <div className="flex items-center justify-between gap-6">
                  <p className="text-gray-500 text-sm md:text-lg">
                    ORDER PLACED:{" "}
                    <span className="text-primary">{order.orderDate}</span>
                  </p>
                  <p className="text-gray-500 text-sm md:text-lg">
                    TOTAL:{" "}
                    <span className="text-primary">
                      {formatPrice(order.orderAmount)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="text-sm md:text-lg">
                  ID: <span className="font-semibold"> {order.id}</span>
                </p>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleMarkAsShipped(order.id);
                  }}
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium"
                >
                  Mark as Shipped
                </button>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};

export default SellerOrdersComponent;
