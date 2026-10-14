import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";
import LogoImg from "../../../Images/TrendiFy-logo.png";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="navbar-brand">
        <img
          src={LogoImg}
          alt="Trendify Logo"
          width="80"
          height="auto"
          className="img-fluid"
        />
      </Link>
    </div>
  );
};
export default Logo;

//src="https://www.freelogovectors.net/wp-content/uploads/2023/01/myntra-logo-freelogovectors.net_.png"
