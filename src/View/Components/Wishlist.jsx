import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const selectedColor = product.color?.[0] || "";
    const selectedSize = product.size?.[0] || "";

    addToCart(product, 1, selectedColor, selectedSize);
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          My Wishlist <FaHeart className="ms-2" />
        </h2>

        <p className="text-muted mb-0">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}{" "}
          saved
        </p>
      </div>

      {/* Empty Wishlist */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-5 border rounded shadow-sm">
          <FaHeart size={50} className="text-secondary mb-3" />

          <h4 className="fw-bold">Your wishlist is empty</h4>

          <p className="text-muted">
            Save your favorite products here and find them easily later.
          </p>

          <Link to="/products" className="btn premium-btn px-4 mt-2">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistItems.map((product) => (
            <div className="col-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card h-100 border-0 shadow-sm">
                {/* Product Image */}
                <div className="position-relative">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>

                  {/* Remove Wishlist */}
                  <button
                    type="button"
                    className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                    onClick={() => removeFromWishlist(product.id)}
                    title="Remove from Wishlist"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="card-body">
                  <h6 className="fw-bold mb-1">{product.brand}</h6>

                  <p className="text-muted small mb-2">{product.name}</p>

                  <div className="fw-bold mb-3">
                    ₹{Number(product.price).toFixed(2)}
                  </div>

                  <button
                    type="button"
                    className="btn premium-btn w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
