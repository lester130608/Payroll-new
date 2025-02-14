export default function PayrollPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Payroll</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            New Payroll
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Edit Payroll
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete Payroll
          </button>
        </div>
      </div>
    </div>
  )
}
