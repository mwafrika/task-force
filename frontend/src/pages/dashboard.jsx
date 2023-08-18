import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransanctionList";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const handleAccountSelect = (accountId, accountName) => {
    setSelectedAccount(accountId);
    setSelectedName(accountName);
  };

  // add Bearer authorization header to axios

  const getAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/accounts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAccounts(res.data.accounts);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="space-x-2 mb-4 flex flex-wrap">
          {accounts.length === 0 ? (
            <p className="text-red-500">No accounts found</p>
          ) : (
            accounts?.map((account, index) => (
              <button
                key={account._id}
                className={`px-4 py-2 rounded-lg shadow-lg ${
                  selectedAccount === account._id ||
                  (index === 0 && !selectedAccount)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() =>
                  handleAccountSelect(account._id, account.accountName)
                }
              >
                {account.accountName}
              </button>
            ))
          )}
        </div>
        {selectedAccount && (
          <TransactionList
            accountId={selectedAccount}
            accountName={selectedName}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
