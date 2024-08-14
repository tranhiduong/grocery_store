import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({ userPhoneNumber: '', userPassword: '' });
  const { signIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn(formData.userPhoneNumber, formData.userPassword);
      if(result === true){
        navigate('/');
      }else{
        setIsModalOpen(true);
      }
      
    } catch (error) {
      console.error('Failed to sign in', error);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative items-center justify-center mx-auto min-w-[375px] max-w-[1600px] h-[calc(100vh-72px-1.5rem)]">
      <div className="mx-auto w-full max-w-md p-8 space-y-6 bg-white border rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="userPhoneNumber"
              value={formData.userPhoneNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="btn btn-primary text-white w-full">Sign In</button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Sign In Failed
            </h3>
            <p className="py-4">
            Please Check Phone and Password.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-primary"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
