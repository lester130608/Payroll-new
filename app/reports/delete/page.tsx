"use client";

import { useState, useEffect } from "react";

interface Report {
  id: string;
  name: string;
}

export default function DeleteReportPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>("");

  // Simulamos carga de reportes (más adelante vendrá de Supabase)
  useEffect(() => {
    setReports([
      { id: "1", name: "Monthly Payroll" },
      { id: "2", name: "Quarterly Expenses" },
      { id: "3", name: "Annual Revenue" },
    ]);
  }, []);

  const handleDelete = () => {
    if (!selectedReport) {
      alert("Please select a report to delete.");
      return;
    }

    // Simulación de eliminación
    const updatedReports = reports.filter((report) => report.id !== selectedReport);
    setReports(updatedReports);
    setSelectedReport("");
    alert("Report deleted successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Delete Report</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <label className="block font-medium mb-2">Select Report to Delete:</label>
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">-- Select a Report --</option>
          {reports.map((report) => (
            <option key={report.id} value={report.id}>
              {report.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Delete Report
        </button>
      </div>
    </div>
  );
}
