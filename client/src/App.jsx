import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "./index.css";

import Home from "./components/Home";
import Layout from "./components/Layout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import RoleRoute from "./routes/RoleRoute";
import PublicRoute from "./routes/PublicRoute";

// Student
const StudentDashboard = lazy(() =>
  import("./pages/student/StudentDashboard")
);
const CourseDetails = lazy(() =>
  import("./pages/student/CourseDetail")
);
const PaymentSuccess = lazy(() =>
  import("./pages/student/PaymentSuccess")
);
const MyCourses = lazy(() =>
  import("./pages/student/MyCourses")
);
const StudentProfile = lazy(() =>
  import("./pages/student/StudentProfile")
);
const StudentAssignment = lazy(() =>
  import("./pages/student/StudentAssignment")
);
const LearnCourse = lazy(() =>
  import("./pages/student/LearnCourse")
);

// Instructor
const InstructorDashboard = lazy(() =>
  import("./pages/instructor/InstructorDashboard")
);
const InstructorCreateCourse = lazy(() =>
  import("./pages/instructor/InstructorCreateCourse")
);
const InstructorCourses = lazy(() =>
  import("./pages/instructor/InstructorCourses")
);
const InstructorProfile = lazy(() =>
  import("./pages/instructor/InstructorProfile")
);

// Admin
const AdminDashboard = lazy(() =>
  import("./pages/admin/AdminDashboard")
);
const ManageCourses = lazy(() =>
  import("./pages/admin/ManageCourses")
);
const CreateCourse = lazy(() =>
  import("./pages/admin/CreateCourse")
);
const AdminAnalytics = lazy(() =>
  import("./pages/admin/AdminAnalytics")
);
const AdminProfile = lazy(() =>
  import("./pages/admin/AdminProfile")
);

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
        />

        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <p className="text-lg font-medium">Loading...</p>
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Student Routes */}
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
              path="/student/assignments"
              element={
                <RoleRoute allowedRoles={["student"]}>
                  <StudentAssignment />
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
              path="/courses/:courseId/learn"
              element={
                <RoleRoute allowedRoles={["student"]}>
                  <LearnCourse />
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

            {/* Instructor Routes */}
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

            {/* Admin Routes */}
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
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;