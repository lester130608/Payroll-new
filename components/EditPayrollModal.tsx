"use client";

import { useState } from "react";

export default function EditPayrollModal({ employee, onClose, onSave }) {
  const [hours, setHours] = useState(employee.hours);
  const [services, setServices] = useState(employee.services || "");

  const handleSave = () => {
    const updatedEmployee = { ...employee, hours, services };
    onSave(updatedEmployee);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Modify Payroll</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Hours</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Services</label>
          <input
            type="text"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}