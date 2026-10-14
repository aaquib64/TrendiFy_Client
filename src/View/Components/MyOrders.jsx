import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { fetchMyOrders } from "../Utils/api";


const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const savedUser = localStorage.getItem("user");
        const token = savedUser
          ? JSON.parse(savedUser)?.token
          : null;

        if (!token) {
          setError("Your session has expired. Please log in again.");
          return;
        }

        const userOrders = await fetchMyOrders(token);
        setOrders(userOrders);
      } catch (err) {
        setError(err.message || "Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadOrders();
    } else {
      setLoading(false);
      setOrders([]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h4 className="fw-bold">Please login to view your orders</h4>
          <p className="text-muted">
            Login to access your order history and tracking details.
          </p>
          <Link to="/login" className="btn premium-btn mt-2">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container text-center py-5">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <h4 className="fw-bold">Unable to load orders</h4>
        <p className="text-danger">{error}</p>
      </div>
    );
  }


  return (
    <div className="container my-5">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Orders</h2>
        <p className="text-muted mb-0">Track and manage your recent orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5 border rounded shadow-sm">
          <div className="fs-1 mb-3">📦</div>

          <h4 className="fw-bold">No orders found</h4>

          <p className="text-muted">You haven't placed any orders yet.</p>

          <Link to="/" className="btn btn-danger px-4">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="card border-0 shadow-sm mb-4 overflow-hidden"
            >
              {/* Order Header */}
              <div className="card-header bg-white py-3 px-4">
                <div className="row align-items-center">
                  <div className="col-md-4 mb-2 mb-md-0">
                    <small className="text-muted d-block">ORDER ID</small>

                    <strong>{order.orderId}</strong>
                  </div>

                  <div className="col-md-4 mb-2 mb-md-0">
                    <small className="text-muted d-block">ORDER DATE</small>

                    <strong>
                      {new Date(order.orderDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>

                  <div className="col-md-4 text-md-end">
                    <span className="badge bg-success px-3 py-2">
                      ✓ Order Placed
                    </span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="card-body px-4 py-4">
                {order.items.map((item, index) => (
                  <div
                    key={`${order.orderId}-${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    className={`row align-items-center ${
                      index !== order.items.length - 1
                        ? "border-bottom pb-4 mb-4"
                        : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="col-4 col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{
                          height: "120px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="col-8 col-md-6">
                      <h5 className="fw-bold mb-1">{item.name}</h5>

                      <p className="text-muted mb-2">{item.brand}</p>

                      <div className="small text-muted mb-2">
                        <span>
                          Color:{" "}
                          <strong className="text-dark">
                            {item.selectedColor}
                          </strong>
                        </span>

                        <span className="ms-3">
                          Size:{" "}
                          <strong className="text-dark">
                            {item.selectedSize}
                          </strong>
                        </span>
                      </div>

                      <div className="small">
                        Quantity: <strong>{item.quantity}</strong>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-12 col-md-4 mt-3 mt-md-0 text-md-end">
                      <div className="fw-bold fs-5">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>

                      <small className="text-muted">
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </small>
                    </div>
                  </div>
                ))}

                {/* Delivery Status */}
                <div className="mt-4 p-3 bg-light rounded">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h6 className="fw-bold mb-2">Delivery Status</h6>

                      <div className="d-flex align-items-center flex-wrap gap-2">
                        <span
                          className={
                            order.status === "Order Placed" ||
                            order.status === "Processing" ||
                            order.status === "Shipped" ||
                            order.status === "Delivered"
                              ? "text-success fw-bold"
                              : "text-muted"
                          }
                        >
                          ●
                        </span>

                        <span>Order Placed</span>

                        <span className="text-muted">→</span>

                        <span
                          className={
                            order.status === "Processing" ||
                            order.status === "Shipped" ||
                            order.status === "Delivered"
                              ? "text-success fw-bold"
                              : "text-muted"
                          }
                        >
                          Processing
                        </span>

                        <span className="text-muted">→</span>

                        <span
                          className={
                            order.status === "Shipped" ||
                            order.status === "Delivered"
                              ? "text-success fw-bold"
                              : "text-muted"
                          }
                        >
                          Shipped
                        </span>

                        <span className="text-muted">→</span>

                        <span
                          className={
                            order.status === "Delivered"
                              ? "text-success fw-bold"
                              : "text-muted"
                          }
                        >
                          Delivered
                        </span>
                      </div>
                    </div>

                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <small className="text-muted d-block">Payment</small>

                      <strong>
                        {order.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : "Online Payment"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="card-footer bg-white px-4 py-3">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <span className="text-muted">Total Amount:</span>

                    <strong className="fs-5 ms-2">
                      ₹{order.total.toFixed(2)}
                    </strong>
                  </div>

                  <div className="col-md-6 text-md-end">
                    <Link
                      to={`/orders/${order.orderId}`}
                      className="btn btn-outline-danger btn-sm px-4"
                    >
                      VIEW ORDER
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
