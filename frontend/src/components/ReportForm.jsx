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

const TransactionReport = ({ reportData }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={reportData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const ReportForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const { accountId } = useParams();

  const fetchReportData = async () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const response = await axios.get(
        `report/${accountId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
      );

      if (response.status === 200) {
        setReportData([
          { name: "Total Income", value: response.data.totalIncome },
          { name: "Total Expense", value: response.data.totalExpense },
          { name: "Net Balance", value: response.data.netBalance },
        ]);

        toast.success("Report generated successfully");
      }
    } catch (error) {
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
      {reportData.length > 0 && <TransactionReport reportData={reportData} />}
    </div>
  );
};

export default ReportForm;
