"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ModifyReportPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [reportData, setReportData] = useState({
    name: "",
    description: "",
    date: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      const { data, error } = await supabase
        .from("reports")
        .select("id, name, description, date")
        .eq("id", reportId)
        .single();

      if (error) {
        console.error("Error fetching report:", error.message);
        return;
      }

      setReportData({
        name: data.name,
        description: data.description,
        date: data.date,
      });
    }

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("reports")
      .update({
        name: reportData.name,
        description: reportData.description,
        date: reportData.date,
      })
      .eq("id", reportId);

    if (error) {
      console.error("Error updating report:", error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Modify Report</h1>

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
            Update Report
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Report Updated Successfully!</h2>
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
