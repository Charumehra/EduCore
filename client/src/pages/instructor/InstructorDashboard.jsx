import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import {
  setCourses,
  setMyCourses,
} from "../../redux/slices/courseSlice";

const InstructorDashboard = () => {
  const dispatch = useDispatch();

  const { courses, myCourses } = useSelector(
    (state) => state.course
  );

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/courses/my-courses");

      dispatch(setMyCourses(res.data.courses || []));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const res = await api.get("/courses/all-courses");

      dispatch(setCourses(res.data.courses || []));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (myCourses.length === 0) {
      fetchMyCourses();
    }

    if (courses.length === 0) {
      fetchAllCourses();
    }
  }, []);

  const totalStudents = myCourses.reduce(
    (total, course) =>
      total + (course.enrolledStudents?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Instructor Dashboard
          </h1>

          <p className="text-gray-700 mt-2">
            Manage your courses and explore all courses.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">
              My Courses
            </h3>

            <p className="text-3xl font-bold text-primary mt-2">
              {myCourses.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">
              Total Students
            </h3>

            <p className="text-3xl font-bold text-primary mt-2">
              {totalStudents}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">
              Available Courses
            </h3>

            <p className="text-3xl font-bold text-primary mt-2">
              {courses.length}
            </p>
          </div>

        </div>

        {/* My Courses */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">
            My Courses
          </h2>

          <span className="bg-white px-4 py-2 rounded-full shadow text-primary">
            {myCourses.length} Courses
          </span>
        </div>

        {myCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center mb-10">
            <h3 className="text-xl font-semibold text-primary">
              No Courses Created
            </h3>

            <p className="text-gray-500 mt-2">
              Create your first course.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {myCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-primary line-clamp-2 min-h-14">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {course.category}
                  </p>

                  <div className="mt-auto pt-4 flex justify-between">
                    <span className="text-sm text-gray-700">
                      👨‍🎓 {course.enrolledStudents?.length || 0}
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-background text-primary capitalize">
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Courses */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">
            All Courses
          </h2>

          <span className="bg-white px-4 py-2 rounded-full shadow text-primary">
            {courses.length} Courses
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-primary line-clamp-2 min-h-14">
                  {course.title}
                </h3>

                <div className="mt-auto pt-4 flex justify-between">
                  <span className="text-sm text-gray-700">
                    👨‍🎓 {course.enrolledStudents?.length || 0}
                  </span>

                  <span className="px-3 py-1 text-xs rounded-full bg-background text-primary capitalize">
                    {course.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;