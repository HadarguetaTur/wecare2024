import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PaddingContainer from "./components/General/Padding";
import ErrorPage from "./pages/ErrorPage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthToken } from "./utils/auth";
import { getUserByToken } from "./store/action/userAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PaddingContainer/>,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <AuthPage />, action: authAction },

    ],
  },
]);
function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      dispatch(getUserByToken(token));
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <RouterProvider router={router} />;
}

export default App;