import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { setUser, setLoading } from "../redux/slices/authSlice";

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
      console.error("Error loading user:", err);
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
