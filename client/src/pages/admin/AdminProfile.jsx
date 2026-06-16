import { useSelector } from "react-redux";
import { User } from "lucide-react";

const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.course);

  const totalCourses = courses.length;

  const totalEnrollments = courses.reduce(
    (total, course) => total + (course.enrolledStudents?.length || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Admin Profile
          </h1>

          <p className="text-gray-700 mt-2">
            View your account information and platform statistics.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">{user?.name}</h2>

              <p className="text-gray-600">{user?.email}</p>

              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-background text-primary text-sm font-medium capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Total Courses Created</h3>

            <p className="text-3xl font-bold text-primary mt-2">
              {totalCourses}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Total Enrollments</h3>

            <p className="text-3xl font-bold text-primary mt-2">
              {totalEnrollments}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Account Status</h3>

            <p className="text-xl font-bold text-green-600 mt-2">Active</p>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-primary">
              Recent Courses
            </h2>

            <span className="text-sm bg-background px-3 py-1 rounded-full text-primary font-medium">
              {totalCourses} Courses
            </span>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-primary">
                No Courses Created
              </h3>

              <p className="text-gray-500 mt-2">
                You haven't created any courses yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.slice(0, 5).map((course) => (
                <div
                  key={course._id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-14 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 capitalize">
                      {course.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm text-gray-600">
                      <User size={16} />
                      <span>{course.enrolledStudents?.length || 0} students</span>
                    </div>

                    <span className="text-xs bg-background px-2 py-1 rounded-full text-primary capitalize">
                      {course.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
