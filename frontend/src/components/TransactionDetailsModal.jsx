import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
const TransactionDetailsModal = ({ transaction, onClose, isOpen }) => {
  return (
    isOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  {transaction.type === "income" ? (
                    <span className=" text-green-800">
                      <FaPlus />
                    </span>
                  ) : (
                    <span className=" text-red-800">
                      <FaMinus />
                    </span>
                  )}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {transaction?.type?.toUpperCase()}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <b>Amount</b>: {transaction.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      <b>Category</b>: {transaction.category.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <b>Date</b>: {transaction.createdAt.slice(0, 10)}
                    </p>

                    <p className="text-sm text-gray-500">
                      <b>Note</b>: {transaction.note || "No note"}
                    </p>

                    <p
                      className={`text-sm text-gray-500 ${
                        transaction?.category?.subcategories.length === 0
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <b>Subcategories</b> :{" "}
                      {transaction?.category.subcategories
                        .map((sub) => sub.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TransactionDetailsModal;
