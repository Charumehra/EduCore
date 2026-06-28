import { useSelector } from "react-redux";
import { Menu, CircleUserIcon } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = ({ setIsOpen }) => {
  const { user } = useSelector((state) => state.auth);
  
const handleProfileClick = () => {
  if (!user) return;

  if (user.role === "student") {
    window.location.href = "/student/profile";
  } else if (user.role === "instructor") {
    window.location.href = "/instructor/profile";
  } else if (user.role === "admin") {
    window.location.href = "/admin/profile";
  }
};
  return (
    <div className="w-full  h-14 bg-white shadow fixed top-0 left-0 z-30">
      {user ? (
        <div className="h-full flex items-center justify-between px-4">
          <button aria-label="Open menu" onClick={() => setIsOpen(true)} className="text-2xl">
            <Menu size={24} color="#6B2E93" />
          </button>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <img
              src={logo}
              alt="EduCore Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
            <h1 className="font-poppins font-bold leading-none whitespace-nowrap text-2xl sm:text-[20px] lg:text-[28px]">
              <span className="text-black">Edu</span>
              <span className="text-primary">Core</span>
            </h1>
          </div>

          <button 
            aria-label="View profile"
            onClick={handleProfileClick}
            className="w-7.5 h-7.5  outline-2 outline-primary rounded-full bg-white text-primary flex items-center justify-center font-semibold"
          >
            {user.name[0].toUpperCase()}
          </button>
        </div>
      ) : (
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <img
              src={logo}
              alt="EduCore Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
            <h1 className="font-poppins font-bold leading-none whitespace-nowrap text-2xl sm:text-[20px] lg:text-[28px]">
              <span className="text-black">Edu</span>
              <span className="text-primary">Core</span>
            </h1>
          </div>

          <button aria-label="View profile" type="button" className="flex items-center justify-center">
            <CircleUserIcon size={30} color="#6B2E93" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
