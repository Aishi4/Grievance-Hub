import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import React from "react";
import Foo

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />  {/* This is needed to render the current route's component */}
    </div>
  );
}

export default Layout;
