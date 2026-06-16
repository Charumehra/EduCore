import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../services/api";
import studentImage from "../../assets/student.png";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      const res = await api.post("/auth/register", formData);
      dispatch(setUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success(res.data?.message || "Registration successful 🎉");

      const role = res.data.user.role;
      console.log("User role:", role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-background flex items-center justify-center px-4 py-14 md:py-16 sm:px-6 lg:h-[calc(100vh-3.75rem)] lg:overflow-hidden lg:px-10 lg:py-0 z-0">
      {" "}
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center lg:px-20">
        {/* Left Section */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left object-contain">
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

        {/* Register Form */}
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-3 sm:p-4 lg:p-5 max-w-md sm:max-w-xl mx-auto w-full">
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold">
              Welcome!
            </h2>

            <p className="text-gray-500 mt-1.5 text-xs sm:text-sm">
              Please fill in your details to register
            </p>
          </div>

          <form className="space-y-2.5 sm:space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm sm:text-base font-poppins font-bold mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className="w-full border border-gray-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-poppins font-bold mb-1">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full border border-gray-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-poppins font-bold mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className="w-full border border-gray-800 rounded-xl px-4 py-2.5 pr-12 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-poppins font-bold mb-1">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-sm sm:text-base font-medium transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="flex items-center my-2.5 sm:my-3">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-3 text-gray-500">or</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
