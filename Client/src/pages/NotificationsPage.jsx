import TopNav from "../components/dashboard/TopNav";

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <TopNav />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/60 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Notifications
          </h1>

          <div className="text-center py-20 text-gray-500">
            🎉 You’re all caught up. No new notifications.
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
