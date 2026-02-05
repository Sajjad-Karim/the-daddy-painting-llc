import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
