import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FaUser, FaEnvelope, FaBoxOpen } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);

  
if (!user) {
  return (
    <div className="container py-5">
      <div className="text-center py-5">
        <div className="mb-3">
          <FaUser size={50} className="text-secondary" />
        </div>

        <h4 className="fw-bold">
          Please login to view your profile
        </h4>

        <p className="text-muted">
          Login to access your account information and orders.
        </p>

        <Link to="/login" className="btn premium-btn mt-2">
          Login
        </Link>
      </div>
    </div>
  );
}



  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            {/* Profile Header */}
            <div className="text-center p-4 border-bottom">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-light"
                style={{ width: "90px", height: "90px" }}
              >
                <FaUser size={40} />
              </div>

              <h3 className="fw-bold mb-1">{user.name}</h3>

              <p className="text-muted mb-0">
                Welcome to your Trendify account
              </p>
            </div>

            {/* Profile Details */}
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">Account Information</h5>

              {/* Name */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="text-secondary">
                  <FaUser size={20} />
                </div>

                <div>
                  <small className="text-muted d-block">Full Name</small>

                  <span className="fw-semibold">{user.name}</span>
                </div>
              </div>

              {/* Email */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="text-secondary">
                  <FaEnvelope size={20} />
                </div>

                <div>
                  <small className="text-muted d-block">Email Address</small>

                  <span className="fw-semibold">{user.email}</span>
                </div>
              </div>

              {/* Orders */}
              <Link
                to="/orders"
                className="btn premium-btn w-100 d-flex justify-content-center align-items-center gap-2"
              >
                <FaBoxOpen />
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
