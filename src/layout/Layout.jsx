import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";
import Footer from "../components/Footer";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;
