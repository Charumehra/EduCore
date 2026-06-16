import { User, Mail, GraduationCap, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { myCourses } = useSelector((state) => state.course);

  return (
    <div className="min-h-screen bg-background">
      {" "}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-primary">{user?.name}</h1>

              <p className="text-gray-600 mt-1">Student Account</p>

              <p className="text-sm text-gray-500 mt-2">
                Keep learning and growing every day.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Enrolled Courses</h3>

            <p className="text-3xl font-bold text-primary mt-2">
              {myCourses.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Account Type</h3>

            <p className="text-3xl font-bold text-primary mt-2 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Account Information
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <User className="text-primary" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-primary" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <GraduationCap className="text-primary" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="text-primary" />
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => navigate("/student/my-courses")}
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-hover transition"
            >
              My Courses
            </button>

            <button
              onClick={() => navigate("/student/dashboard")}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
