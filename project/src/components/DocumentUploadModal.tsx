import { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, Loader2 } from 'lucide-react';
import { uploadDocument } from '../lib/documentService';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DocumentUploadModal({
  isOpen,
  onClose,
  onSuccess,
}: DocumentUploadModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'home' | 'alumni'>('home');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setCategory('home');
      setFile(null);
      setUploading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit() {
    if (!title.trim()) {
      alert('Please enter a document title.');
      return;
    }

    if (!file) {
      alert('Please select a PDF file.');
      return;
    }

    try {
      setUploading(true);

      await uploadDocument(
        file,
        title,
        description,
        category
      );

      alert('Document uploaded successfully.');

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Upload Document
          </h2>

          <button onClick={onClose}>
            <X size={24} />
          </button>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="block mb-2 font-semibold">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Semester Programme"
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as 'home' | 'alumni')
              }
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="home">Home Page</option>
              <option value="alumni">Alumni Page</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              PDF Document
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
            />

            {file && (
              <div className="mt-3 flex items-center gap-2 text-green-700">
                <FileText size={18} />
                {file.name}
              </div>
            )}

          </div>

        </div>

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onClose}
            disabled={uploading}
            className="px-6 py-3 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-3 rounded-lg text-white flex items-center gap-2"
            style={{ backgroundColor: '#2e3e87' }}
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Document
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
