import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
// import Steps from "../steps/Steps";
import { OrderTable, Steps } from "../../components";

const SellerOrderDetailsComponent = ({
  order,
  seller,
  user,
  orderId,
  handleDelete,
  handleChangeStatus,
}) => {
  return (
    <>
      <section className="p-4 w-full bg-primary-content flex items-center">
        <article className="w-full flex flex-col lg:flex-row items-center justify-between gap-y-5">
          {/* Order Details */}
          <div className="w-full mx-auto md:px-6 ">
            <section>
              <h1 className="text-xl md:text-3xl font-bold text-secondary-content">
                Order Details
              </h1>
              <p className="font-semibold text-lg my-2">
                Order ID :
                <span className="font-light text-gray-500"> {order.id}</span>
              </p>
              <p className="font-semibold text-lg my-2">
                Order Amount :
                <span className="font-light text-gray-500">
                  {formatPrice(order.orderAmount)}
                </span>
              </p>
              <p className="font-semibold text-lg my-2">
                Order Status :
                <span
                  className={`font-bold ${
                    order.orderStatus === "Item(s) Delivered"
                      ? "text-green-600"
                      : "text-primary"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </p>
            </section>
            {/* Steps for order traacking only for user */}
            {user && <Steps order={order} />}
            {seller && (
              <div>
                {/* Recipient Name */}
                <p className="font-semibold text-lg">
                  Recipient Name :
                  <span className="font-light">
                    {order.shippingAddress.name}
                  </span>
                </p>
                {/* Phone Number */}
                <p className="font-semibold text-lg">
                  Phone :
                  <span className="font-light">
                    {order.shippingAddress.phone}
                  </span>
                </p>
                {/* Address */}
                <p className="font-semibold text-lg">
                  Shipping Address :
                  <span className="font-light">
                    {order.shippingAddress.line1}, {order.shippingAddress.line2}
                    ,{order.shippingAddress.city},
                    {order.shippingAddress.country}
                  </span>
                </p>
              </div>
            )}
          </div>
          {/* Update order Status */}
          {seller && <ChangeOrderStatus order={order} orderId={orderId} />}
        </article>
      </section>
      <main className="py-5">
        <div className="pb-5">
          {seller ? (
            <Link to="/seller/orders" className="link active my-2">
              &larr; Back to All Orders
            </Link>
          ) : (
            <Link to="/my-orders" className="link active my-2">
              &larr; Back to All Orders
            </Link>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th className="text-sm md:text-lg">Product</th>
                {seller && <th className="text-sm md:text-lg">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((product, index) => {
                const { id: productId, name, price, imageURL, qty } = product;
                return (
                  <tr key={index}>
                    <td>
                      <Link to={`/product-details/${productId}`}>
                        <LazyLoadImage
                          src={
                            imageURL ||
                            `https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png`
                          }
                          alt={name}
                          className="w-10 sm:w-24 object-fill"
                          placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                          effect="blur"
                        />
                        <div className="md:text-lg">{name}</div>
                        <div className="md:text-lg font-medium">
                          Qty:
                          <span className="md:text-lg font-medium text-primary">
                            {qty}
                          </span>
                        </div>
                        <div className="md:text-lg font-medium">
                          Total:
                          <span className="md:text-lg font-medium text-primary">
                            {formatPrice(price * qty)}
                          </span>
                        </div>
                      </Link>
                    </td>
                    {seller && (
                      <td className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleDelete(productId)}
                          className="border-2 border-gray-900 w-48 p-2 rounded-md md:text-lg bg-gray-900 text-white hover:bg-gray-700 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleChangeStatus(productId)}
                          className="border-2 border-pink-700 w-48 p-2 rounded-md md:text-lg bg-pink-700 text-white hover:bg-pink-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                          Change Status
                        </button>
                        <button
                          onClick={() => handleViewDetails(productId)}
                          className="border-2 border-blue-700 w-48 p-2 rounded-md md:text-lg bg-blue-700 text-white hover:bg-blue-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        >
                          View Details
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default SellerOrderDetailsComponent;
