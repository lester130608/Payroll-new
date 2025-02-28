"use client";

import { useState, useEffect } from "react";
import { fetchReports } from "@/lib/reportsService";

interface Report {
  id: string;
  title: string;
}

export default function ReportsCreatePage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports()
      .then((data) => {
        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error("❌ Unexpected data format:", data);
          setReports([]);
        }
      })
      .catch((error) => console.error("❌ Error fetching reports:", error));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>{report.title}</li>
          ))}
        </ul>
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
}