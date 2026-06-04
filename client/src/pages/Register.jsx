import { Link } from "react-router-dom";
import studentImage from "../assets/student.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log(response.data);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen overflow-y-auto bg-[#D8C8EB] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-0">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-tight">
            Learn. Grow.
            <br />
            <span className="text-4xl sm:text-5xl lg:text-[50px] font-bold text-[#6B2E93]">
              Success.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-700 text-base sm:text-lg lg:text-[20px] max-w-md lg:max-w-sm">
            Join thousands of learners on EduCore and start your learning
            journey today.
          </p>

          <img
            src={studentImage}
            alt="Student"
            className="hidden lg:block w-72 sm:w-96 lg:w-120 h-auto lg:h-80 mt-6 lg:mt-8 object-contain"
          />
        </div>

        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 max-w-md sm:max-w-xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold">
              Welcome!
            </h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Please fill in your details to register
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-base sm:text-lg font-poppins font-bold mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-800 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-poppins font-bold mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-800 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-poppins font-bold mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-800 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-poppins font-bold mb-2">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-800 rounded-xl px-4 py-3 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B2E93] hover:bg-[#5a257a] text-white py-3 rounded-xl text-base sm:text-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
