import React from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  const latestOrder = JSON.parse(localStorage.getItem("latestOrder") || "null");

  const allOrders =
    orders.length > 0 ? orders : latestOrder ? [latestOrder] : [];

  const order = allOrders.find((item) => item.orderId === orderId);

  if (!order) {
    return (
      <div className="container text-center my-5">
        <h3>Order not found</h3>

        <Link to="/orders" className="btn btn-danger mt-3">
          Back to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Order Details</h2>

          <p className="text-muted mb-0">
            Order ID: <strong>{order.orderId}</strong>
          </p>
        </div>

        <span className="badge bg-success px-3 py-2">✓ Order Placed</span>
      </div>

      {/* Order Date */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <small className="text-muted">ORDER DATE</small>

              <p className="fw-bold mb-0">
                {new Date(order.orderDate).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="col-md-4">
              <small className="text-muted">PAYMENT METHOD</small>

              <p className="fw-bold mb-0">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>
            </div>

            <div className="col-md-4">
              <small className="text-muted">TOTAL AMOUNT</small>

              <p className="fw-bold fs-5 mb-0">₹{order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Products */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Ordered Items</h5>

              {order.items.map((item) => (
                <div
                  key={`${order.orderId}-${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="row align-items-center border-bottom pb-4 mb-4"
                >
                  <div className="col-4 col-md-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        height: "150px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="col-8 col-md-6">
                    <h5 className="fw-bold">{item.name}</h5>

                    <p className="text-muted mb-2">{item.brand}</p>

                    <p className="mb-1">
                      Color: <strong>{item.selectedColor}</strong>
                    </p>

                    <p className="mb-1">
                      Size: <strong>{item.selectedSize}</strong>
                    </p>

                    <p className="mb-0">
                      Quantity: <strong>{item.quantity}</strong>
                    </p>
                  </div>

                  <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">
                    <strong className="fs-5">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </strong>

                    <small className="text-muted d-block">
                      ₹{item.price.toFixed(2)} each
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Delivery Address</h5>

              <p className="fw-bold mb-1">
                {order.customer.firstName} {order.customer.lastName}
              </p>

              <p className="mb-1">{order.customer.address}</p>

              <p className="mb-1">
                {order.customer.city}, {order.customer.state} -{" "}
                {order.customer.pincode}
              </p>

              <p className="mb-0">Mobile: {order.customer.mobile}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Price Details</h5>

              <div className="d-flex justify-content-between mb-3">
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
      </div>

      {/* Back Button */}
      <div className="mt-4">
        <Link to="/orders" className="btn btn-outline-danger">
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
