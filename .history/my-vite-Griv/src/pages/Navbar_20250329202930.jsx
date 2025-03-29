"use client"
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, Search, FileText, LogIn, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { auth } from "../firebaseConfig"; // Ensure correct path
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/track", label: "Track Issue", icon: Search },
    { to: "/report", label: "Report Issue", icon: FileText, special: true },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-emerald-800/95 backdrop-blur-md shadow-lg" : "py-4 bg-gradient-to-r from-emerald-600 to-emerald-800"
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
            <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <div className="relative">
                <span className="absolute inset-0 bg-emerald-400 rounded-md blur-sm"></span>
                <span className="relative bg-white text-emerald-600 px-2 rounded-md">G</span>
              </div>
              <span className="text-white">GrievanceHub</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                onHoverStart={() => setIsHovered(index)}
                onHoverEnd={() => setIsHovered(null)}
                className="relative"
              >
                <Link to={item.to} className={`
                    flex items-center space-x-2 py-2 px-3 rounded-lg
                    ${location.pathname === item.to && !item.special ? "bg-emerald-700/50" : ""}
                    ${
                      item.special
                        ? "bg-white text-emerald-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-emerald-50"
                        : "text-white hover:text-emerald-200"
                    }
                    transition-all duration-300
                  `}
                >
                  <item.icon size={18} className={item.special ? "text-emerald-500" : ""} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}

            {/* User Info / Login Button */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"} 
                    alt="User Profile"
                    className="w-8 h-8 rounded-full border border-white"
                  />
                  <span className="text-white font-semibold">{user.displayName || "User"}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:bg-red-400 transition-all duration-300"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:bg-emerald-400 transition-all duration-300"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-emerald-700 text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-emerald-800/95 backdrop-blur-md shadow-lg md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link key={item.to} to={item.to} className="flex items-center space-x-3 p-3 rounded-lg text-white">
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-red-500 text-white my-2"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                ) : (
                  <Link to="/login" className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-500 text-white my-2">
                    <LogIn size={20} />
                    <span className="font-medium">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
