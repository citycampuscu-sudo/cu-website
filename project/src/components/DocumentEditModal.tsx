import { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import type { Document } from '../lib/supabase';
import { updateDocument } from '../lib/documentService';
import DocumentForm from './DocumentForm';

interface Props {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void>;
}

export default function DocumentEditModal({
  document,
  isOpen,
  onClose,
  onUpdated,
}: Props) {

  const [title, setTitle] = useState(document.title);
  const [description, setDescription] = useState(document.description);
  const [category, setCategory] = useState(document.category);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit() {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }

    try {
      setSaving(true);

      await updateDocument(document, {
        title,
        description,
        category,
        file,
      });

      await onUpdated();

      onClose();

    } catch (err) {
      console.error(err);
      alert('Failed to update document.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">

        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Edit Document
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
            existingFile={document.storage_path}
            uploading={saving}
          />

        </div>

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onClose}
            disabled={saving}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-3 rounded-lg text-white flex items-center gap-2"
            style={{ backgroundColor: "#2e3e87" }}
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
