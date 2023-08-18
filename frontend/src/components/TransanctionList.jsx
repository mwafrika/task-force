import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Collapse } from "antd";
import CreateTransactionModal from "../components/TransanctionModal";
import CreateCategoryModal from "../components/CategoryModal";
import CreateSubcategoryModal from "../components/SubCategoryModal";
import CreateAccountModal from "../components/AccountModal";
import { toast } from "react-toastify";
import axios from "axios";

function TransactionList({ accountId, accountName }) {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();

  const { Panel } = Collapse;
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handlePanelChange = (panelKey) => {
    setExpandedPanel(panelKey === expandedPanel ? null : panelKey);
  };

  const getTransactions = async () => {
    try {
      const response = await axios.get(`accounts/${accountId}/transactions`);
      const categories = await axios.get("categories");

      setCategories(categories.data.categories);
      setTransactions(response.data);
      form.setFieldsValue({ accountId: accountId });
    } catch (error) {
      toast.error(error.response.data.message);
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
        <Collapse
          bordered={false}
          activeKey={expandedPanel}
          onChange={handlePanelChange}
        >
          <Panel
            header="More Actions"
            key="1"
            className="bg-gray-100 text-blue-500 hover:underline cursor-pointer border border-gray-200 rounded-lg 
            "
          >
            {/* grid grid-cols-3 gap-4 */}
            <div className="flex justify-end gap-x-4">
              {/* simplify the buttons below */}

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
