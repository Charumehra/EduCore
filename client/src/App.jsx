import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Dashboard } from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
