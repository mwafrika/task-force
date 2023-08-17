import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form } from "antd";
import CreateTransactionModal from "../components/TransanctionModal";

function TransactionList({ accountId, accountName }) {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [form] = Form.useForm();
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

      const categories = await axios.get(
        `http://localhost:5000/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(categories.data.categories);
      setTransactions(response.data);
      form.setFieldsValue({ accountId: accountId });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  console.log("Categories", categories);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTransactionSubmit = async (formData) => {
    console.log("Create transaction:", formData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/accounts/${accountId}/transactions`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        getTransactions();
        closeModal();
      }

      console.log("Transaction created:", response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [accountId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Transactions for <span className="text-green-500">{accountName}</span>{" "}
        Account.
      </h2>
      {transactions.length === 0 ? (
        <p className="text-red-500">No transactions found</p>
      ) : (
        <ul className="divide-y divide-gray-300 max-h-96 overflow-y-auto no-scrollbar">
          <li className="py-2 flex flex-1 justify-start gap-x-16 w-auto bg-gray-100 px-4 sticky top-0">
            <span className="text-sm font-semibold">Type</span>
            <span className="text-sm font-semibold">Amount</span>
          </li>
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="py-2 flex justify-start flex-1 gap-x-8 px-4"
            >
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
      )}

      <div className="flex justify-end gap-x-4">
        {transactions.length > 0 && (
          <Link
            to={`/report/${accountId}`}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
          >
            Transaction Report
          </Link>
        )}

        <button
          onClick={openModal}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
        >
          New Transaction
        </button>

        <CreateTransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleTransactionSubmit}
          accountId={accountId}
          categories={categories}
          form={form}
        />
      </div>
    </div>
  );
}

export default TransactionList;
