import "./App.css";
import Navbar from "./View/Navbar/Navbar";
import Home from "./View/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Products from "./View/Components/Products";
import ProductsByGender from "./View/Components/ProductsByGender";
import ProductsByName from "./View/Components/ProductByName";
import Login from "./View/Login/Login";
import Signup from "./View/Signup/Signup";
import ProductDetails from "./View/Components/ProductDetails";
import { AuthProvider } from "./View/Context/AuthContext";
import { CartProvider } from "./View/Context/CartContext";
import SearchResult from "./View/Components/SearchResult";
import Footer from "./View/Footer/Footer";
import Cart from "./View/Components/Cart";
import Checkout from "./View/Components/Checkout";
import OrderSuccess from "./View/Components/OrderSuccess";
import MyOrders from "./View/Components/MyOrders";
import OrderDetails from "./View/Components/OrderDetails";
import Profile from "./View/Components/Profile";
import { WishlistProvider } from "./View/Context/WishlistContext";
import Wishlist from "./View/Components/Wishlist";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />

                <Route
                  path="/shop/:gender/:category"
                  element={<ProductsByName />}
                />

                <Route path="/shop/:gender" element={<ProductsByGender />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/products/:id" element={<ProductDetails />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/orders/:orderId" element={<OrderDetails />} />

                <Route
                  path="/products/category/:category"
                  element={<SearchResult />}
                />
              </Routes>

              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
