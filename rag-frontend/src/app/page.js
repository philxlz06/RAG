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
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-text font-sans">
      <h1 className="text-2xl font-semibold tracking-tight mb-6"> RAG </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
    Retrieval-Augmented Generation (RAG) enhances AI by combining 
    large language models with your own data. Upload documents and 
    ask questions to get accurate, context-aware responses grounded 
    in real information.
  </p>
      {/* File upload */}
      <div className="mb-4 flex flex-col items-center gap-2 w-full max-w-md">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border border-border rounded px-3 py-2 text-sm text-text"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-black text-white py-2 rounded text-sm hover:bg-gray-800 transition-colors"
        >
          Upload File
        </button>
      </div>

      {/* Query input */}
      <div className="mb-4 flex flex-col items-center gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Ask a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-border rounded px-3 py-2 text-sm text-text"
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
        <div className="mt-6 p-4 border border-border rounded w-full max-w-md bg-surface">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p className="text-sm">{response}</p>
        </div>
      )}
    </main>
  );
}
