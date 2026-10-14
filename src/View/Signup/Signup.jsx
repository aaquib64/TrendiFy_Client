import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { signupUser } from "../Utils/api";
import "./Signup.css";

const Signup = () => {
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    setLoading(true);

    try {
      const userData = await signupUser({
        name,
        email,
        password,
      });

      login(userData);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="trendify-signup-page">
      <section className="trendify-signup-shell">
        {/* Left branding panel */}
        <div className="trendify-signup-visual">
          <Link to="/" className="trendify-signup-logo">
            TRENDIFY<span>.</span>
          </Link>

          <div className="trendify-signup-visual-content">
            <span className="trendify-signup-eyebrow">
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h1>
              Find your
              <br />
              <span>own style.</span>
            </h1>

            <p>
              Create your account and discover fashion that fits your
              personality, your lifestyle, and your everyday moments.
            </p>

            <div className="trendify-signup-decoration" aria-hidden="true">
              <span className="trendify-signup-circle signup-circle-one" />
              <span className="trendify-signup-circle signup-circle-two" />
              <span className="trendify-signup-circle signup-circle-three" />
              <span className="trendify-signup-decoration-text">
                BE ORIGINAL
              </span>
            </div>
          </div>

          <p className="trendify-signup-visual-footer">
            YOUR EVERYDAY FASHION DESTINATION
          </p>
        </div>

        {/* Right signup form */}
        <div className="trendify-signup-form-panel">
          <div className="trendify-signup-form-container">
            <div className="trendify-signup-mobile-logo">
              <Link to="/" className="trendify-signup-logo">
                TRENDIFY<span>.</span>
              </Link>
            </div>

            <div className="trendify-signup-heading">
              <span className="trendify-signup-eyebrow">JOIN TRENDIFY</span>

              <h2>Create your account</h2>

              <p>Sign up to explore the latest fashion trends.</p>
            </div>

            {error && (
              <div className="trendify-signup-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="trendify-signup-field">
                <label htmlFor="signup-name">Full name</label>

                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="trendify-signup-field">
                <label htmlFor="signup-email">Email address</label>

                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="trendify-signup-field">
                <label htmlFor="signup-password">Password</label>

                <div className="trendify-signup-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="trendify-signup-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="trendify-signup-submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <p className="trendify-signup-switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <p className="trendify-signup-terms">
              Your account details help us provide a better shopping experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
