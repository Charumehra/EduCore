import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify";
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
import PaymentSuccess from "./pages/student/PaymentSuccess";
import MyCourses from "./pages/student/MyCourses";
import StudentProfile from "./pages/student/StudentProfile";
import CreateCourse from "./pages/admin/CreateCourse";
import InstructorCreateCourse from "./pages/instructor/InstructorCreateCourse";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorProfile from "./pages/instructor/InstructorProfile";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import StudentAssignment from "./pages/student/StudentAssignment";

import RoleRoute from "./routes/RoleRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />{" "}
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />{" "}
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                {" "}
                <Register />{" "}
              </PublicRoute>
            }
          />

          <Route
            path="/student/dashboard"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/student/my-courses"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <MyCourses />
              </RoleRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentProfile />
              </RoleRoute>
            }
          />

          <Route
            path="/course/:id"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <CourseDetails />
              </RoleRoute>
            }
          />

          <Route
            path="/payment-success"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <PaymentSuccess />
              </RoleRoute>
            }
          />

          <Route
            path="/student/assignments"
            element={
              <RoleRoute allowedRoles={["student"]}>
                <StudentAssignment />
              </RoleRoute>
            }
          />

          <Route
            path="/instructor/dashboard"
            element={
              <RoleRoute allowedRoles={["instructor"]}>
                <InstructorDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/instructor/create-course"
            element={
              <RoleRoute allowedRoles={["instructor"]}>
                <InstructorCreateCourse />
              </RoleRoute>
            }
          />

          <Route
            path="/instructor/courses"
            element={
              <RoleRoute allowedRoles={["instructor"]}>
                <InstructorCourses />
              </RoleRoute>
            }
          />
          <Route
            path="/instructor/profile"
            element={
              <RoleRoute allowedRoles={["instructor"]}>
                <InstructorProfile />
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
            path="/admin/create-course"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <CreateCourse />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <AdminAnalytics />
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
