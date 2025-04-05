import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill in all fields", { position: "top-center" });
      return;
    }

    setLoading(true);
    const user = { name, email, password };

    try {
      const res = await axios.post('http://localhost:5000/api/signup', user);
      toast.success(res.data.message || 'Signup successful', { position: "top-center" });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error signing up. Try again.';
      toast.error(errorMsg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow-lg p-4 border-0 rounded-4">
            <h2 className="card-title text-center text-success mb-4">Create an Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login" className="link-primary">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
