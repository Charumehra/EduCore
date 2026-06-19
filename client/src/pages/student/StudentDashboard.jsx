import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import {
  setCourses,
  setMyCourses,
  setSelectedCourse,
} from "../../redux/slices/courseSlice";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courses, myCourses } = useSelector((state) => state.course);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/courses/my-courses");
      dispatch(setMyCourses(res.data.courses || []));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch your courses. Please try again later."
      );
    }
  };

  const fetchAllCourses = async () => {
    try {
      const res = await api.get("/courses/all-courses");
      dispatch(setCourses(res.data.courses || []));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch available courses. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchMyCourses();
    fetchAllCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Student Dashboard</h1>

          <p className="text-gray-700 mt-2">
            Track your learning progress and explore new courses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Enrolled Courses</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {myCourses.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
            <h3 className="text-gray-500 text-sm">Available Courses</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {courses.length}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-primary">My Learning</h2>

          <span className="bg-white px-4 py-2 rounded-full text-sm text-primary font-medium shadow">
            {myCourses.length}
          </span>
        </div>

        {myCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center mb-10">
            <h3 className="text-xl font-semibold text-primary">
              No Enrolled Courses
            </h3>
            <p className="text-gray-500 mt-2">
              Start learning by enrolling in courses.
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
                  <h3 className="text-lg font-bold text-primary line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {course.category}
                  </p>

                  <p className="text-sm text-gray-700 mt-2">
                    Instructor: {course.owner?.name}
                  </p>

                  <button
                    onClick={() => {
                      dispatch(setSelectedCourse(course));
                      navigate(`/learn/${course._id}`);
                    }}
                    className="mt-auto bg-primary text-white py-2 rounded-xl hover:bg-primary-hover transition"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-primary">
            Explore Courses
          </h2>

          <span className="bg-white px-4 py-2 rounded-full text-sm text-primary font-medium shadow">
            {courses.length}
          </span>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h3 className="text-xl font-semibold text-primary">
              No Courses Available
            </h3>
          </div>
        ) : (
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
                  <h3 className="text-lg font-bold text-primary line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-sm text-gray-500 capitalize">
                      {course.category}
                    </p>

                    <span className="text-xs px-3 py-1 rounded-full bg-background text-primary capitalize">
                      {course.level}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      dispatch(setSelectedCourse(course));
                      navigate(`/course/${course._id}`);
                    }}
                    className="mt-4 bg-primary text-white py-2 rounded-xl hover:bg-primary-hover transition"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
