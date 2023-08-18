import CreateTransactionModal from "../components/TransanctionModal";
import CreateCategoryModal from "../components/CategoryModal";
import CreateSubcategoryModal from "../components/SubCategoryModal";
import CreateAccountModal from "../components/AccountModal";
import apiService from "../services/api";
import { Form } from "antd";
import { toast } from "react-toastify";

const [form] = Form.useForm();
const [transactions, setTransactions] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isCategoryOpen, setIsCategoryOpen] = useState(false);
const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
const [isAccountOpen, setIsAccountOpen] = useState(false);
const [categories, setCategories] = useState([]);

export const getModalConfig = (accountId, categories, form) => {
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
      const response = await apiService(
        "POST",
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
      const response = await apiService("POST", "categories", formData);

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
      const response = await apiService("POST", "subcategories", formData);

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
      const response = await apiService("POST", "accounts", formData);

      if (response.status === 201) {
        location.reload();
        toast.success(response.data.message);
        closeAccountModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return {
    transaction: {
      name: "Transaction",
      open: openModal,
      close: closeModal,
      onSubmit: handleTransactionSubmit,
      component: CreateTransactionModal,
      props: { accountId, categories, form },
    },
    category: {
      name: "Category",
      open: openCategoryModal,
      close: closeCategoryModal,
      onSubmit: handleCategorySubmit,
      component: CreateCategoryModal,
      props: { form },
    },
    subCategory: {
      name: "Sub Category",
      open: openSubCategoryModal,
      close: closeSubCategoryModal,
      onSubmit: handleSubCategorySubmit,
      component: CreateSubcategoryModal,
      props: { categories, form },
    },
    account: {
      name: "Account",
      open: openAccountModal,
      close: closeAccountModal,
      onSubmit: handleAccountSubmit,
      component: CreateAccountModal,
      props: { form },
    },
  };
};
