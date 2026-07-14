import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';

export default function DocumentsManager() {
  const [documents] = useState([]);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Documents
          </h2>

          <p className="text-gray-600">
            Manage constitutions, semester programmes and other downloadable files.
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-3 rounded-lg text-white"
          style={{ backgroundColor: "#2e3e87" }}
        >
          <Plus size={18} />
          Upload Document
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="text-center text-gray-500">

          <FileText
            size={60}
            className="mx-auto mb-4 text-gray-400"
          />

          <p>
            No documents loaded.
          </p>

        </div>

      </div>

    </div>
  );
}
