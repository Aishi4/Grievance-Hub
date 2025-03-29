import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Info, Search, FileText, LogIn } from "lucide-react";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(null);

  const navItems = [
    { 
      to: "/", 
      label: "Home", 
      icon: Home 
    },
    { 
      to: "/about", 
      label: "About", 
      icon: Info 
    },
    { 
      to: "/track", 
      label: "Track Issue", 
      icon: Search 
    },
    { 
      to: "/report", 
      label: "Report Issue", 
      icon: FileText,
      special: true 
    }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
      className="fixed w-full z-50 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-2xl"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with Hover Effect */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="text-3xl font-extrabold tracking-tight flex items-center space-x-2"
          >
            <span className="bg-white text-emerald-600 px-2 rounded-md">G</span>
            <span>GrievanceHub</span>
          </Link>
        </motion.div>
        
        {/* Navigation Links and Login */}
        <div className="flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div 
              key={item.to}
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
              className="relative"
            >
              <Link 
                to={item.to} 
                className={`
                  flex items-center space-x-2 
                  ${item.special 
                    ? 'bg-white text-emerald-600 px-4 py-2 rounded-full' 
                    : 'text-white hover:text-emerald-200'}
                  transition-all duration-300
                `}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
              
              {!item.special && isHovered === index && (
                <motion.div 
                  layoutId="underline"
                  className="absolute bottom-[-6px] left-0 right-0 h-1 bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                />
              )}
            </motion.div>
          ))}

          {/* Login Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-white text-emerald-700 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-emerald-50 transition-all duration-300"
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;