import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout/Layout";
import NotFound from "../pages/not-found";
import ServiceDetail from "../pages/service-detail";

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
        path: "services/:slug",
        element: <ServiceDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
