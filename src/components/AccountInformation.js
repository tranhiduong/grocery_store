import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AccountInformation = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    userPhoneNumber: '',
    userFullName: '',
    userAddress: '',
    userDateOfBirth: ''
  });

  // Update form data if currentUser changes
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
    console.log('Form data submitted:', payload);

    // try {
    //   const response = await fetch('https://testdeploy.up.railway.app/api/v1/user/update', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${currentUser.token}`
    //     },
    //     body: JSON.stringify(payload)
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to update account information');
    //   }

    //   const result = await response.json();
    //   console.log('Account information updated successfully:', result);

    //   // Optionally show success message or redirect
    // } catch (error) {
    //   console.error('Error updating account information:', error);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div> */}
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
  );
};

export default AccountInformation;
