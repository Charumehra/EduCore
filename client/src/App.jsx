import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Layout from "./components/Layout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import StudentDashboard from "./pages/student/StudentDashboard";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import AdminProfile from "./pages/admin/AdminProfile";
import CourseDetails from "./pages/student/CourseDetail";

import ProtectedRoute from "./routes/ProtectedRoutes";
import RoleRoute from "./routes/RoleRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/course/:id" element={<CourseDetails />} />

          <Route
            path="/instructor/dashboard"
            element={
              <RoleRoute allowedRoles={["instructor", "admin"]}>
                <InstructorDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/admin/courses"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <ManageCourses />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <AdminProfile />
              </RoleRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
