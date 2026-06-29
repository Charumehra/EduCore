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
      dispatch(setUser(null));
      localStorage.removeItem("user");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      loadUser();
    }
  }, []);

  return children;
};

export default AppInitializer;