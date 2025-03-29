import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import React from "react";
import Footer from "./Footer"; // Assuming you have a Footer component
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* This is needed to render the current route's component */}
      <
    </div>
  );
}

export default Layout;
