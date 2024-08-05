import React, { useState } from 'react';

const AccountInformation = ({ user }) => {
  // Initialize form data from user props
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    phone: '123-456-7890',
    name: 'John Doe',
    address: '123 Main St',
    dob: '1990-01-01'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, e.g., API call
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default AccountInformation;
