import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { createOrder } from "../Utils/api";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [error, setError] = useState("");

  const deliveryCharge = cartTotal >= 999 ? 0 : 99;
  const finalTotal = cartTotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    const { firstName, lastName, mobile, address, city, state, pincode } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !mobile ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      setError("Please fill in all delivery details.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    const savedUser = localStorage.getItem("user");
    let token = null;

    try {
      token = savedUser ? JSON.parse(savedUser)?.token : null;
    } catch {
      token = null;
    }

    if (!user || !token) {
      setError("Please log in again before placing your order.");
      return;
    }

    const order = {
      orderId: `TRD${Date.now()}`,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        brand: item.brand,
        image: item.image,
        price: Number(item.price),
        quantity: Number(item.quantity),
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      customer: formData,
      paymentMethod,
      subtotal: Number(cartTotal),
      deliveryCharge: Number(deliveryCharge),
      total: Number(finalTotal),
    };

    try {
      const result = await createOrder(order, token);

      localStorage.setItem("latestOrder", JSON.stringify(result.order));

      navigate("/order-success");
    } catch (error) {
      setError(error.message || "Unable to place order. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center my-5">
        <h3>Your cart is empty</h3>

        <Link to="/" className="btn btn-danger mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row">
        {/* Delivery Details */}
        <div className="col-lg-7 mb-4">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-4">Delivery Details</h4>

            <form onSubmit={handlePlaceOrder}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile Number</label>

                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>

                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">City</label>

                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">State</label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    placeholder="6-digit pincode"
                    maxLength="6"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mt-4">
                <h5 className="fw-bold mb-3">Payment Method</h5>

                <div className="border rounded p-3 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    <label className="form-check-label" htmlFor="cod">
                      <strong>Cash on Delivery</strong>
                      <br />
                      <small className="text-muted">
                        Pay when your order is delivered
                      </small>
                    </label>
                  </div>
                </div>

                <div className="border rounded p-3 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="online"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    <label className="form-check-label" htmlFor="online">
                      <strong>Online Payment</strong>
                      <br />
                      <small className="text-muted">
                        Pay securely using UPI, Card or Net Banking
                      </small>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-danger w-100 mt-2">
                  CONTINUE
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-5">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-4">Order Summary</h4>

            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                className="d-flex justify-content-between border-bottom pb-3 mb-3"
              >
                <div>
                  <strong>{item.name}</strong>

                  <br />

                  <small className="text-muted">
                    {item.selectedColor} / {item.selectedSize} × {item.quantity}
                  </small>
                </div>

                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>

              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>Delivery</span>

              <span>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>

              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
