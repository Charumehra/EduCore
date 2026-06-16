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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            My Courses
          </h1>

          <p className="text-gray-700 mt-2">
            All your enrolled courses in one place.
          </p>
        </div>

        {/* Empty State */}
        {myCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <h2 className="text-xl font-semibold text-primary">
              No Courses Enrolled
            </h2>

            <p className="text-gray-500 mt-2">
              Start learning by enrolling in a course.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

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

                <div className="p-5 flex flex-col flex-1">

                  <h3 className="text-lg font-bold text-primary line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 capitalize">
                    {course.category}
                  </p>

                  <p className="text-gray-600 text-sm mt-2">
                    Level: {course.level}
                  </p>

                  <button
                    onClick={() => navigate(`/learn/${course._id}`)}
                    className="mt-auto bg-primary text-white py-2 rounded-xl hover:bg-primary-dark transition"
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