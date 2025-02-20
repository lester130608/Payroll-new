"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateReportPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [reportData, setReportData] = useState({
    name: "",
    description: "",
    date: "", // Añadimos el campo de fecha
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }

    const { data, error } = await supabase.from("reports").insert([
      {
        name: reportData.name,
        description: reportData.description,
        date: reportData.date,
        created_by: session.user.id,
      },
    ]);

    if (error) {
      console.error("Error creating report:", error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create Report</h1>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <div className="mb-4">
            <label className="block font-medium">Report Name</label>
            <input
              type="text"
              name="name"
              value={reportData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={reportData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={reportData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Create Report
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Report Created Successfully!</h2>
          <div className="flex gap-4">
            <button onClick={() => router.push("/reports")} className="bg-gray-600 text-white py-2 px-4 rounded">
              Back to Reports
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
