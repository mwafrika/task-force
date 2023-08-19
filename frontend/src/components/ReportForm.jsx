import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransactionReport = ({ reportData, transactions }) => (
  <>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={reportData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Transaction Details</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Subcategory</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const subcategoryNames = transaction?.category?.subcategories
              ?.map((subcategory) => subcategory.name)
              .join(", ");
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">
                  {transaction.category.name}
                </td>
                <td className="border px-4 py-2">{subcategoryNames || "-"}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

const ReportForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState([]);

  axios.defaults.baseURL = "http://localhost:5000/api/";

  const fetchReportData = async () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const response = await axios.get(
        `report/${accountId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
      );

      if (response.status === 200) {
        const reportData = [
          { name: "Total Income", value: response.data.totalIncome },
          { name: "Total Expense", value: response.data.totalExpense },
          { name: "Net Balance", value: response.data.netBalance },
        ];

        setTransactions(response.data.transactions);

        response.data.transactions.forEach((transaction) => {
          const { type, amount, category } = transaction;

          const subcategoryNames = category.subcategories.map((subcat) => {
            return subcat.name;
          });

          const subcategoryNamesString = subcategoryNames
            .filter(Boolean)
            .join(", ");

          const transactionName = `${
            type.charAt(0).toUpperCase() + type.slice(1)
          }: ${category.name}`;

          const finalTransactionName = subcategoryNamesString
            ? `${transactionName} - ${subcategoryNamesString}`
            : transactionName;

          console.log(finalTransactionName, "subcategory");

          reportData.push({
            name: finalTransactionName,
            value: amount,
          });
        });

        setReportData(reportData);
        toast.success("Report generated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex items-center mb-4">
        <label className="mr-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-1 rounded"
        />
      </div>
      <div className="flex items-center mb-4">
        <label className="mr-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-1 rounded"
        />
      </div>
      <button
        onClick={() => fetchReportData()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Report
      </button>
      {reportData.length > 0 && (
        <TransactionReport
          reportData={reportData}
          transactions={transactions}
        />
      )}
    </div>
  );
};

export default ReportForm;
