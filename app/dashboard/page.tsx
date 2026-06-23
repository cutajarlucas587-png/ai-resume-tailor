"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!file || !jobDesc) return alert("Please upload a file and paste a job description.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDesc", jobDesc);

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to generate content");

      const data = await res.json();
      localStorage.setItem("result", JSON.stringify(data));
      router.push("/result");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check your API key or backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4 text-black">Upload Details</h2>

      <textarea
        className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black text-black"
        placeholder="Paste the job description here..."
        rows={8}
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (.txt only for now)</label>
        <input
          type="file"
          accept=".txt"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:opacity-80"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-80 disabled:bg-gray-400 w-full transition"
      >
        {loading ? "Analyzing & Tailoring..." : "Tailor My Resume"}
      </button>
    </main>
  );
}