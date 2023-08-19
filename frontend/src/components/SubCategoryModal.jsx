import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

function CreateSubCategoryModal({ isOpen, onClose, onSubmit, categories }) {
  const [subCategory, setsubCategory] = useState({
    name: "",
    categoryId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(subCategory);
  };

  const handleOnChange = (subcat) => {
    setsubCategory((acc) => ({
      ...acc,
      [subcat.target.name]: subcat.target.value,
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      setsubCategory({
        amount: null,
        category: "",
        type: "",
        note: "",
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
              <h2 className="text-2xl font-semibold mb-4">
                Create Sub Category
              </h2>
              <span>
                <GrClose className="cursor-pointer" onClick={() => onClose()} />
              </span>
            </div>
            <input
              type="text"
              placeholder="Sub Category"
              name="name"
              value={subCategory.name}
              onChange={handleOnChange}
              className="w-full mb-4 p-2 rounded border border-gray-200"
            />

            <select
              name="categoryId"
              value={subCategory.categoryId}
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

            <button
              type="submit"
              className=" bg-blue-500 text-white p-2 rounded
              w-auto
              "
            >
              Create Sub Category
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateSubCategoryModal;
