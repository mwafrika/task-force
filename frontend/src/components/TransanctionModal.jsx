import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

function CreateTransactionModal({ isOpen, onClose, onSubmit, accountId }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // Call the onSubmit handler and pass the form values
    onSubmit(values);
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ accountId: accountId });
  }, [accountId]);

  return (
    <Modal
      title="Create New Transaction"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <Input type="number" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please enter the category" }]}
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item
          label="accountId"
          name="accountId"
          rules={[{ required: true, message: "Please enter the category" }]}
          className="hidden"
        >
          <Input className="w-full" />
        </Form.Item>
        <div className="flex justify-start mt-4">
          <Button onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            type="default"
            htmlType="submit"
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 hover:text-white"
          >
            Create Transaction
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CreateTransactionModal;
