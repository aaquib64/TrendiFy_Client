import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { FaHeart } from "react-icons/fa";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    username: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    axios
      .get(`https://trendify-server-gb90.onrender.com/products/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        console.log(" Response:", response.data.Products);

        setProduct(response.data.Product);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch Products details.");
        setLoading(false);
      });
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault(); // prevent to defailt page (It will not refersh the page like after submitting)
    if (newReview.username && newReview.comment) {
      const updatedReviews = [...(product.reviews || []), newReview];
      setProduct({ ...product, reviews: updatedReviews });
      setNewReview({ username: "", rating: 5, comment: "" });
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart(product, quantity, selectedColor, selectedSize);

    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!selectedColor) {
      // alert("Please select a color.");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    addToCart(product, quantity, selectedColor, selectedSize);

    navigate("/checkout");
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-border text-danger"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  const averageRating = product.reviews?.length
    ? (
        product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : "No Ratings Yet";

  return (
    <div>
      {/* Go Back Button */}
      <div className="container my-3">
        <button onClick={() => navigate(-1)} className="btn btn-danger">
          ⬅ Go Back
        </button>
      </div>

      {/* Product Details Section */}
      <div className="container my-4">
        <div className="row">
          {/* Product Image */}
          <div className="col-lg-4 col-md-12 mb-4">
            <img
              src={product.image}
              alt="Product"
              className="img-fluid rounded shadow-sm image"
            />
          </div>

          {/* Product Info */}
          <div className="col-lg-4 col-md-12">
            <h2 className="fw-bold">{product.brand}</h2>
            <h4 className="text-muted">
              <strong>{product.name}</strong>
            </h4>
            <p className="average-rating">⭐ {averageRating} / 5</p>
            <p className="lead">
              <span className="text-success fw-bold">₹{product.price}</span>
            </p>

            {/* Product color*/}
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <select
                id="color"
                className="form-select w-50"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                required
              >
                <option disabled value="">
                  Choose a color
                </option>
                {product.color?.map((clr, idx) => (
                  <option key={idx} value={clr}>
                    {clr}
                  </option>
                ))}
              </select>
            </div>

            <strong className="text-muted">Product Details:</strong>
            <p className=" "> {product.description}</p>

            {/* Size Selection */}
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size:
              </label>

              <select
                className="form-select w-50"
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                 required
              >
                <option value="" disabled>
                  Choose size
                </option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            {/* Quantity Input */}
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>

              <input
                type="number"
                className="form-control w-50"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
              />
            </div>

            {/* Action Buttons */}
            <button className="btn btn-danger me-2" onClick={handleAddToCart}>
              ADD TO CART
            </button>

            <button className="btn btn-dark me-2" onClick={handleBuyNow}>
              BUY NOW
            </button>

            <button
              type="button"
              className={`btn ${
                isWishlisted(product.id) ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => toggleWishlist(product)}
            >
              <FaHeart className="me-1" />

              {isWishlisted(product.id) ? "WISHLISTED" : "ADD TO WISHLIST"}
            </button>
          </div>
        </div>
        <hr></hr>

        {/* Average Rating */}
        <div className="my-4 d-flex flex-column align-items-center mb-5">
          <p className="average-rating">⭐ {averageRating} / 5</p>
        </div>

        {/* Customer Reviews Section */}
        <div className="d-flex flex-column align-items-center mb-5">
          {/* Reviews Section */}
          <div className="reviews-section w-50 mb-4">
            <h2 className="text-center">Customer Reviews</h2>
            {product.reviews?.length > 0 ? (
              product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="review-card p-3 border rounded shadow-sm my-3"
                >
                  <p className="review-user">
                    <strong>{review.username}</strong> ⭐ {review.rating}/5
                  </p>
                  <p className="review-comment">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <p className="text-center">No Reviews Yet.</p>
            )}
          </div>

          {/* Add a Review Section */}
          <div className="add-review-section w-50">
            <h2 className="text-center">Add A Review</h2>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newReview.username}
                  onChange={(e) =>
                    setNewReview({ ...newReview, username: e.target.value })
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: parseInt(e.target.value),
                    })
                  }
                  className="form-select"
                  required
                >
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <option key={index} value={rating}>
                      {rating} Stars
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <textarea
                  placeholder="Write a review..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-danger">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
