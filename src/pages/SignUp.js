import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const { signIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signUpFailedContent, setSignUpFailedContent] = useState('');
  const [formData, setFormData] = useState(
    { 
      userFullName: '', 
      userAddress: '', 
      userPhoneNumber: '', 
      userPassword: '' 
    }
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData
    };
    try {
      const response = await fetch('https://testdeploy.up.railway.app/api/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      debugger;
      if (!response.ok) {
        setSignUpFailedContent(result.message);
        setIsModalOpen(true);
      }else{
        await signIn(formData.userPhoneNumber, formData.userPassword);
        navigate('/');
      }
      
      
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
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="userFullName"
              value={formData.userFullName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
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
          <button type="submit" className="btn btn-primary text-white w-full">Sign Up</button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Sign Up Failed
            </h3>
            <p className="py-4">
            {signUpFailedContent}
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

export default SignUp;
