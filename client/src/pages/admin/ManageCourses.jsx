import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { Pencil, Trash2, Search, Video, ArrowLeft, Plus } from "lucide-react";
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

  // Modals / Flow states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updating, setUpdating] = useState(false);

  // --- Lecture Management States ---
  const [selectedCourseForLectures, setSelectedCourseForLectures] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [fetchingLectures, setFetchingLectures] = useState(false);
  const [uploadingLecture, setUploadingLecture] = useState(false);
  const [lectureData, setLectureData] = useState({ title: "", description: "", duration: "" });
  const [lectureVideo, setLectureVideo] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/all-courses");
      dispatch(setCourses(res.data.courses || []));
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // --- Lecture Operations ---
  const handleOpenLectureManager = async (course) => {
    setSelectedCourseForLectures(course);
    setFetchingLectures(true);
    try {
      const res = await api.get(`/lectures/${course._id}`);
      setLectures(res.data.lectures || []);
    } catch (error) {
      toast.error("Failed to load lectures for this course");
    } finally {
      setFetchingLectures(false);
    }
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!lectureVideo) {
      toast.warning("Please choose a lecture video file first.");
      return;
    }

    try {
      setUploadingLecture(true);
      const data = new FormData();
      data.append("title", lectureData.title);
      data.append("description", lectureData.description);
      data.append("duration", lectureData.duration);
      data.append("video", lectureVideo);

      const res = await api.post(`/lectures/create-lectures/${selectedCourseForLectures._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLectures((prev) => [...prev, res.data.lecture]);
      setLectureData({ title: "", description: "", duration: "" });
      setLectureVideo(null);
      if (document.getElementById("manageLecVideoInput")) {
        document.getElementById("manageLecVideoInput").value = "";
      }
      toast.success("Lecture appended successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add lecture");
    } finally {
      setUploadingLecture(false);
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      await api.delete(`/lectures/${selectedCourseForLectures._id}/${lectureId}`);
      setLectures((prev) => prev.filter((lec) => lec._id !== lectureId));
      toast.success("Lecture deleted successfully");
    } catch (error) {
      toast.error("Failed to remove lecture");
    }
  };

  // --- Course Operations ---
  const handleDelete = async () => {
    if (!courseToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/courses/delete-course/${courseToDelete._id}`);
      dispatch(removeCourse(courseToDelete._id));
      toast.success("Course deleted successfully");
      setShowDeleteModal(false);
      setCourseToDelete(null);
    } catch (error) {
      toast.error("Failed to delete course");
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      setUpdating(true);
      const res = await api.put(`/courses/update-course/${editingCourse._id}`, editingCourse);
      dispatch(updateCourse(res.data.course));
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
        
        {/* Main Dashboard Panel */}
        {!selectedCourseForLectures ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary">Manage Courses</h1>
              <p className="text-gray-600 mt-2">View, edit, delete, and manage lecture modules.</p>
            </div>

            <div className="relative mb-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
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
                <h2 className="text-xl font-semibold text-primary">No Courses Found</h2>
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
                          <img src={course.thumbnail} className="w-16 h-12 rounded-lg object-cover" alt="" />
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-gray-500">₹{course.price}</p>
                          </div>
                        </td>
                        <td className="p-4 capitalize">{course.category}</td>
                        <td className="p-4 capitalize">{course.level}</td>
                        <td className="p-4">{course.enrolledStudents?.length || 0}</td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            {/* Manage Lectures Trigger Button */}
                            <button
                              aria-label="Manage lectures"
                              onClick={() => handleOpenLectureManager(course)}
                              className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition"
                              title="Manage Lectures"
                            >
                              <Video size={16} />
                              <span>Lectures</span>
                            </button>

                            <button
                              aria-label="Edit course"
                              onClick={() => {
                                setEditingCourse(course);
                                setShowEditModal(true);
                              }}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              aria-label="Delete course"
                              onClick={() => {
                                setCourseToDelete(course);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
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
          </>
        ) : (
          /* --- Dynamic Lecture Subspace Sub-View --- */
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <button
              aria-label="Back to courses"
              onClick={() => setSelectedCourseForLectures(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary font-medium mb-6 transition"
            >
              <ArrowLeft size={18} />
              <span>Back to Courses</span>
            </button>

            <div className="border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-primary">Curriculum Workspace</h2>
              <p className="text-gray-500 text-sm">
                Managing modules for: <span className="font-semibold text-gray-700">{selectedCourseForLectures.title}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Lectures List */}
              <div className="lg:col-span-7 space-y-3">
                <h3 className="font-bold text-gray-800 text-lg mb-2">Current Video Syllabus</h3>
                {fetchingLectures ? (
                  <p className="text-gray-400 italic text-sm">Fetching active lectures stream...</p>
                ) : lectures.length === 0 ? (
                  <p className="text-gray-500 italic text-sm bg-gray-50 p-4 rounded-xl border">
                    No lectures added yet. Populate this course shell using the addition form on the right.
                  </p>
                ) : (
                  <div className="max-h-125 overflow-y-auto space-y-3 pr-2">
                    {lectures.map((lec, i) => (
                      <div key={lec._id || i} className="flex items-center justify-between border rounded-xl p-4 bg-white shadow-sm hover:border-purple-300 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-800">{lec.title}</h4>
                            <p className="text-xs text-gray-400">{lec.duration ? `${lec.duration} mins` : "Media Synced"}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteLecture(lec._id)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition"
                          title="Delete Lecture"
                          aria-label="Delete Lecture"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Append New Lecture Module Form */}
              <div className="lg:col-span-5 bg-gray-50 p-5 rounded-2xl border">
                <h3 className="font-bold text-gray-800 text-md mb-4 flex items-center gap-2">
                  <Plus size={18} className="text-primary" /> Add New Video Lecture
                </h3>
                <form onSubmit={handleAddLecture} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Lecture Title"
                    required
                    value={lectureData.title}
                    onChange={(e) => setLectureData({ ...lectureData, title: e.target.value })}
                    className="w-full bg-white border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <textarea
                    placeholder="Lecture Overview / Core Takeaways"
                    required
                    rows="3"
                    value={lectureData.description}
                    onChange={(e) => setLectureData({ ...lectureData, description: e.target.value })}
                    className="w-full bg-white border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="Estimated Duration (e.g. 15 or 12:40)"
                    value={lectureData.duration}
                    onChange={(e) => setLectureData({ ...lectureData, duration: e.target.value })}
                    className="w-full bg-white border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 px-1 font-medium block">Video Source File (.mp4)</label>
                    <input
                      id="manageLecVideoInput"
                      type="file"
                      accept="video/*"
                      required
                      onChange={(e) => setLectureVideo(e.target.files[0])}
                      className="w-full bg-white border rounded-xl px-4 py-2 text-sm cursor-pointer"
                    />
                  </div>
                  <button
                    type="submit"
                    aria-label="Upload lecture video"
                    disabled={uploadingLecture}
                    className="w-full bg-primary text-white py-2.5 rounded-xl font-medium text-sm transition hover:opacity-95 disabled:opacity-50"
                  >
                    {uploadingLecture ? "Uploading Video..." : "Upload & Link Lecture"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Course Modals Block (Delete & Edit) --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold text-primary">Delete Course</h2>
            <p className="mt-2">Are you sure you want to delete <b>{courseToDelete?.title}</b>?</p>
            <div className="flex justify-end gap-3 mt-6">
              <button aria-label="Cancel delete" onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button aria-label="Confirm delete" onClick={handleDelete} disabled={deleting} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg">
            <h2 className="text-xl font-bold text-primary mb-4">Update Course</h2>
            <input
              className="w-full p-3 border rounded-lg mb-3"
              value={editingCourse.title}
              onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
            />
            <input
              className="w-full p-3 border rounded-lg mb-3"
              value={editingCourse.category}
              onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
            />
            <input
              className="w-full p-3 border rounded-lg mb-3"
              type="number"
              value={editingCourse.price}
              onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
            />
            <select
              className="w-full p-3 border rounded-lg mb-3"
              value={editingCourse.level}
              onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <div className="flex justify-end gap-3">
              <button aria-label="Cancel edit" onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button aria-label="Save changes" onClick={handleUpdateCourse} disabled={updating} className="px-4 py-2 bg-primary text-white rounded-lg">
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