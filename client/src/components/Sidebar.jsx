import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { setUser } from "./../redux/slices/authSlice";
import logo from "../assets/logo.png";
import {
  Home,
  BookOpen,
  User,
  PlusCircle,
  Users,
  BarChart3,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = user?.role;

  const menu = {
    student: [
      {
        name: "Dashboard",
        path: "/student/dashboard",
        icon: Home,
      },
      {
        name: "My Courses",
        path: "/student/my-courses",
        icon: BookOpen,
      },
      {
        name: "Assignments",
        path: "/student/assignments",
        icon: BookOpen,
      },
      {
        name: "Profile",
        path: "/student/profile",
        icon: User,
      },
    ],

    instructor: [
      {
        name: "Dashboard",
        path: "/instructor/dashboard",
        icon: Home,
      },
      {
        name: "Create Course",
        path: "/instructor/create-course",
        icon: PlusCircle,
      },
      {
        name: "My Courses",
        path: "/instructor/courses",
        icon: BookOpen,
      },
      // {
      //   name: "Enrolled Students",
      //   path: "/instructor/students",
      //   icon: Users,
      // },
      {
        name: "Profile",
        path: "/instructor/profile",
        icon: User,
      },
    ],

    admin: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: Home,
      },
      {
        name: "Create Course",
        path: "/admin/create-course",
        icon: PlusCircle,
      },
      {
        name: "Manage Courses",
        path: "/admin/courses",
        icon: BookOpen,
      },
      {
        name: "Manage Students",
        path: "/admin/students",
        icon: Users,
      },
      {
        name: "Analytics",
        path: "/admin/analytics",
        icon: BarChart3,
      },
      {
        name: "Profile",
        path: "/admin/profile",
        icon: User,
      },
    ],
  };

  const menuItems = menu[role] || [];

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      dispatch(setUser(null));

      setIsOpen(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2 shrink-0">
          <img
            src={logo}
            alt="EduCore Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
          />

          <h1 className="font-poppins font-bold whitespace-nowrap text-2xl sm:text-[20px] lg:text-[28px]">
            <span className="text-black">Edu</span>
            <span className="text-primary">Core</span>
          </h1>
        </div>

        <div className="  p-4 border-b border-gray-700">
          <p className="font-medium text-black">{user?.name}</p>
          <p className="text-sm text-primary capitalize">{user?.role}</p>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-2 rounded text-primary hover:text-white hover:bg-primary transition"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
