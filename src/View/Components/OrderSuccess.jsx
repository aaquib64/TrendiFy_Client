import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const OrderSuccess = () => {
  const { setCartItems } = useContext(CartContext);
  const savedOrder = localStorage.getItem("latestOrder");
  const order = savedOrder ? JSON.parse(savedOrder) : null;

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  if (!order) {
    return (
      <div className="container text-center my-5">
        <h3>Order information not found.</h3>

        <Link to="/" className="btn btn-danger mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <div className="fs-1 text-success">✓</div>

        <h2 className="fw-bold">Order Placed Successfully!</h2>

        <p className="text-muted">Thank you for shopping with Trendify.</p>

        <p>
          Order ID: <strong>{order.orderId}</strong>
        </p>
      </div>

      <div className="row">
        {/* Order Details */}
        <div className="col-lg-7 mb-4">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-4">Order Details</h4>

            {order.items.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="d-flex align-items-center border-bottom pb-3 mb-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  className="rounded"
                />

                <div className="ms-3">
                  <h6 className="fw-bold mb-1">{item.name}</h6>

                  <p className="mb-1 text-muted">{item.brand}</p>

                  <small>
                    {item.selectedColor} / {item.selectedSize}
                    {" × "}
                    {item.quantity}
                  </small>

                  <p className="fw-bold mt-1 mb-0">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & Payment */}
        <div className="col-lg-5">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Delivery Address</h5>

            <p className="mb-1">
              <strong>
                {order.customer.firstName} {order.customer.lastName}
              </strong>
            </p>

            <p className="mb-1">{order.customer.address}</p>

            <p className="mb-1">
              {order.customer.city}, {order.customer.state} -{" "}
              {order.customer.pincode}
            </p>

            <p className="mb-0">Mobile: {order.customer.mobile}</p>
          </div>

          <div className="card shadow-sm p-4">
            <h5 className="fw-bold mb-3">Payment & Total</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Payment Method</span>

              <strong>
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>

              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Delivery</span>

              <span>
                {order.deliveryCharge === 0
                  ? "FREE"
                  : `₹${order.deliveryCharge}`}
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>

              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-danger px-4">
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
