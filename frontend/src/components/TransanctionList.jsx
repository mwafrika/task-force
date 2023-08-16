import React, { useEffect, useState } from "react";
import axios from "axios";

function TransactionList({ accountId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/accounts/${accountId}/transactions`)
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [accountId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Transactions for Account {accountId}
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
    </div>
  );
}

export default TransactionList;
