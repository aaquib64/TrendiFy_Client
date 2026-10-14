import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { loginUser } from "../Utils/api";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);

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
      const userData = await loginUser({ email, password });
      login(userData);
    } catch (err) {
      setError(err?.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="trendify-auth-page">
      <section className="trendify-auth-shell">
        {/* Left branding panel */}
        <div className="trendify-auth-visual">
          <Link to="/" className="trendify-auth-logo">
            TRENDIFY<span>.</span>
          </Link>

          <div className="trendify-auth-visual-content">
            <span className="trendify-auth-eyebrow">
              YOUR STYLE. YOUR STORY.
            </span>

            <h1>
              Fashion that
              <br />
              feels like <span>you.</span>
            </h1>

            <p>
              Discover your style, explore new trends, and make every look your
              own.
            </p>

            <div className="trendify-auth-decoration" aria-hidden="true">
              <span className="trendify-auth-circle trendify-circle-one" />
              <span className="trendify-auth-circle trendify-circle-two" />
              <span className="trendify-auth-circle trendify-circle-three" />
              <span className="trendify-auth-decoration-text">STYLE</span>
            </div>
          </div>

          <p className="trendify-auth-visual-footer">
            YOUR EVERYDAY FASHION DESTINATION
          </p>
        </div>

        {/* Right login form */}
        <div className="trendify-auth-form-panel">
          <div className="trendify-auth-form-container">
            <div className="trendify-auth-mobile-logo">
              <Link to="/" className="trendify-auth-logo">
                TRENDIFY<span>.</span>
              </Link>
            </div>

            <div className="trendify-auth-heading">
              <span className="trendify-auth-eyebrow">WELCOME BACK</span>

              <h2>Login to your account</h2>

              <p>Enter your details to continue shopping.</p>
            </div>

            {error && (
              <div className="trendify-auth-error" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="trendify-auth-field">
                <label htmlFor="email">Email address</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="trendify-auth-field">
                <label htmlFor="password">Password</label>

                <div className="trendify-auth-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="trendify-auth-toggle"
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
                className="trendify-auth-submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <p className="trendify-auth-switch">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </p>

            <p className="trendify-auth-terms">
              By continuing, you agree to shop responsibly and keep your account
              details secure.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
