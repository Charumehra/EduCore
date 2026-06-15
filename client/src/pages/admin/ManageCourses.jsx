import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Pencil, Trash2, Search } from "lucide-react";
import { toast } from "react-toastify";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/all-courses");
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (!selectedCourse) return;

    try {
      setDeleting(true);

      await api.delete(`/courses/delete-course/${selectedCourse._id}`);

      setCourses((prev) =>
        prev.filter((course) => course._id !== selectedCourse._id),
      );

      toast.success("Course deleted successfully");

      setShowDeleteModal(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    } finally {
      setDeleting(false);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Manage Courses</h1>

          <p className="text-gray-700 mt-2">
            View, edit and delete courses from the platform.
          </p>
        </div>

        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white pl-11 pr-4 py-3 rounded-xl shadow outline-none border border-gray-200 focus:border-primary"
          />
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-primary">
              No Courses Found
            </h2>

            <p className="text-gray-500 mt-2">
              There are no courses available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="w-full min-w-175">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-4 text-left">Course</th>

                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Level</th>

                  <th className="p-4 text-left">Students</th>

                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />

                        <div>
                          <h3 className="font-semibold">{course.title}</h3>

                          <p className="text-sm text-gray-500">
                            ₹{course.price}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 capitalize">{course.category}</td>

                    <td className="p-4 capitalize">{course.level}</td>

                    <td className="p-4">
                      {course.enrolledStudents?.length || 0}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => navigate(`/course/${course._id}/edit`)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold text-primary mb-3">
              Delete Course
            </h2>

            <p className="text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold text-primary">
                {" "}
                {selectedCourse?.title}
              </span>
              ?
            </p>

            <p className="text-red-500 text-sm mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCourse(null);
                }}
                disabled={deleting}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
