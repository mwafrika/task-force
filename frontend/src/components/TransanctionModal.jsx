import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

function CreateTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  accountId,
  categories,
  isEdit,
  selectedTransaction,
}) {
  const [transanction, setTransanction] = useState({
    amount: null,
    category: "",
    type: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(transanction);
  };

  const handleOnChange = (account) => {
    setTransanction((acc) => ({
      ...acc,
      [account.target.name]: account.target.value,
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      setTransanction({
        amount: null,
        category: "",
        type: "",
        note: "",
      });
    }
  }, [isOpen]);

  // Create
  useEffect(() => {
    if (isEdit && selectedTransaction) {
      setTransanction(selectedTransaction);
    } else {
      setTransanction({
        amount: "",
        category: "",
        type: "",
        note: "",
      });
    }
  }, [isEdit, selectedTransaction]);

  return (
    <div>
      {(isOpen || isEdit) && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50
        bg-black bg-opacity-50
        "
        >
          <form
            className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md border border-gray-100"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-4">
                Create Transaction
              </h2>
              <span>
                <GrClose className="cursor-pointer" onClick={() => onClose()} />
              </span>
            </div>
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={transanction.amount}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <input
              type="text"
              placeholder="accountId"
              name="accountId"
              value={accountId}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200 hidden"
            />

            <select
              name="category"
              value={transanction.category}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              name="type"
              value={transanction.type}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            >
              <option value="">Select Type</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <textarea
              type="text"
              placeholder="Note"
              name="note"
              value={transanction.note}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <button
              type="submit"
              className=" bg-blue-500 text-white p-2 rounded
              w-auto
              "
            >
              Create Transaction
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateTransactionModal;
