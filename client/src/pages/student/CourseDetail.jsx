import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Layers, Tag, IndianRupee } from "lucide-react";
import api from "../../services/api";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedCourse } = useSelector((state) => state.course);
  const [course, setCourse] = useState(selectedCourse || null);
  const [loading, setLoading] = useState(false);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/${id}/learn`);
      setCourse(res.data.course);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedCourse || selectedCourse._id !== id) {
      fetchCourse();
    } else {
      setCourse(selectedCourse);
    }
  }, [id, selectedCourse]);

  const handleBuyCourse = async () => {
    try {
      const res = await api.post("/stripe/checkout", {
        courseId: course._id,
      });

      window.location.href = res.data.url; // redirect to Stripe
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary font-medium text-sm tracking-wide">
          Loading course details...
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6 max-w-sm bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-red-500 text-lg font-semibold mb-1">
            Course not found
          </p>
          <p className="text-slate-500 text-sm mb-4">
            The course you are looking for might have been removed or renamed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-primary hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-800 selection:bg-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all duration-300 mb-6"
        >
          <ArrowLeft
            size={18}
            className="text-primary transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span className="font-medium text-slate-700 group-hover:text-primary">
            Back to Courses
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-6 lg:gap-8 items-start">
          <div className="w-full bg-slate-50/60 p-4 md:p-6 rounded-3xl border border-slate-100 space-y-6">
            <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm group">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-slate-55 text-slate-600 px-3 py-1 rounded-full text-xs font-medium border border-slate-100">
                  <Tag size={12} />
                  {course.category}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-55 text-slate-600 px-3 py-1 rounded-full text-xs font-medium capitalize border border-slate-100">
                  <Layers size={12} />
                  {course.level}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </div>
          </div>

          <div className="w-full lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 p-5 md:p-6 overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-primary" />

              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Investment
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <IndianRupee
                    size={22}
                    className="text-slate-900 stroke-[2.5] self-center"
                  />
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    {course.price}
                  </h2>
                  <span className="text-xs text-slate-400 font-medium ml-1">
                    all-inclusive
                  </span>
                </div>
              </div>

              <div className="space-y-3 bg-slate-50/50 rounded-xl md:rounded-2xl p-4 border border-slate-100/80 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Category</span>
                  <span className="capitalize font-semibold text-slate-800">
                    {course.category}
                  </span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">
                    Skill Level
                  </span>
                  <span className="capitalize font-semibold text-slate-800">
                    {course.level}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBuyCourse}
                className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-semibold shadow-md shadow-primary/10 transition-all active:scale-[0.98]"
              >
                Enroll Now
              </button>

              <p className="text-center text-slate-400 text-xs mt-4">
                Secure checkout • Lifetime access guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
