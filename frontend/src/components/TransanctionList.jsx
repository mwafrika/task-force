import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

function TransactionList({ accountId, accountName }) {
  const [transactions, setTransactions] = useState([]);

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
      <Link
        to={`/report/${accountId}`}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
      >
        Generate Transaction Report
      </Link>
    </div>
  );
}

export default TransactionList;
