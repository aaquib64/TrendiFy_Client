import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PaginationControls from "../Components/PaginationControls";
import { WishlistContext } from "../Context/WishlistContext";
import { FaHeart } from "react-icons/fa";

const SearchResult = () => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  const { gender, category } = useParams(); // Get gender and category from URL params
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  console.log(" gender, category -->>>", gender, category);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Fetch products based on gender or category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "";

        if (gender) {
          // Fetch products by city
          url = `https://trendify-server-gb90.onrender.com/shop/${gender}`;
        } else if (category) {
          // Fetch restaurants by category
          url = `https://trendify-server-gb90.onrender.com/shop/${gender}/${category}`;
        }

        if (url) {
          const response = await axios.get(url);
          console.log("Response data:", response.data);
          setProducts(response.data.products || []); // Assuming the list is under AllProducts
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
      }
    };

    if (gender || category) {
      fetchProducts();
    }
  }, [gender, category]);

  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  const startIndex = (page - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage,
  );

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

  return (
    <div className="container mt-5">
      {" "}
      {/* Adds margin from the top */}
      {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
        <div>
          <div className="row px-3">
            {" "}
            {/* Adds padding on both sides */}
            {currentProducts.map((prod) => (
              <div
                key={prod.id}
                className="col-lg-3 col-md-4 col-sm-6 mb-3 mx-auto">
                <div className="card h-100 d-flex flex-column position-relative border-0 shadow-sm rounded-3">
                  <img
                    src={prod.image}
                    className="card-img-top image"
                    alt={prod.name}
                    style={{ height: "220px", objectFit: "cover" }} // Adjusted height
                  />
                  <button
                    type="button"
                    className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                    onClick={() => toggleWishlist(prod)}
                    title={
                      isWishlisted(prod.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }
                  >
                    <FaHeart
                      className={
                        isWishlisted(prod.id) ? "text-danger" : "text-secondary"
                      }
                    />
                  </button>
                  <div className="card-body d-flex flex-column p-2 text-center">
                    <h5 className="card-title text-center">{prod.name}</h5>
                    <h6 className="text-muted text-center">{prod.brand}</h6>

                    <p className="fw-bold text-primary text-center">
                      ₹ {prod.price}
                    </p>
                    <Link to={`/products/${prod.id}`}>
                      <button className="btn btn-danger btn-sm">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResult;
