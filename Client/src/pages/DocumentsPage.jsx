import TopNav from "../components/dashboard/TopNav";
import { documents } from "../data/documents";
import { useNavigate } from "react-router-dom";

const DocumentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <TopNav />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/60 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Documents
              </h1>
              <p className="text-gray-600 mt-1">
                All documents you’ve contributed to
              </p>
            </div>

            <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition">
              + New Document
            </button>
          </div>

          {/* Documents List */}
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/document/${doc.id}`)}
                className="flex justify-between items-center px-6 py-5 hover:bg-indigo-50 cursor-pointer transition"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {doc.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {doc.updatedAt}
                  </p>
                </div>

                <span className="text-indigo-600 font-medium">
                  Open →
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;