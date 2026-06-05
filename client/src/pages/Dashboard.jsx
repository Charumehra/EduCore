

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/info");
        if (mounted) setUser(res.data.user || res.data);
      } catch {
        if (mounted) setError("Unable to load user info");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Welcome{user?.name ? `, ${user.name}` : ""}</h1>
            <p className="text-sm text-gray-600">Role: <span className="font-medium">{user?.role || "N/A"}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md">Logout</button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Overview</h2>
            <p className="text-sm text-gray-600 mb-4">Manage your courses, progress, and account settings from here.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 rounded-md">
                <div className="text-sm text-gray-500">My Courses</div>
                <div className="mt-2 text-2xl font-bold">—</div>
              </div>
              <div className="p-4 bg-gray-100 rounded-md">
                <div className="text-sm text-gray-500">Enrolled</div>
                <div className="mt-2 text-2xl font-bold">—</div>
              </div>
            </div>
          </section>

          <aside className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-md font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              {user?.role === "admin" && (
                <button className="w-full text-left px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => navigate('/admin/users')}>Manage Users</button>
              )}
              {(user?.role === "instructor" || user?.role === "admin") && (
                <button className="w-full text-left px-3 py-2 bg-green-600 text-white rounded" onClick={() => navigate('/instructor/courses')}>Manage Courses</button>
              )}
              <button className="w-full text-left px-3 py-2 border rounded" onClick={() => navigate('/profile')}>Edit Profile</button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};
