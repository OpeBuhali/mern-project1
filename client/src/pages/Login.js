import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Login form submitted:', form);
    
    try {
      // Request login ke backend
      const res = await axios.post('/login', form, { withCredentials: true });
      console.log('Response from server:', res.data); // Log response dari server

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('nama', res.data.user?.nama); 
        setMessage('Login sukses!');
        navigate('/dashboard');
      } else {
        console.log('Token tidak ditemukan dalam response.');
        setMessage('Token tidak ditemukan dalam respon server.');
      }
    } catch (err) {
      console.error('Error during login:', err.response?.data || err.message); // Log error dari server
      setMessage(err.response?.data?.message || 'Login gagal.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200 px-4">
      <div className="w-full max-w-md bg-green-100 border-4 border-black rounded-lg p-6 shadow-brutal">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
        
        {message && (
          <p className="mb-4 text-center text-sm text-red-500 font-semibold">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-400 text-white border-2 border-black rounded-md font-bold hover:bg-green-500 hover:text-black transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-black">
          Create an account?{' '}
          <Link
            to="/register"
            className="underline font-bold text-emerald-800 hover:text-emerald-950"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
