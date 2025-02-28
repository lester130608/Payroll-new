"use client";

import { useState, useEffect } from "react";
import { fetchReports } from "@/lib/reportsService";

interface Report {
  id: string;
  title: string;
}

export default function ReportsCreatePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      .catch((error) => {
        console.error("❌ Error fetching reports:", error);
        setError("Failed to load reports.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {loading ? (
        <p className="text-gray-600">Loading reports...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : reports.length > 0 ? (
        <ul className="bg-white p-6 rounded-lg shadow-lg">
          {reports.map((report) => (
            <li key={report.id} className="border-b last:border-0 px-4 py-2">
              {report.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No reports available.</p>
      )}
    </div>
  );
}