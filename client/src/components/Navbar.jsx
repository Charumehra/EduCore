import { CircleUserRound } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="h-15 border-b border-gray-300 bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between z-50 fixed top-0 left-0 right-0">
      {/* Logo */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <img
          src={logo}
          alt="EduCore Logo"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
        />

        <h1 className="font-poppins font-semibold leading-none whitespace-nowrap text-2xl sm:text-[28px] lg:text-[32px]">
          <span className="text-black">Edu</span>
          <span className="text-[#6B2E93]">Core</span>
        </h1>
      </div>

      {/* Profile */}
      <button type="button" className="flex items-center justify-center">
        <CircleUserRound
          strokeWidth={1}
          className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-purple-900"
        />
      </button>
    </nav>
  );
}

export default Navbar;
