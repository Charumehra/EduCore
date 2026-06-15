import { useSelector } from "react-redux";
import { BookOpen, Users, Shield } from "lucide-react";

const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
            {user?.name}
          </h1>

          <p className="text-gray-600 mt-1">{user?.email}</p>

          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-background text-primary font-medium capitalize">
            {user?.role}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <BookOpen className="mx-auto text-primary" size={32} />

            <h3 className="mt-3 text-gray-500">Courses</h3>

            <p className="text-3xl font-bold text-primary mt-2">--</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <Users className="mx-auto text-primary" size={32} />

            <h3 className="mt-3 text-gray-500">Students</h3>

            <p className="text-3xl font-bold text-primary mt-2">--</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <Shield className="mx-auto text-primary" size={32} />

            <h3 className="mt-3 text-gray-500">Access Level</h3>

            <p className="text-2xl font-bold text-primary mt-2 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mt-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Account Information
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>

              <p className="font-semibold text-lg">{user?.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email Address</p>

              <p className="font-semibold text-lg">{user?.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Role</p>

              <p className="font-semibold text-lg capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
