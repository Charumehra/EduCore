import { Link } from "react-router-dom";
import studentImage from "../assets/student.png";

function Login() {
  return (
    <div className="h-screen overflow-y-auto bg-[#D8C8EB] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-0">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
        
        {/* Left Section  */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
             <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-tight">
            Learn. Grow.
            <br />
              <span className="text-4xl sm:text-5xl lg:text-[50px] font-bold text-[#6B2E93]">Success.</span>
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

        {/* Right Section */}
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl p-4 sm:p-7 lg:p-10 max-w-sm sm:max-w-lg lg:max-w-xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold">Welcome!</h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Login to start your learning journey
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-base sm:text-lg font-poppins font-bold mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-800 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-poppins font-bold mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-800 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6B2E93] hover:bg-[#5a257a] text-white py-3 rounded-xl text-base sm:text-lg font-medium transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm sm:text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;