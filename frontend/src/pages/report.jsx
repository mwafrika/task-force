import React from "react";
import ReportForm from "../components/ReportForm";

const AccountReportPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Generate Report</h1>
      <ReportForm />
    </div>
  );
};

export default AccountReportPage;
