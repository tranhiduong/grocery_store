// src/pages/ManageAccount.js

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ManageAccount = () => {
  const { user, manageAccount } = useAuth();

  const handleManageAccount = () => {
    // Replace with actual manage account logic
    manageAccount();
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Manage Account</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleManageAccount} className="btn btn-primary px-4 py-2 rounded-md text-white mt-4">
        Manage Account
      </button>
    </div>
  );
};

export default ManageAccount;
