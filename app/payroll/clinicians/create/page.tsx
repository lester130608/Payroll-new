"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ClinicianPayroll {
  name: string;
  it: number;
  bio: number;
  tp: number;
  intake: number;
  inDepthBio: number;
  inDepthIntake: number;
  exis: number;
  tpReview: number;
}

export default function CreateClinicianPayrollPage() {
  const router = useRouter();

  // Simulación de empleados asignados al supervisor
  const [clinicians, setClinicians] = useState<ClinicianPayroll[]>([
    { name: "Clinician 1", it: 0, bio: 0, tp: 0, intake: 0, inDepthBio: 0, inDepthIntake: 0, exis: 0, tpReview: 0 },
    { name: "Clinician 2", it: 0, bio: 0, tp: 0, intake: 0, inDepthBio: 0, inDepthIntake: 0, exis: 0, tpReview: 0 },
  ]);

  const handleChange = (index: number, field: keyof ClinicianPayroll, value: number) => {
    const updatedClinicians = [...clinicians];
    updatedClinicians[index][field] = value;
    setClinicians(updatedClinicians);
  };

  const handleSubmit = () => {
    console.log("Clinician Payroll Submitted:", clinicians);
    alert("Clinician Payroll Saved Successfully!");
    router.push("/payroll");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Clinicians Payroll</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1">Name</th>
              <th className="border border-gray-300 px-2 py-1">IT</th>
              <th className="border border-gray-300 px-2 py-1">BIO</th>
              <th className="border border-gray-300 px-2 py-1">TP</th>
              <th className="border border-gray-300 px-2 py-1">INTAKE</th>
              <th className="border border-gray-300 px-2 py-1">IN-DEPTH BIO</th>
              <th className="border border-gray-300 px-2 py-1">IN-DEPTH INTAKE</th>
              <th className="border border-gray-300 px-2 py-1">EXIS</th>
              <th className="border border-gray-300 px-2 py-1">TP REVIEW</th>
            </tr>
          </thead>
          <tbody>
            {clinicians.map((clinician, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-2 py-1">{clinician.name}</td>
                {[
                  "it",
                  "bio",
                  "tp",
                  "intake",
                  "inDepthBio",
                  "inDepthIntake",
                  "exis",
                  "tpReview",
                ].map((field) => (
                  <td key={field} className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      min="0"
                      value={clinician[field as keyof ClinicianPayroll]}
                      onChange={(e) =>
                        handleChange(index, field as keyof ClinicianPayroll, Number(e.target.value))
                      }
                      className="w-16 border rounded text-center"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Payroll
          </button>
          <button
            onClick={() => router.push("/payroll")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
