import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await axios.post('http://authenticationapi-eight.vercel.app/auth/login', { email, password });
      // console.log(res?.data);

    if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.jwtToken); // ✅ Save token here
        toast.success("Login successful!");
        navigate("/home");
}

      else {
        toast.error(res?.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error?.details?.[0]?.message ||
        error.response?.data?.message ||
        "Server error"
      );
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
