import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const courseId = params.get("courseId");

  useEffect(() => {
    const enroll = async () => {
      try {
        await api.post("/courses/enroll", {
          courseId,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (courseId) {
      enroll();
    }
  }, [courseId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white p-8 rounded-2xl shadow text-center">
        <h1 className="text-2xl font-bold text-primary">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          You are now enrolled in this course.
        </p>

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