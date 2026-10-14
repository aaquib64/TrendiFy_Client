import React from "react";
import "./Coupon.css";
import Capture from "../../Images/Capture.PNG";
import { Link } from "react-router-dom";

const Coupon = () => {
  return (
    <div className="coupon-container">
      <Link>
        <img src={Capture} alt="Coupon" className="coupon-img" />
      </Link>
    </div>
  );
};

export default Coupon;
