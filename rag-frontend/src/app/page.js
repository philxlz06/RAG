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
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">📄 RAG Demo</h1>

      {/* File upload */}
      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Upload File
        </button>
      </div>

      {/* Query input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-2 py-1 rounded w-64"
        />
        <button
          onClick={handleQuery}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Ask
        </button>
      </div>

      {/* Response */}
      {response && (
        <div className="mt-6 p-4 border rounded w-full max-w-xl">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
