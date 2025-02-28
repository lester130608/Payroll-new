import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  hours: number;
  services?: string;
}

interface EditPayrollModalProps {
  employee: Employee;
  onClose: () => void;
  onSave: (updatedEmployee: Employee) => void;
}

export default function EditPayrollModal({ employee, onClose, onSave }: EditPayrollModalProps) {
  const [hours, setHours] = useState<number>(employee.hours);
  const [services, setServices] = useState<string>(employee.services || "");

  const handleSave = () => {
    onSave({ ...employee, hours, services });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Payroll</h2>

        <label className="block text-gray-700">Hours Worked</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <label className="block text-gray-700 mt-4">Services Completed</label>
        <input
          type="text"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}