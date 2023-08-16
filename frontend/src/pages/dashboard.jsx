import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransanctionList";

function Dashboard() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const handleAccountSelect = (accountId) => {
    setSelectedAccount(accountId);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/accounts")
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="space-x-2 mb-4">
          {accounts.map((account) => (
            <button
              key={account.id}
              className={`px-4 py-2 rounded-lg shadow-lg ${
                selectedAccount === account.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleAccountSelect(account.id)}
            >
              {account.name}
            </button>
          ))}
        </div>
        {selectedAccount && <TransactionList accountId={selectedAccount} />}
      </div>
    </div>
  );
}

{
  /* <button
onClick={() => handleAccountSelect("account1")}
className="px-4 py-2 bg-blue-500 text-white rounded"
>
Account 1
</button> */
}

export default Dashboard;
