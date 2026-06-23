"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TailorResult {
  resume: string;
  coverLetter: string;
  suggestions: string[];
}

export default function ResultPage() {
  const [data, setData] = useState<TailorResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("result");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing results", e);
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-black">No data found. Please try again.</p>
        <Link href="/dashboard" className="text-blue-500 underline">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6 bg-gray-50 min-h-screen text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Tailored Results</h1>
        <Link href="/dashboard" className="text-sm bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Start Over</Link>
      </div>

      <section className="bg-white shadow-md rounded-2xl p-6 border">
        <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">Tailored Resume Suggestions</h2>
        <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">{data.resume}</pre>
      </section>

      <section className="bg-white shadow-md rounded-2xl p-6 border">
        <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">Generated Cover Letter</h2>
        <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">{data.coverLetter}</pre>
      </section>

      <section className="bg-white shadow-md rounded-2xl p-6 border">
        <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">What We Improved</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {data.suggestions.map((s: string, i: number) => (
            s.trim() && <li key={i}>{s.replace(/^[-\*\s]+/, "")}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}