import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // onLogin(); // Call the callback to update authentication state
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded border border-gray-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded border border-gray-200"
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="text-start mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
        {/* <p className="text-start mt-2">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot password?
          </Link>
        </p> */}
      </form>
    </div>
  );
}

export default Login;
