import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Download, X } from 'lucide-react';

interface Record {
  id: string;
  name: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
}

function App() {
  const [records, setRecords] = useState<Record[]>([
    {
      id: '1',
      name: 'Medical Report 2024',
      description: 'Annual health checkup report with detailed blood work analysis',
      fileUrl: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28',
      fileType: 'image'
    },
    {
      id: '2',
      name: 'Vaccination Record',
      description: 'Complete vaccination history including COVID-19 shots',
      fileUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c',
      fileType: 'image'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({ name: '', description: '', fileUrl: '', fileType: 'image' as const });

  const handleAddRecord = () => {
    setRecords([...records, { ...newRecord, id: Date.now().toString() }]);
    setIsModalOpen(false);
    setNewRecord({ name: '', description: '', fileUrl: '', fileType: 'image' });
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            New Record
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 relative group"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={record.fileUrl}
                  alt={record.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{record.name}</h3>
                <p className="text-gray-600">{record.description}</p>
              </div>
              <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <Edit size={18} className="text-blue-600" />
                </button>
                <button 
                  onClick={() => handleDelete(record.id)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <Download size={18} className="text-green-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Record</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newRecord.name}
                    onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
                  <input
                    type="text"
                    value={newRecord.fileUrl}
                    onChange={(e) => setNewRecord({ ...newRecord, fileUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleAddRecord}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;