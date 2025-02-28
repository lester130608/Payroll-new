"use client";

import { useState, useEffect } from "react";
import { fetchReports } from "@/lib/reportsService";

export default function ReportsCreatePage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports().then((data) => {
      console.log("✅ Report data received:", data);
      setReports(data);
    });
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report, index) => (
            <li key={index}>{report.title}</li>
          ))}
        </ul>
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
}