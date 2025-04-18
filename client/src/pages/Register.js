// src/pages/Register.js
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate , Link} from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', form, {
        withCredentials: true
      });
      setMessage(res.data.message || 'Registrasi berhasil');
      navigate('/'); // redirect ke login setelah berhasil daftar
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registrasi gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200 px-4">
      <div className="w-full max-w-md bg-green-100 border-4 border-black rounded-lg p-6 shadow-brutal">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Register</h2>
        
        {message && (
          <p className="mb-4 text-center text-sm text-red-500 font-semibold">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-400 text-white border-2 border-black rounded-md font-bold hover:bg-green-500 hover:text-black transition-all duration-200"
          >
            Register
          </button>
        </form>
        {/* Link ke halaman login */}
        <p className="mt-6 text-center text-black">
          Have an account?{' '}
          <Link
            to="/login"
            className="underline font-bold text-emerald-800 hover:text-emerald-950"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
