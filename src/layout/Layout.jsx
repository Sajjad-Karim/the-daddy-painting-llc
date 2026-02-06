import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Outlet />
      <ChatWidget />
    </div>
  );
};

export default Layout;
