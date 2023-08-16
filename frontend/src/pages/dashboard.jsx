import React, { useState } from "react";
import TransactionList from "../components/TransanctionList";

function Dashboard() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAccountSelect = (accountId) => {
    setSelectedAccount(accountId);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="space-x-2 mb-4">
          <button
            onClick={() => handleAccountSelect("account1")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Account 1
          </button>
          <button
            onClick={() => handleAccountSelect("account2")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Account 2
          </button>
        </div>
        {selectedAccount && <TransactionList accountId={selectedAccount} />}
      </div>
    </div>
  );
}

export default Dashboard;
