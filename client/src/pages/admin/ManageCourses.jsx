import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { Pencil, Trash2, Search } from "lucide-react";
import { toast } from "react-toastify";
import {
  setCourses,
  removeCourse,
  updateCourse,
} from "../../redux/slices/courseSlice";

const ManageCourses = () => {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.course);

  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/all-courses");
      dispatch(setCourses(res.data.courses || []));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (!courseToDelete) return;

    try {
      setDeleting(true);

      await api.delete(
        `/courses/delete-course/${courseToDelete._id}`
      );

      dispatch(removeCourse(courseToDelete._id));

      toast.success("Course deleted successfully");

      setShowDeleteModal(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      setUpdating(true);

      const res = await api.put(
        `/courses/update-course/${editingCourse._id}`,
        editingCourse
      );

      const updated = res.data.course;

      dispatch(updateCourse(updated));

      toast.success("Course updated successfully");

      setShowEditModal(false);
      setEditingCourse(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update course");
    } finally {
      setUpdating(false);
    }
  };

  const filteredCourses = courses?.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Manage Courses
          </h1>
          <p className="text-gray-600 mt-2">
            View, edit and delete courses.
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
            className="w-full bg-white pl-11 pr-4 py-3 rounded-xl shadow border outline-none focus:border-primary"
          />
        </div>

        {filteredCourses?.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-primary">
              No Courses Found
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="w-full min-w-200">
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

                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={course.thumbnail}
                        className="w-16 h-12 rounded-lg object-cover"
                        alt=""
                      />
                      <div>
                        <h3 className="font-semibold">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ₹{course.price}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 capitalize">
                      {course.category}
                    </td>

                    <td className="p-4 capitalize">
                      {course.level}
                    </td>

                    <td className="p-4">
                      {course.enrolledStudents?.length || 0}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setShowEditModal(true);
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setCourseToDelete(course);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-100 text-red-600 rounded-lg"
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
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="text-xl font-bold text-primary">
              Delete Course
            </h2>

            <p className="mt-2">
              Are you sure you want to delete{" "}
              <b>{courseToDelete?.title}</b>?
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>
        </div>
      )}

      {showEditModal && editingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg">

            <h2 className="text-xl font-bold text-primary mb-4">
              Update Course
            </h2>

            <input
              className="w-full p-3 border rounded-lg mb-3"
              value={editingCourse.title}
              onChange={(e) =>
                setEditingCourse({
                  ...editingCourse,
                  title: e.target.value,
                })
              }
            />

            <input
              className="w-full p-3 border rounded-lg mb-3"
              value={editingCourse.category}
              onChange={(e) =>
                setEditingCourse({
                  ...editingCourse,
                  category: e.target.value,
                })
              }
            />

            <input
              className="w-full p-3 border rounded-lg mb-3"
              type="number"
              value={editingCourse.price}
              onChange={(e) =>
                setEditingCourse({
                  ...editingCourse,
                  price: e.target.value,
                })
              }
            />

            <select
              className="w-full p-3 border rounded-lg mb-3"
              value={editingCourse.level}
              onChange={(e) =>
                setEditingCourse({
                  ...editingCourse,
                  level: e.target.value,
                })
              }
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateCourse}
                disabled={updating}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                {updating ? "Updating..." : "Update"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageCourses;