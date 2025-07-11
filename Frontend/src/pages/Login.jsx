import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("name", res.data.name);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-green-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-2xl  p-8 border-none">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="./logo2.svg"
            alt="SwaMarg Logo"
            className="w-18"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <input
              id="username"
              name="username"type="username"
              onChange={handleChange}
              required="@gmail.com"
              placeholder="Email"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-600 text-gray-900 py-2 placeholder-gray-500"
            />
            <input
              id="password"
              name="password"
              onChange={handleChange}
              required="8"
              placeholder="Password"type="password"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-600 text-gray-900 py-2 placeholder-gray-500"
            />
          </div>
          

          <div className="text-sm">
            <p>
              No account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create one!
              </Link>
            </p>
            <p>
              <a href="#" className="text-blue-600 hover:underline">
                Can’t access your account?
              </a>
            </p>
          </div>

          <button
            type="submit"
            className="w-fit ml-auto px-6 py-2 bg-blue-600 text-white rounded-sm font-semibold hover:bg-blue-700 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
