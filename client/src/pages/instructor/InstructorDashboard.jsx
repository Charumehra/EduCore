import { useEffect, useState } from "react";
import api from "../../services/api";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses/all-courses");
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Instructor Dashboard
          </h1>

          <p className="text-gray-700 mt-2">
            View and manage all available courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Total Courses</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {courses.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Total Students</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {courses.reduce(
                (total, course) =>
                  total + (course.enrolledStudents?.length || 0),
                0
              )}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Platform</h3>
            <p className="text-xl font-bold text-primary mt-2">
              EduCore LMS
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-primary">
            All Courses
          </h2>

          <span className="bg-white px-3 py-1 rounded-full text-sm text-primary font-medium shadow">
            {courses.length} Courses
          </span>
        </div>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              No courses available
            </h2>

            <p className="text-gray-500 mt-2">
              No courses have been created yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >

                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-lg font-bold text-primary line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 capitalize">
                    {course.category}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      👨‍🎓 {course.enrolledStudents?.length || 0} Students
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-background text-primary">
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

export default InstructorDashboard;