import { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { uploadDocument } from '../lib/documentService';
import DocumentForm from './DocumentForm';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploaded: () => Promise<void>;
}

export default function DocumentUploadModal({
  isOpen,
  onClose,
  onUploaded,
}: DocumentUploadModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'home' | 'alumni'>('home');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
      alert('Please enter a title.');
      return;
    }

    if (!file) {
      alert('Please choose a file.');
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

      await onUploaded();

      onClose();

    } catch (err) {
      console.error(err);
      alert('Failed to upload document.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Upload Document
          </h2>

          <button onClick={onClose}>
            <X size={24} />
          </button>

        </div>

        <div className="p-6">

          <DocumentForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            file={file}
            setFile={setFile}
            uploading={uploading}
          />

        </div>

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onClose}
            disabled={uploading}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-3 rounded-lg text-white flex items-center gap-2"
            style={{ backgroundColor: "#2e3e87" }}
          >
            {uploading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
