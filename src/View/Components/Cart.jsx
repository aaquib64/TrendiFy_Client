import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted">
          Add some products to your cart and they will appear here.
        </p>

        <Link to="/products" className="btn btn-danger">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
              className="card mb-3 shadow-sm"
            >
              <div className="card-body">
                <div className="row align-items-center">
                  {/* Product Image */}
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        height: "100px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-4">
                    <h5>{item.name}</h5>
                    <p className="mb-1 text-muted">Brand: {item.brand}</p>

                    <p className="mb-1">
                      Color: <strong>{item.selectedColor}</strong>
                    </p>

                    <p className="mb-1">
                      Size: <strong>{item.selectedSize}</strong>
                    </p>

                    <p className="fw-bold text-danger">₹{item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="col-md-3">
                    <label className="form-label">Quantity</label>

                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          decreaseQuantity(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                          )
                        }
                      >
                        -
                      </button>

                      <span className="mx-3 fw-bold">{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          increaseQuantity(
                            item.id,
                            item.selectedColor,
                            item.selectedSize,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="col-md-3 text-md-end mt-3 mt-md-0">
                    <p className="fw-bold">₹{item.price * item.quantity}</p>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.selectedColor,
                          item.selectedSize,
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-4">Order Summary</h4>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <strong>₹{cartTotal}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Delivery</span>
                <span className="text-success">FREE</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-danger">₹{cartTotal}</strong>
              </div>

              <Link to="/checkout" className="btn btn-danger w-100">
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
