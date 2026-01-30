import TopNav from "../components/dashboard/TopNav";
import CreateDocument from "../components/dashboard/CreateDocument";
import DocumentsList from "../components/dashboard/DocumentsList";
import CollaboratorsList from "../components/dashboard/CollaboratorsList";
import Notifications from "../components/dashboard/Notifications";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <TopNav />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/60 p-8 space-y-12">
          <CreateDocument />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DocumentsList />
            </div>

            <div className="space-y-8">
              <CollaboratorsList />
              <Notifications />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
