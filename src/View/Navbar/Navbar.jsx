import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import "./Navbar.css";
import Logo from "./Logo/Logo";
import Men from "./Men/Men";
import Women from "./Women/Women";
import Kids from "./Kids/Kids";
import HomeAndLiving from "./HomeAndLiving/HomeAndLiving";
import Beauty from "./Beauty/Beauty";
import {
  FaShoppingCart,
  FaUser,
  FaBoxOpen,
  FaSignOutAlt,
  FaHeart,
} from "react-icons/fa";
import { WishlistContext } from "../Context/WishlistContext";

let Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const [searchGender, setSearchGender] = useState("");
  // const [selectedGender, setSelectedGender] = useState("");
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value.trim();
    setSearchGender(value);
    setError(null);

    if (value.length >= 2) {
      try {
        const response = await axios.get(
          `https://trendify-server-gb90.onrender.com/shop/${encodeURIComponent(value)}`,
        );

        console.log("Live search response:", response.data);
        setProducts(response.data);
        navigate(`/shop/${encodeURIComponent(value)}`);
      } catch (err) {
        console.error("Search API error:", err);
        setError("Failed to fetch products.");
      }
    }
  };

  // const handleSearch = async (e) => {
  //   const value = e.target.value.trim();
  //   setSearchGender(value);

  //   if (value.length >= 2) {
  //     // You can reduce this to 1 if needed
  //     try {
  //       const response = await axios.get(
  //         `https://trendify-server-gb90.onrender.com/shop/${value}`,
  //       );
  //       console.log("Live search response:", response.data);
  //       setProducts(response.data);
  //       navigate(`/shop/${value}`);
  //     } catch (err) {
  //       setError("Failed to fetch products.");
  //     }
  //   }
  // };

  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   if (!searchGender && !selectedGender) {
  //     setError("Please select or enter a gender");
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);
  //   const gender = searchGender || selectedGender; // Use either the entered gender or selected gender

  //   try {
  //     const response = await axios.get(`http://localhost:5700/shop/${gender}`);
  //     console.log("response-->>>>",response);
  //     setProducts(response.data); // Assuming the response contains the list of products
  //     // Navigate to the results page with the city as a query parameter
  //     navigate(`/products/gender/${gender}`);
  //   } catch (err) {
  //     setError("Failed to fetch products.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
        <div className="container-fluid">
          <Logo />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-0 mx-3 gap-3 nav-menu">
              <Men />
              <Women />
              <Kids />
              <HomeAndLiving />
              <Beauty />
            </ul>

            <form
              className="d-flex flex-column flex-lg-row align-items-center gap-2 ms-lg-auto my-0"
              role="search"
            >
              {/* Search Box */}
              <div className="input-group premium-search">
                <span className="input-group-text border-0">🔍</span>

                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search products..."
                  onChange={handleSearch}
                />
              </div>

              {/* Buttons */}
              <div className="d-flex flex-column flex-lg-row gap-2 auth-buttons">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn premium-btn dropdown-toggle d-flex align-items-center gap-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUser size={17} />
                      {user?.name.split(" ")[0]}
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                      <li>
                        <Link
                          to="/profile"
                          className="dropdown-item d-flex align-items-center gap-2"
                        >
                          <FaUser />
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/orders"
                          className="dropdown-item d-flex align-items-center gap-2"
                        >
                          <FaBoxOpen />
                          My Orders
                        </Link>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          type="button"
                          className="dropdown-item d-flex align-items-center gap-2"
                          onClick={logout}
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="btn premium-btn">
                      Login
                    </Link>

                    <Link to="/signup" className="btn premium-btn">
                      Signup
                    </Link>
                  </>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="btn premium-btn position-relative"
                title="Wishlist"
              >
                <FaHeart />

                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="btn premium-btn position-relative"
                title="Cart"
              >
                <FaShoppingCart />

                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                    {cartCount}
                  </span>
                )}
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
