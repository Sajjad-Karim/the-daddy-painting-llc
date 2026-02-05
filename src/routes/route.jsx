import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout/Layout";
import NotFound from "../pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
