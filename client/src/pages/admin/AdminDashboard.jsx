import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses/all-courses");
      setCourses(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8 pt-16 sm:pt-18 lg:pt-20 pb-6 sm:pb-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Admin Dashboard
          </h1>

          <p className="text-gray-700 mt-2 text-sm sm:text-base">
            Manage courses, monitor students, and track platform activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10">
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Total Courses</h3>

            <p className="text-2xl sm:text-3xl font-bold text-primary mt-2">
              {courses.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Total Students</h3>

            <p className="text-2xl sm:text-3xl font-bold text-primary mt-2">
              {courses.reduce(
                (total, course) =>
                  total + (course.enrolledStudents?.length || 0),
                0,
              )}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 lg:p-6 border-l-4 border-primary sm:col-span-2 lg:col-span-1">
            <h3 className="text-gray-500 text-sm">Platform</h3>

            <p className="text-lg sm:text-xl font-bold text-primary mt-2">
              EduCore LMS
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary">
            Available Courses
          </h2>

          <span className="bg-white px-4 py-2 rounded-full text-sm text-primary font-medium shadow w-fit">
            {courses.length} Courses
          </span>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 lg:p-10 text-center">
            <h3 className="text-xl font-semibold text-primary">
              No Courses Available
            </h3>

            <p className="text-gray-500 mt-2">
              No course has been created yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-32 sm:h-36 md:h-40 lg:h-44 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-primary line-clamp-2 min-h-12">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm mt-1 capitalize">
                    {course.category}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700">
                      👨‍🎓 {course.enrolledStudents?.length || 0} Students
                    </span>

                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-background text-primary capitalize">
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
