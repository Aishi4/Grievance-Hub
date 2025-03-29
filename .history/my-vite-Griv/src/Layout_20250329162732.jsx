
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-[70px]"> {/* Adjust this padding based on navbar height */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
