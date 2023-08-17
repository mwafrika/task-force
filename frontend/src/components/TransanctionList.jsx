import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import CreateTransactionModal from "../components/TransanctionModal";

function TransactionList({ accountId, accountName }) {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/accounts/${accountId}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSubmit = async (formData) => {
    console.log("Create transaction:", formData);
  };

  useEffect(() => {
    getTransactions();
  }, [accountId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Transactions for Account{" "}
        <span className="text-green-500">{accountName}</span>
      </h2>
      <ul className="divide-y divide-gray-300">
        {transactions.map((transaction) => (
          <li key={transaction._id} className="py-2">
            <span
              className={`text-sm ${
                transaction.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {transaction.type.toUpperCase()}
            </span>
            <span className="ml-2">{transaction.amount}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-x-4">
        <Link
          to={`/report/${accountId}`}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
        >
          Generate Transaction Report
        </Link>
        <button
          onClick={openModal}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
        >
          Create New Transaction
        </button>

        <CreateTransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleTransactionSubmit}
          accountId={accountId}
        />
      </div>
    </div>
  );
}

export default TransactionList;
