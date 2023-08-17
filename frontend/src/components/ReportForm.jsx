import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// get the accountId from the url parameter
import { useParams } from "react-router-dom";
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

  console.log("XXXXXXXX", accountId);

  const fetchReportData = async () => {
    const token = localStorage.getItem("token");
    const start = new Date(startDate);
    const end = new Date(endDate);
    const response = await axios.get(
      `http://localhost:5000/api/report/${accountId}?startDate=${start.toISOString()}&endDate=${end.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(startDate, "response.data", endDate);
    setReportData([
      { name: "Total Income", value: response.data.totalIncome },
      { name: "Total Expense", value: response.data.totalExpense },
      { name: "Net Balance", value: response.data.netBalance },
    ]);
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
