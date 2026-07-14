import { FileText } from "lucide-react";

interface Props {
  title: string;
  setTitle: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  category: "home" | "alumni";
  setCategory: (v: "home" | "alumni") => void;

  file: File | null;
  setFile: (file: File | null) => void;

  existingFile?: string;

  uploading: boolean;
}

export default function DocumentForm({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  file,
  setFile,
  existingFile,
  uploading,
}: Props) {
  return (
    <div className="space-y-5">

      <div>
        <label className="block mb-2 font-semibold">
          Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            setCategory(e.target.value as "home" | "alumni")
          }
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="home">Home Page</option>
          <option value="alumni">Alumni Page</option>
        </select>

      </div>

      {existingFile && (

        <div className="rounded-lg bg-blue-50 p-4">

          <p className="text-sm text-gray-500">
            Current File
          </p>

          <div className="flex items-center gap-2 mt-2">

            <FileText size={18} />

            <span className="text-blue-700">

              {existingFile}

            </span>

          </div>

        </div>

      )}

      <div>

        <label className="block mb-2 font-semibold">

          {existingFile
            ? "Replace File (optional)"
            : "PDF Document"}

        </label>

        <input
          disabled={uploading}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
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
  );
}
