import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/slices/courseSlice";
import { setLectures } from "../../redux/slices/lectureSlice"; 
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { generateCourseDescription } from "../../services/aiServices";
import { Pencil, Plus, Video } from "lucide-react";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [createdCourseId, setCreatedCourseId] = useState(null); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
  });
  const [thumbnail, setThumbnail] = useState(null);

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [lectureVideo, setLectureVideo] = useState(null);
  const [courseLectures, setCourseLectures] = useState([]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLectureChange = (e) => {
    setLectureData({ ...lectureData, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("level", formData.level);
      data.append("price", formData.price);

      if (thumbnail) data.append("thumbnail", thumbnail);

      const res = await api.post("/courses/create-course", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(addCourse(res.data.course));
      setCreatedCourseId(res.data.course._id); 
      toast.success("Course shell saved! Now append your lecture materials.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };
  const handleAddLectureSubmit = async (e) => {
    e.preventDefault();
    if (!lectureVideo) {
      toast.warning("Please upload a lecture video file.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", lectureData.title);
      data.append("description", lectureData.description);
      data.append("duration", lectureData.duration);
      data.append("video", lectureVideo);

      const res = await api.post(`/lectures/create-lectures/${createdCourseId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const structuralNewLecture = res.data.lecture;
      setCourseLectures((prev) => [...prev, structuralNewLecture]);
      
      setLectureData({ title: "", description: "", duration: "" });
      setLectureVideo(null);
      document.getElementById("videoFileInput").value = "";

      toast.success("Lecture media uploaded and saved!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add lecture");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.title.trim()) {
      toast.warning("Please enter a course title first");
      return;
    }
    try {
      setGenerating(true);
      const data = await generateCourseDescription(formData.title);
      setFormData((prev) => ({ ...prev, description: data }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate description");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-3xl mx-auto pt-20 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          
          {!createdCourseId ? (
            <>
              <h1 className="text-3xl font-bold text-primary mb-2">Create Course</h1>
              <p className="text-gray-500 mb-8">Add global course details to EduCore.</p>

              <form onSubmit={handleCourseSubmit} className="space-y-5">
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div className="relative">
                  <textarea
                    name="description"
                    placeholder="Course Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full border rounded-xl px-4 py-3 pr-32"
                  />
                  <button
                  aria-label="Generate course description"
                    type="button"
                    disabled={generating}
                    onClick={handleGenerateDescription}
                    className="absolute top-3 right-3 flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-lg text-sm hover:opacity-90 disabled:opacity-50"
                  >
                    <Pencil size={16} />
                    <span>{generating ? "Generating..." : "Generate"}</span>
                  </button>
                </div>

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Course Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div className="space-y-1">
                  <label className="text-sm text-gray-500 block px-1">Course Thumbnail Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="Upload course thumbnail"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-xl hover:opacity-95 font-medium transition"
                >
                  {loading ? "Creating..." : "Save & Continue to Lectures"}
                </button>
              </form>
            </>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Upload Course Lectures</h1>
              <p className="text-gray-500 mb-6">Attach interactive videos/lectures to your new course tracking index.</p>

              {courseLectures.length > 0 && (
                <div className="mb-8 border rounded-2xl p-4 bg-gray-50 space-y-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Curriculum ({courseLectures.length})</h3>
                  {courseLectures.map((lec, index) => (
                    <div key={lec._id || index} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border">
                      <div className="flex items-center gap-3">
                        <Video size={18} className="text-primary" />
                        <div>
                          <p className="font-medium text-sm text-gray-800">{lec.title}</p>
                          <p className="text-xs text-gray-400">{lec.duration || "N/A"} mins</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleAddLectureSubmit} className="space-y-4 border-t pt-6">
                <h4 className="font-semibold text-md text-primary">New Lecture Details</h4>
                <input
                  type="text"
                  name="title"
                  placeholder="Lecture Title"
                  value={lectureData.title}
                  onChange={handleLectureChange}
                  required
                  className="w-full border rounded-xl px-4 py-2.5 text-sm"
                />

                <textarea
                  name="description"
                  placeholder="Lecture Summary / Description"
                  value={lectureData.description}
                  onChange={handleLectureChange}
                  rows="3"
                  required
                  className="w-full border rounded-xl px-4 py-2.5 text-sm"
                />

                <input
                  type="text"
                  name="duration"
                  placeholder="Duration (e.g., 12:45 or 15)"
                  value={lectureData.duration}
                  onChange={handleLectureChange}
                  className="w-full border rounded-xl px-4 py-2.5 text-sm"
                />

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 block px-1">Lecture MP4 Video Source</label>
                  <input
                    id="videoFileInput"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setLectureVideo(e.target.files[0])}
                    required
                    className="w-full border rounded-xl px-4 py-2.5 text-sm"
                    aria-label="Upload lecture video"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full border border-primary text-primary py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition text-sm font-medium"
                  aria-label="Upload lecture video"
                >
                  <Plus size={16} />
                  {loading ? "Uploading Media..." : "Upload & Save Lecture"}
                </button>
              </form>

              <button
                onClick={() => {
                  dispatch(setLectures(courseLectures));
                  navigate("/admin/courses");
                }}
                className="w-full bg-primary text-white py-3 rounded-xl mt-8 font-medium hover:opacity-95 transition"
              >
                Finish & Publish Course
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CreateCourse;