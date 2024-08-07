import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual sign-up logic, e.g., creating a new user
      await signIn(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };

  return (
    <div className="relative items-center justify-center mx-auto min-w-[375px] max-w-[1600px] h-[calc(100vh-72px-1.5rem)]">
      <div className="mx-auto w-full max-w-md p-8 space-y-6 bg-white border rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="btn btn-primary text-white w-full">Sign Up</button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
