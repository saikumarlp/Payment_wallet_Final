import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      const { upi_id, message, balance, name } = res.data;

      const userObj = {
        email,
        name: name || 'JustPay User',
        upi_id,
        balance,
        photo: profile || 'https://i.pravatar.cc/150?img=3'
      };

      localStorage.setItem('user', JSON.stringify(userObj));
      if (remember) localStorage.setItem('rememberEmail', email);
      else localStorage.removeItem('rememberEmail');

      toast.success(message || 'Login successful!', { position: 'top-center' });

      setTimeout(() => {
        navigate('/transaction');
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMsg, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow p-4 animate__animated animate__fadeIn">
            <h2 className="text-center text-primary mb-3">Login to <strong>JustPay</strong></h2>

            <form onSubmit={handleSubmit}>

              {/* Email */}
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

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPass ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                  >
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Profile Picture (optional) */}
              <div className="mb-3">
                <label className="form-label">Profile Image URL (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Paste profile picture URL"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                />
              </div>

              {/* Remember Me */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember my email
                </label>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Link to Signup */}
            <p className="text-center mt-3">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
