import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

function CreateTransactionModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  handleCategorySubmit,
}) {
  const handleSubmit = (values) => {
    // Call the onSubmit handler and pass the form values
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
          label="Category"
          name="name"
          rules={[
            { required: true, message: "Please enter the category name" },
          ]}
        >
          <Input type="text" className="w-full" />
        </Form.Item>

        <div className="flex justify-start mt-4">
          <Button onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 hover:text-white"
          >
            Create Category
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CreateTransactionModal;
