import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppInitializer from "./components/AppInitializer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppInitializer>
      <App />
    </AppInitializer>
  </Provider>
);