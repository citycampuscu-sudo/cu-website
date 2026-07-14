import { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  ExternalLink,
  Trash2,
  Edit
} from 'lucide-react';
import { useDocuments } from '../hooks/useDocuments';

export default function DocumentsManager() {
  const { documents, loading } = useDocuments();
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

      {loading ? (

  <div className="bg-white rounded-xl shadow p-8 text-center">
    Loading documents...
  </div>

) : (

  <div className="bg-white rounded-xl shadow overflow-hidden">

    <table className="min-w-full">

      <thead
        className="text-white"
        style={{ backgroundColor: "#2e3e87" }}
      >
        <tr>

          <th className="text-left px-6 py-4">
            Title
          </th>

          <th className="text-left px-6 py-4">
            Category
          </th>

          <th className="text-left px-6 py-4">
            Actions
          </th>

        </tr>
      </thead>

      <tbody>

        {documents.map((doc) => (

          <tr
            key={doc.id}
            className="border-b hover:bg-gray-50"
          >

            <td className="px-6 py-4">

              <div className="font-semibold">
                {doc.title}
              </div>

              <div className="text-sm text-gray-500">
                {doc.description}
              </div>

            </td>

            <td className="px-6 py-4 capitalize">
              {doc.category}
            </td>

            <td className="px-6 py-4">

              <div className="flex gap-3">

                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink
                    size={20}
                    className="text-blue-600"
                  />
                </a>

                <a
                  href={doc.file_url}
                  download={doc.title}
                >
                  <Download
                    size={20}
                    className="text-green-600"
                  />
                </a>

                <button>
                  <Edit
                    size={20}
                    className="text-amber-600"
                  />
                </button>

                <button>
                  <Trash2
                    size={20}
                    className="text-red-600"
                  />
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}

    </div>
  );
}
