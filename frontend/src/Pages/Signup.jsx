import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
 import axios from 'axios';
 import { toast } from 'react-toastify';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
  const { name, email, password } = formData;
  try {
    const res = await axios.post('https://authenticationapi-eight.vercel.app/auth/signup', { name, email, password });

    const sentData = JSON.parse(res.config.data);
    // console.log("Sent Name:", sentData.name); 
    // console.log("Returned User:", res.data.user); 

    if (res.data.success) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success("Signup successful!");
      navigate("/home");
    } else {
      toast.error(res.data.message || "Signup failed");
    }
  } catch (error) {
    // console.log("Signup Error:", error);
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
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border rounded px-3 py-2"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          Sign Up
        </button>
        <div className="text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </div>
      </form>
    </div>
  </div>
);

};

export default Signup;
