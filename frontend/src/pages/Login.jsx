import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // =========================================
  // LOGIN
  // =========================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {

      setError(
        "Please enter your email and password."
      );

      return;
    }

    try {

      setLoading(true);

      const API_URL =
      import.meta.env.VITE_API_URL ||
      "https://women-safety-ai-system.onrender.com";
      const response = await fetch(
      `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Invalid email or password."
        );

        return;
      }


      // =====================================
      // SAVE AUTHENTICATION
      // =====================================

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Remember me
      if (rememberMe) {

        localStorage.setItem(
          "rememberMe",
          "true"
        );

      } else {

        localStorage.removeItem(
          "rememberMe"
        );

      }


      // Go to dashboard

      navigate("/dashboard");

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">


      {/* ================================= */}
      {/* LEFT SIDE */}
      {/* ================================= */}

      <div className="login-left">

        <div className="login-brand">

          <div className="login-brand-icon">
            🛡️
          </div>

          <h1>
            Women Safety AI
          </h1>

          <p>
            Intelligent protection through real-time
            monitoring and AI-powered threat detection.
          </p>

        </div>


        <div className="login-features">

          <div className="login-feature">

            <div>
              ❤️
            </div>

            <span>
              Real-time Health Monitoring
            </span>

          </div>


          <div className="login-feature">

            <div>
              📍
            </div>

            <span>
              GPS Location Tracking
            </span>

          </div>


          <div className="login-feature">

            <div>
              🚨
            </div>

            <span>
              AI-powered Emergency Alerts
            </span>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* RIGHT SIDE */}
      {/* ================================= */}

      <div className="login-right">

        <div className="login-card">

          <div className="login-logo">
            🛡️
          </div>


          <h2>
            Guardian Login
          </h2>


          <p className="login-subtitle">
            Sign in to access the safety monitoring dashboard
          </p>


          <form onSubmit={handleLogin}>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
              />

            </div>


            {/* ERROR */}

            {error && (

              <div className="login-error">
                ⚠️ {error}
              </div>

            )}


            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember-option">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                  disabled={loading}
                />

                <span>
                  Remember me
                </span>

              </label>


              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  setError(
                    "Password recovery will be added later."
                  )
                }
              >
                Forgot Password?
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Login"}

            </button>


          </form>


          <div className="login-security">
            🔒 Secure Guardian Access
          </div>


          <p className="login-footer">
            Women Safety AI System
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;