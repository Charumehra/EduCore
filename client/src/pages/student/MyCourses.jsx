import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { setMyCourses } from "../../redux/slices/courseSlice";

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myCourses } = useSelector((state) => state.course);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/courses/my-courses");
      dispatch(setMyCourses(res.data.courses || []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);
return (
  <div className="min-h-screen bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

      <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 mb-8 border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          My Learning Journey
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl">
          Access all your enrolled courses, continue learning where you left
          off, and keep building your skills one lesson at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-primary">
          <h3 className="text-gray-500 text-sm">
            Total Enrolled Courses
          </h3>

          <p className="text-3xl font-bold text-primary mt-2">
            {myCourses.length}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-primary">
          Enrolled Courses
        </h2>

        <span className="bg-white px-4 py-2 rounded-full text-sm text-primary font-medium shadow">
          {myCourses.length} Courses
        </span>
      </div>

      {myCourses.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-md p-12 text-center">
          <h2 className="text-2xl font-semibold text-primary">
            No Courses Enrolled
          </h2>

          <p className="text-gray-500 mt-3">
            Explore courses and start your learning journey today.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition"
          >
            Explore Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">

                <h3 className="text-lg font-bold text-primary line-clamp-2 min-h-14">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 capitalize">
                  {course.category}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600 capitalize">
                    {course.level}
                  </span>

                  <span className="px-3 py-1 bg-background text-primary text-xs font-medium rounded-full">
                    Enrolled
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/learn/${course._id}`)}
                  className="mt-6 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium transition"
                >
                  Continue Learning
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

export default MyCourses;