import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import studentImage from "../../assets/student.png";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const res = await api.post("/auth/login", formData);

      dispatch(setUser(res.data.user));

      const role = res.data.user.role;

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "instructor") navigate("/instructor/dashboard");
      else navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-background flex items-center justify-center px-4  md:py-16 sm:px-6 lg:h-[calc(100vh-3.75rem)] lg:overflow-hidden lg:px-10 lg:py-0 z-0">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center lg:px-20  ">
        <div className="flex flex-col  items-center text-center lg:items-start lg:text-left object-contain ">
          <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-tight">
            Learn. Grow.
            <br />
            <span className="text-primary">Success.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-700 text-base sm:text-lg lg:text-[20px] max-w-md lg:max-w-sm">
            Join thousands of learners on EduCore and start your learning
            journey today.
          </p>

          <img
            src={studentImage}
            alt="Student"
            className="hidden lg:block w-72 sm:w-96 lg:w-100 h-auto lg:h-80 mt-6 lg:mt-8"
          />
        </div>

        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-3 sm:p-5 lg:p-6 max-w-sm sm:max-w-lg lg:max-w-xl mx-auto w-full">
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold">
              Welcome!
            </h2>

            <p className="text-gray-500 mt-1.5 text-xs sm:text-sm">
              Login to start your learning journey
            </p>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm sm:text-base font-poppins font-bold mb-1.5">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-poppins font-bold mb-1.5">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-sm sm:text-base font-medium transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center my-4 sm:my-5">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-3 text-gray-500">or</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
