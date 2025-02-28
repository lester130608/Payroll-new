"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchReports } from "@/lib/reportsService";

interface Report {
  id: string;
  title: string;
  date: string;
}

export default function ReportsPage() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchReports().then((fetchedReports) => {
        setReports(fetchedReports);
      });
    }
  }, [session]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="border p-4 mb-2">{report.title} - {report.date}</li>
        ))}
      </ul>
    </div>
  );
}