import { collaborators } from "../../data/collaborators";

const CollaboratorsList = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Collaborators
      </h3>

      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        {collaborators.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
              {user.name[0]}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user.name}
              </p>
            </div>

            <span
              className={`w-2 h-2 rounded-full ${
                user.online ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollaboratorsList;
