import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Home() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // also remove token on logout
    setUser(null);
    navigate('/login');
    toast.success("Logout successful!");
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found in localStorage');
        return;
      }

      const res = await axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">
          Welcome{user?.name ? `, ${user.name}` : ''}!
        </h1>
        <p className="text-gray-600 mb-4">You're now logged in.</p>

        <div>
          {products.length === 0 && <p>No products found.</p>}
          {products.map((item, index) => (
            <ul key={index} className="mb-2 border p-2 rounded">
              <li><strong>Name:</strong> {item.name}</li>
              <li><strong>Price:</strong> ${item.price}</li>
            </ul>
          ))}
        </div>

        {user && (
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;


