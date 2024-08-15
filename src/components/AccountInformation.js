import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AccountInformation = () => {
  const { currentUser, setUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    userPhoneNumber: '',
    userFullName: '',
    userAddress: '',
    userDateOfBirth: ''
  });

  useEffect(() => {
    if(currentUser){
      setFormData({
        userPhoneNumber: currentUser.phone || '',
        userFullName: currentUser.fullName || '',
        userAddress: currentUser.address || '',
        userDateOfBirth: currentUser.dateOfBirth || ''
      });
    }
  }, [currentUser]);

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
      const response = await fetch(`https://testdeploy.up.railway.app/api/v1/users/update-me/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.jwtToken}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setIsUpdateSuccess(true);
        const result = await response.json();
        setUser(result.data);
      } else {
        setIsUpdateSuccess(false);
      }
    } catch (error) {
      setIsUpdateSuccess(false);
      console.error('Update failed:', error);
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="userPhoneNumber"
            value={formData.userPhoneNumber}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="userFullName"
            value={formData.userFullName}
            onChange={handleChange}
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
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="userDateOfBirth"
            value={formData.userDateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="font-bold text-lg">
              {isUpdateSuccess ? 'Update Successful' : 'Update Failed'}
            </h3>
            <p className="py-4">
              {isUpdateSuccess
                ? 'Your account information has been updated successfully!'
                : 'There was an error updating your account information. Please try again.'}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-primary px-4 py-2 rounded-md text-white"
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

export default AccountInformation;
