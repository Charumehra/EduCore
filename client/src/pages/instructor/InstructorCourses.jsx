import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setMyCourses } from "../../redux/slices/courseSlice";
import { User } from "lucide-react";

const InstructorCourses = () => {
  const dispatch = useDispatch();

  const { myCourses } = useSelector((state) => state.course);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/courses/my-created-courses");
      dispatch(setMyCourses(res.data.courses || []));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            My Created Courses
          </h1>

          <span className="bg-white px-4 py-2 rounded-full shadow text-primary">
            {myCourses?.length || 0} Courses
          </span>
        </div>

        {myCourses?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold text-primary">
              No Courses Created Yet
            </h2>
            <p className="text-gray-500 mt-2">
              Your created courses will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {myCourses?.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
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

                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                    <User size={16} />
                    <span>
                      {course.enrolledStudents?.length || 0} Students
                    </span>
                  </div>

                  <span className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-background text-primary capitalize w-fit">
                    {course.level}
                  </span>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default InstructorCourses;