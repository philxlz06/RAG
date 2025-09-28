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
      alert("File uploaded successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  // handle query
  const handleQuery = async () => {
    if (!query) return alert("Enter a query first!");

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-10">📄 RAG Demo</h1>

      {/* File upload */}
      <div className="mb-6 flex flex-col items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3 text-sm text-gray-300"
        />
        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Upload File
        </button>
      </div>

      {/* Query input */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-600 bg-black text-white px-3 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={handleQuery}
          className="ml-3 px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Ask
        </button>
      </div>

      {/* Response */}
      {response && (
        <div className="mt-8 p-6 border border-gray-700 rounded-lg w-full max-w-2xl bg-gray-900">
          <h2 className="font-semibold mb-3 text-lg">Response:</h2>
          <p className="text-gray-200">{response}</p>
        </div>
      )}
    </main>
  );
}
