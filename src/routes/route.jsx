import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout/Layout";
import NotFound from "../pages/not-found";
import Services from "../pages/services";
import ServiceDetail from "../pages/service-detail";
import About from "../pages/about";
import WhyChooseUs from "../pages/why-choose-us";
import Gallery from "../pages/gallery";

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
        path: "services",
        element: <Services />,
      },
      {
        path: "services/:slug",
        element: <ServiceDetail />,
      },
      {
        path: "about/*",
        element: <About />,
      },
      {
        path: "why-choose-us",
        element: <WhyChooseUs />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
