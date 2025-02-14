'use client';

import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const router = useRouter();

  // Simulación de reportes guardados
  const savedReports = [
    { id: 1, name: 'Reporte Productividad Mensual' },
    { id: 2, name: 'Reporte Horas Supervisores' },
    { id: 3, name: 'Reporte Cobros Pendientes' },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => router.push('/reports/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Report
        </button>
        <button
          onClick={() => router.push('/reports/modify')}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Edit Report
        </button>
        <button
          onClick={() => router.push('/reports/delete')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Report
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Saved Reports</h2>
        {savedReports.map((report) => (
          <button
            key={report.id}
            onClick={() => alert(`Generating report: ${report.name}`)}
            className="block w-full text-left bg-gray-50 hover:bg-gray-200 p-3 rounded mb-2 border"
          >
            {report.name}
          </button>
        ))}
      </div>
    </div>
  );
}
