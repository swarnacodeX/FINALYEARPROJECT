"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Download, PlusCircle, XCircle, Search } from "lucide-react";
import Navbar from "../utils/Navbar";

interface Record {
  id: string;
  name: string;
  description: string;
  file: string;
}

const RecordPage = () => {
  const email = typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";

  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [formResetKey, setFormResetKey] = useState(Date.now()); // To reset file input

  // Fetch records
  useEffect(() => {
    const fetchRecords = async () => {
      if (!email) return;
      try {
        const response = await axios.get(`http://localhost:8003/api/records/${email}`);
        const formatted = response.data.map((r: any) => ({
          id: r.record_id,
          name: r.record_title,
          description: r.record_description,
          file: r.file_link,
        }));
        setRecords(formatted);
      } catch {
        setError("Failed to load records.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [email]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    const query = searchRef.current?.value.toLowerCase() || "";
    return records.filter(record =>
      record.name.toLowerCase().includes(query)
    );
  }, [records, searchRef.current?.value]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axios.delete(`http://localhost:8003/api/records/${id}`);
      setRecords(prev => prev.filter(r => r.id !== id));
    } catch {
      alert("Failed to delete record.");
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value.trim() || "";
    const description = descRef.current?.value.trim() || "";
    const file = fileRef.current?.files?.[0] || null;

    if (description.split(" ").length > 50) {
      alert("Description should not exceed 50 words.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("record_title", name);
    formData.append("record_description", description);
    if (file) formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8003/api/records/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const newRec = {
        id: response.data.record_id,
        name: response.data.record_title,
        description: response.data.record_description,
        file: response.data.file_link,
      };

      setRecords(prev => [...prev, newRec]);
      setShowForm(false);
      setFormResetKey(Date.now());
    } catch {
      alert("Failed to add record.");
    }
  }, [email]);

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <Navbar />

      <div className="mt-4 text-center">
        {loading && <p className="text-gray-600">Loading records...</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center -mt-2 gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Your Records</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-white hover:text-black transition duration-300"
        >
          <PlusCircle size={18} /> New Record
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 mt-10 w-full sm:w-1/2 mx-auto">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search records..."
          className="p-2 border rounded w-full"
          onChange={() => {
            // force update to trigger useMemo when using ref
            setRecords([...records]);
          }}
        />
        <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
          <Search size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow-md w-full max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Add Record</h3>
            <button onClick={() => setShowForm(false)} className="text-red-500">
              <XCircle size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-2 space-y-3">
            <input
              ref={nameRef}
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              ref={descRef}
              placeholder="Description (Max 50 words)"
              className="w-full p-2 border rounded"
              required
            />
            <input
              key={formResetKey}
              ref={fileRef}
              type="file"
              className="w-full p-2"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 w-full">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Record Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded shadow p-4 hover:shadow-lg">
            <h3 className="text-lg font-semibold">{record.name}</h3>
            <p className="text-sm text-gray-600">{record.description}</p>
            <div className="flex justify-between items-center mt-2">
              <a
                href={record.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline"
              >
                View
              </a>
              <a
                href={record.file}
                download
                className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Download size={16} />
              </a>
              <button
                onClick={() => handleDelete(record.id)}
                className="p-1 bg-white rounded shadow hover:bg-gray-100"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordPage;
