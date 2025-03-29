import { Outlet } from "react-router-dom";
import 

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />  {/* This is needed to render the current route's component */}
    </div>
  );
}

export default Layout;
