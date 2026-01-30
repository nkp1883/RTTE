import TopNav from "../components/dashboard/TopNav";
import { collaborators } from "../data/collaborators";

const CollaboratorsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <TopNav />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/60 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Collaborators
            </h1>
            <p className="text-gray-600 mt-1">
              People you collaborate with
            </p>
          </div>

          {/* Collaborators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborators.map((user) => (
              <div
                key={user.id}
                className="rounded-xl border border-gray-200 bg-white p-5 flex items-center gap-4 hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-lg font-semibold">
                  {user.name[0]}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.online ? "Online" : "Offline"}
                  </p>
                </div>

                <span
                  className={`w-3 h-3 rounded-full ${
                    user.online ? "bg-emerald-500" : "bg-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollaboratorsPage;