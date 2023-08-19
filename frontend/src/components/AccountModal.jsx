import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

function CreateAccountModal({ isOpen, onClose, onSubmit }) {
  const [account, setAccount] = useState({
    accountName: "",
    accountType: "",
    balance: null,
    budget: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(account);
  };

  const handleOnChange = (account) => {
    setAccount((acc) => ({
      ...acc,
      [account.target.name]: account.target.value,
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      setAccount({
        accountName: "",
        accountType: "",
        balance: null,
        budget: null,
      });
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
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
              <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
              <span>
                <GrClose className="cursor-pointer" onClick={() => onClose()} />
              </span>
            </div>
            <input
              type="text"
              placeholder="Account Name"
              name="accountName"
              value={account.accountName}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <input
              type="text"
              placeholder="Account Type"
              name="accountType"
              value={account.accountType}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <input
              type="number"
              placeholder="Balance"
              name="balance"
              value={account.balance}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <input
              type="number"
              placeholder="Budget"
              name="budget"
              value={account.budget}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <button
              type="submit"
              className=" bg-blue-500 text-white p-2 rounded
              w-auto
              "
            >
              Create Account
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateAccountModal;
