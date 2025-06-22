import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Auth.css";

interface AuthProps {
  isLogin: boolean;
}

const Auth: React.FC<AuthProps> = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (
        savedUser.email === formData.email &&
        savedUser.password === formData.password
      ) {
        navigate(savedUser.role === "seller" ? "/seller" : "/buyer");
      } else {
        setError("Invalid email or password");
      }
    } else {
      localStorage.setItem("user", JSON.stringify(formData));
      navigate(formData.role === "seller" ? "/seller" : "/buyer");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-heading">Registration Page</h2>
        <div className="tabs">
          <div
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => navigate("/login")}
          >
            Login
          </div>
          <div
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            Sign Up
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          {!isLogin && (
            <select name="role" onChange={handleChange} required>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>

          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="link-switch"
              onClick={() => navigate(isLogin ? "/" : "/login")}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
