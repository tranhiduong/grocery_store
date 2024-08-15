import React, { useState } from 'react';
import AccountInformation from '../components/AccountInformation';
import OrderList from '../components/OrderList';

const Account = () => {
  const [selectedTab, setSelectedTab] = useState('accountInfo');

  return (
    <div className="flex flex-col md:flex-row items-start mx-auto min-w-[375px] max-w-[1600px] h-full">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white border rounded mb-4 md:mb-0">
        <ul className="space-y-2">
          <li
            className={`block text-lg mb-1 text-left w-full btn btn-ghost btn-sm justify-start ${
              selectedTab === 'accountInfo' ? 'bg-blue-100' : ''
            }`}
            onClick={() => setSelectedTab('accountInfo')}
          >
            Account Information
          </li>
          <li
            className={`block text-lg mb-1 text-left w-full btn btn-ghost btn-sm justify-start ${
              selectedTab === 'orderList' ? 'bg-blue-100' : ''
            }`}
            onClick={() => setSelectedTab('orderList')}
          >
            Order List
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-full md:w-2/3 lg:w-3/4 px-4">
        {selectedTab === 'accountInfo' ? <AccountInformation /> : <OrderList />}
      </div>
    </div>
  );
};

export default Account;
