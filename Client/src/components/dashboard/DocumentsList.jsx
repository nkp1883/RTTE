import { documents } from "../../data/documents";
import { useNavigate } from "react-router-dom";

const DocumentsList = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Documents
        </h3>
        <span className="text-sm text-indigo-600 font-medium">
          View all
        </span>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => navigate(`/document/${doc.id}`)}
            className="flex justify-between items-center px-6 py-4 hover:bg-indigo-50 cursor-pointer transition"
          >
            <div>
              <p className="font-medium text-gray-900">
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
    </section>
  );
};

export default DocumentsList;
