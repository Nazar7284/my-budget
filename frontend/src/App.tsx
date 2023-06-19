import "./App.css";
import { useAppSelector } from "./hooks/redux";
import { useRoutes } from "./hooks/routes";

function App() {
  const { isLogin } = useAppSelector((state) => state.LoginReducer);
  const routes = useRoutes({ isLogin });

  return <div className="App">{routes}</div>;
}

export default App;
