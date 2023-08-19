import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Collapse } from "antd";
import CreateTransactionModal from "../components/TransanctionModal";
import CreateCategoryModal from "../components/CategoryModal";
import CreateSubcategoryModal from "../components/SubCategoryModal";
import CreateAccountModal from "../components/AccountModal";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function TransactionList({ accountId, accountName }) {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const { Panel } = Collapse;
  const [expandedPanel, setExpandedPanel] = useState(false);

  const handlePanelChange = () => {
    setExpandedPanel((prevExpanded) => !prevExpanded);
  };

  axios.defaults.baseURL = "http://localhost:5000/api/";

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`accounts/${accountId}/transactions`);
      const categories = await axios.get("categories");

      setCategories(categories.data.categories);
      setTransactions(response.data);
      form.setFieldsValue({ accountId: accountId });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openCategoryModal = () => {
    setIsCategoryOpen(true);
  };
  const openSubCategoryModal = () => {
    setIsSubCategoryOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeCategoryModal = () => {
    setIsCategoryOpen(false);
  };

  const closeSubCategoryModal = () => {
    setIsSubCategoryOpen(false);
  };

  const openAccountModal = () => {
    setIsAccountOpen(true);
  };

  const closeAccountModal = () => {
    setIsAccountOpen(false);
  };

  const handleTransactionSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `accounts/${accountId}/transactions`,
        formData
      );

      if (response.status === 201) {
        getTransactions();
        toast.success(response.data.message);
        closeModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCategorySubmit = async (formData) => {
    try {
      const response = await axios.post("categories", formData);

      if (response.status === 201) {
        getTransactions();
        toast.success(response.data.message);
        closeCategoryModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubCategorySubmit = async (formData) => {
    try {
      const response = await axios.post("subcategories", formData);

      if (response.status === 201) {
        getTransactions();
        toast.success(response.data.message);
        closeSubCategoryModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
    getTransactions();
  }, [accountId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-red-500">No transactions found</p>
      ) : (
        <ul className="divide-y divide-gray-300 max-h-96 overflow-y-auto no-scrollbar flex-1">
          <li className="py-2 flex justify-start items-center gap-x-16 w-full bg-gray-100 px-4 sticky top-0">
            <span className="text-sm font-semibold w-1/4">Type</span>
            <span className="text-sm font-semibold w-1/4">Amount</span>
            <span className="text-sm font-semibold w-1/4">Category</span>
            <span className="text-sm font-semibold w-1/4">Actions</span>
          </li>
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="py-2 flex justify-start items-center gap-x-16 px-4 w-full"
            >
              <span
                className={`text-sm w-1/4 ${
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type.toUpperCase()}
              </span>
              <span className="text-sm w-1/4">{transaction.amount}</span>
              <span className="text-sm w-1/4">{transaction.category.name}</span>
              {/* actions */}
              <div className="flex w-1/4 gap-x-4">
                <Link
                  to={`/transactions/${transaction._id}`}
                  className="text-green-500 hover:underline cursor-pointer"
                >
                  <FaEye />
                </Link>
                <Link
                  to={`/transactions/${transaction._id}/edit`}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  <FaEdit />
                </Link>
                <Link
                  to={`/transactions/${transaction._id}/delete`}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  <FaTrash />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-end gap-x-4">
        <Collapse
          bordered={false}
          activeKey={expandedPanel ? "1" : []}
          onChange={handlePanelChange}
        >
          <Panel
            header={expandedPanel ? "Show Less actions" : "Show More actions"}
            key="1"
            className="bg-gray-100 text-blue-500 hover:underline cursor-pointer border border-gray-200 rounded-lg 
            "
          >
            {/* grid grid-cols-3 gap-4 */}
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

              <button
                onClick={openAccountModal}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
              >
                New Account
              </button>

              <button
                onClick={openCategoryModal}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
              >
                New Category
              </button>

              <button
                onClick={openSubCategoryModal}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block"
              >
                New Sub Category
              </button>
            </div>
          </Panel>
        </Collapse>

        <CreateTransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleTransactionSubmit}
          accountId={accountId}
          categories={categories}
          form={form}
        />

        <CreateCategoryModal
          isOpen={isCategoryOpen}
          onClose={closeCategoryModal}
          onSubmit={handleCategorySubmit}
          form={form}
        />

        <CreateSubcategoryModal
          isOpen={isSubCategoryOpen}
          onClose={closeSubCategoryModal}
          onSubmit={handleSubCategorySubmit}
          categories={categories}
          form={form}
        />

        <CreateAccountModal
          isOpen={isAccountOpen}
          onClose={closeAccountModal}
          onSubmit={handleAccountSubmit}
          form={form}
        />
      </div>
    </div>
  );
}

export default TransactionList;
