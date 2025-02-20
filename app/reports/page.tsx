"use client";

import { useRouter } from "next/navigation";

const mockReports = [
  { id: 1, name: "Weekly Payroll Report" },
  { id: 2, name: "Monthly Performance Report" },
  { id: 3, name: "Employee Summary" },
];

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {/* Botones de acción */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => router.push("/reports/create")}
        >
          Create Report
        </button>
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          onClick={() => router.push("/reports/modify")}
        >
          Modify Report
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => router.push("/reports/delete")}
        >
          Delete Report
        </button>
      </div>

      {/* Lista de reportes */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Saved Reports</h2>
        <ul className="space-y-2">
          {mockReports.map((report) => (
            <li key={report.id}>
              <button
                className="text-blue-600 underline hover:text-blue-800"
                onClick={() => router.push(`/reports/view/${report.id}`)}
              >
                {report.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
