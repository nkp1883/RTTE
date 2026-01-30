const CreateDocument = () => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Create a new document
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Start writing and collaborate in real time.
        </p>
      </div>

      <button className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
        + New Document
      </button>
    </div>
  );
};

export default CreateDocument;
