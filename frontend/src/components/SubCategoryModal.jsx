import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

function CreateTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  categories,
}) {
  const handleSubmit = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen]);

  return (
    <Modal
      title="Create New Transaction"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Sub Category"
          name="name"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input type="text" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select className="w-full">
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-start mt-4">
          <Button onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 hover:text-white"
          >
            Create Sub Category
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CreateTransactionModal;
