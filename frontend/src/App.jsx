import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PaddingContainer from "./components/General/Padding";
import ErrorPage from "./pages/ErrorPage";
import AuthPage, { action as authAction } from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthToken } from "./utils/auth";
import { fetchUsers, getUserByToken } from "./store/action/userAction";
import PrivateRoute from "./components/Auth/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import Spinner from "./components/General/spinner";
import ArticlePage from "./pages/ArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import { fetchPosts } from "./store/action/postAction";
import TerapistsPage from "./pages/TerapistsPage";
import DisplayProfile from "./pages/DisplayProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PaddingContainer />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/terapists", element: <TerapistsPage /> },
      { path: "/auth", element: <AuthPage />, action: authAction },
      { path: "//post/:postSlug", element: <ArticlePage /> },
      {
        path: "/dashboard",
        element: <PrivateRoute />,
        children: [{ path: "/dashboard", element: <UserDashboard /> }],
      },
      { path: "/therapist/:id", element: <DisplayProfile /> }, 
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

  useEffect(() => {
    try {
      const resUsers = dispatch(fetchUsers());
      const resPosts = dispatch(fetchPosts());
      console.log(resUsers,resPosts);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return <RouterProvider router={router} />;
}

export default App;
