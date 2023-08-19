import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

function CreateTransactionModal({ isOpen, onClose, onSubmit }) {
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      name: category,
    };
    onSubmit(values);
  };

  useEffect(() => {
    if (!isOpen) {
      setCategory("");
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
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <span>
                <GrClose className="cursor-pointer" onClick={() => onClose()} />
              </span>
            </div>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <button
              type="submit"
              className=" bg-blue-500 text-white p-2 rounded
              w-auto
              "
            >
              Create Category
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateTransactionModal;
