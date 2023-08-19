import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

function CreateTransactionModal({ isOpen, onClose, onSubmit }) {
  const [form] = Form.useForm();
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
      title="Create New Account"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          accountName: "",
          accountType: "",
          balance: 0,
          budget: 0,
        }}
      >
        <Form.Item
          label="Account Name"
          name="accountName"
          rules={[{ required: true, message: "Please enter the account name" }]}
        >
          <Input type="text" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Account Type"
          name="accountType"
          rules={[{ required: true, message: "Please enter the account type" }]}
        >
          <Input type="text" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Balance"
          name="balance"
          rules={[{ required: true, message: "Please enter the Balance" }]}
        >
          <Input type="number" className="w-full" />
        </Form.Item>

        <Form.Item
          label="Budget"
          name="budget"
          rules={[{ required: true, message: "Please enter the Budget" }]}
        >
          <Input type="number" className="w-full" />
        </Form.Item>

        <div className="flex justify-start mt-4">
          <Button onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 hover:text-white"
          >
            Create Account
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CreateTransactionModal;
