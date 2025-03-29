import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          GrievanceHub
        </Link>
        
        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/track" className="hover:text-gray-200">Track Issue</Link>
          <Link to="/report" className="hover:text-gray-200 bg-white text-blue-600 px-4 py-2 rounded-md">Report Issue</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
