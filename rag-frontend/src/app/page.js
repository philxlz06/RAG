"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  // handle file upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log("Upload success:", data);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  // handle query
  const handleQuery = async () => {
    if (!query) return alert("Enter a question first!");

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Query failed");

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error(err);
      alert("Error fetching response");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-text font-sans">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold tracking-tight mb-4">
          Ask Your Documents <br /> Anything
        </h1>
        <p className="text-md text-subtle max-w-2xl mx-auto leading-relaxed">
          Upload a PDF and get instant answers grounded in your content. <br />
          Powered by Retrieval-Augmented Generation (RAG).
        </p>
      </div>

      {/* File Upload */}
      <div className="mb-6 w-full max-w-md space-y-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border border-border rounded px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-gray-800 transition-colors"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-black text-white py-2 rounded text-sm hover:bg-gray-800 transition-colors"
        >
          Upload File
        </button>
      </div>

      {/* Query Input */}
      <div className="mb-6 w-full max-w-md space-y-2">
        <input
          type="text"
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={handleQuery}
          className="w-full bg-black text-white py-2 rounded text-sm hover:bg-gray-800 transition-colors"
        >
          Ask
        </button>
      </div>

      {/* Response */}
      {response && (
        <div className="mt-8 p-4 border border-border rounded w-full max-w-md bg-surface">
          <h2 className="font-semibold mb-2">Response</h2>
          <p className="text-sm leading-relaxed">{response}</p>
        </div>
      )}
    </main>
  );
}
