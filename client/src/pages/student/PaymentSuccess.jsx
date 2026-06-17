import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { setMyCourses } from "../../redux/slices/courseSlice";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courseId = params.get("courseId");

  useEffect(() => {
    const enrollAndSync = async () => {
      try {
        await api.post(`/courses/${courseId}/enroll`, {
          courseId,
        });

        const res = await api.get("/courses/my-courses");

        dispatch(setMyCourses(res.data.courses));

        setEnrolled(true);
      } catch (err) {
        const message = err?.response?.data?.message || "Enrollment failed.";

        setError(message);
        toast.error(message);
      }
    };

    if (courseId) {
      enrollAndSync();
    }
  }, [courseId, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white p-8 rounded-2xl shadow text-center">
        {enrolled ? (
          <>
            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful
            </h1>

            <p className="text-gray-600 mt-2">
              You are now enrolled in this course.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600">
              Enrollment Failed
            </h1>

            <p className="text-gray-600 mt-2">{error}</p>
          </>
        )}

        <button
          onClick={() => navigate("/student/dashboard")}
          className="mt-5 bg-primary text-white px-6 py-2 rounded-xl"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
