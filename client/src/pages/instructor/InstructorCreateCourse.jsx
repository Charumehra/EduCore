import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/slices/courseSlice";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { generateCourseDescription } from "../../services/aiServices";
import { Pencil } from "lucide-react";

const InstructorCreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("level", formData.level);
      data.append("price", formData.price);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      const res = await api.post("/courses/create-course", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(addCourse(res.data.course));

      toast.success("Course created successfully");

      navigate("/instructor/courses");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescription = async () => {
    setGenerating(true);
    if (!formData.title) {
      toast.error("Please enter a course title first");
      setGenerating(false);
      return;
    }
    try {
      setGenerating(true);
      const data = await generateCourseDescription(formData.title);

      setFormData({
        ...formData,
        description: data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate description");
    }finally {
      setGenerating(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto pt-20 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Create Course
          </h1>

          <p className="text-gray-500 mb-8">Add a new course to EduCore.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorCreateCourse;
