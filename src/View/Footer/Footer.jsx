// import React from 'react';
// import "./footer.css";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <div className='fixed'>
//     <div className="footer-container ">
//         <div className="container-1">
//           <h5 className='heading'>ONLINE SHOPPING</h5>
//           <ul className="list">
//             <li > <Link to="/" className='list-li'> HOME </Link></li>
//             <li> <Link to="/shop/Men" className='list-li'> MEN </Link></li>
//             <li> <Link to="/shop/Women" className='list-li'> WOMEN </Link></li>
//             <li> <Link to="/shop/Kids" className='list-li'> KIDS </Link></li>
//             <li> <Link to="/shop/Unisex" className='list-li'> HOME & LIVING </Link></li>
//             <li> <Link to="/shop/Beauty" className='list-li'>BEAUTY </Link></li>

//           </ul>
//         </div>

//         <div className="container-2">
//           <h5 className='heading'>EXPERIENCE MYNTRA APP ON MOBILE</h5>
//             <div className="button-container">
//               <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="store-btn" />
//               </a>
//               <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
//                 <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="store-btn" />
//               </a>
//           </div>

//       </div>

//     </div>
//     <p className='copyright'>&copy; 2025 Myntra. All Rights Reserved.</p>
//   </div>

//   )
// }

// export default Footer;

import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import axios from "axios";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter email");
      return;
    }

    try {
      // Replace with your backend API
      await axios.post(
        "https://trendify-server-gb90.onrender.com/api/subscribe",
        {
          email,
        },
      );
      setMessage("Subscribed successfully ✅");
      setEmail("");
    } catch (error) {
      setMessage("Subscription failed ❌");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1 */}
        <div className="footer-section">
          <h5>ONLINE SHOPPING</h5>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop/Men">Men</Link>
            </li>
            <li>
              <Link to="/shop/Women">Women</Link>
            </li>
            <li>
              <Link to="/shop/Kids">Kids</Link>
            </li>
            <li>
              <Link to="/shop/Unisex">Home & Living</Link>
            </li>
            <li>
              <Link to="/shop/Beauty">Beauty</Link>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="footer-section">
          <h5>EXPERIENCE APP</h5>
          <div className="app-buttons">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />
            </a>
          </div>
        </div>

        {/* Section 3 - Newsletter */}
        <div className="footer-section">
          <h5>STAY UPDATED</h5>
          <p className="newsletter-text">Get latest offers & updates</p>

          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>

          {message && <p className="msg">{message}</p>}
        </div>

        {/* Section 4 - Social */}
        <div className="footer-section">
          <h5>FOLLOW US</h5>
          <div className="social-icons">
            <a href="https://www.facebook.com/">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/">
              <FaInstagram />
            </a>
            <a href="https://x.com/?utm_source=chatgpt.com">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/shaikh-aaquib/">
              <FaLinkedin />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="trust">
            <p>✔ 100% Secure Payments</p>
            <p>✔ Easy Returns</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Trendify. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
