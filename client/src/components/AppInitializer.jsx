import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { setUser, setLoading } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

 const loadUser = async () => {
  try {
    dispatch(setLoading(true));

    const res = await api.get("/auth/info");

    dispatch(setUser(res.data.user));
  } catch (err) {
    if (err.response?.status === 401) {
      dispatch(setUser(null));
    } else {
      toast.error("Failed to load user information.");
    }
  } finally {
    dispatch(setLoading(false));
  }
};

  useEffect(() => {
    loadUser();
  }, []);

  return children;
};

export default AppInitializer;
