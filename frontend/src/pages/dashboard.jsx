import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransanctionList";
import { toast } from "react-toastify";
import CreateAccountModal from "../components/AccountModal";
import { Form } from "antd";
import axios from "axios";
import { logout } from "../services/api";
import { RxAvatar } from "react-icons/rx";

import { Link } from "react-router-dom";

function Dashboard() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [form] = Form.useForm();

  const handleAccountSelect = (accountId, accountName) => {
    setSelectedAccount(accountId);
    setSelectedName(accountName);
  };

  const openAccountModal = () => {
    setIsAccountOpen(true);
  };

  const closeAccountModal = () => {
    setIsAccountOpen(false);
  };

  const getAccounts = async () => {
    try {
      const res = await axios.get("accounts");
      if (res.status === 200) {
        setAccounts(res?.data?.accounts);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleAccountSubmit = async (formData) => {
    try {
      const response = await axios.post("accounts", formData);
      if (response.status === 201) {
        location.reload();
        toast.success(response.data.message);
        closeAccountModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            {/* <h1 className="text-2xl font-semibold mb-4">Dashboard</h1> */}

            <h1 className="text-2xl font-semibold mb-1">
              {selectedAccount && (
                <>
                  <span className="text-lg">Total Balance: </span>
                  <span className="text-blue-500">
                    {
                      accounts?.find((acc) => acc._id === selectedAccount)
                        ?.balance
                    }
                  </span>
                </>
              )}
            </h1>
            <h1 className="text-2xl font-semibold mb-4">
              {selectedAccount && (
                <>
                  <span className="text-lg">Total Budget: </span>
                  <span className="text-blue-500">
                    {
                      accounts?.find((acc) => acc._id === selectedAccount)
                        ?.budget
                    }
                  </span>
                </>
              )}
            </h1>
          </div>

          <ul
            className="flex items-center space-x-1 flex-col"
            style={{ listStyle: "none" }}
          >
            <div className="mb-1">
              <RxAvatar size={40} className="rounded-full" />
            </div>

            <Link
              href="#"
              onClick={() => logout()}
              className="text-red-500 underline cursor-pointer"
            >
              Logout
            </Link>
          </ul>
        </div>

        <div className="space-x-2 mb-4 flex flex-wrap space-y-2">
          {accounts.length === 0 ? (
            <div className="flex justify-between items-center w-full">
              <p className="text-red-500">No accounts found</p>
              <button
                onClick={openAccountModal}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
              >
                New Account
              </button>
            </div>
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
      <CreateAccountModal
        isOpen={isAccountOpen}
        onClose={closeAccountModal}
        onSubmit={handleAccountSubmit}
      />
    </div>
  );
}

export default Dashboard;
