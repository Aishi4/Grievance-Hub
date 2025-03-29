"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Info, Search, FileText, LogIn, Menu, X, ChevronRight } from "lucide-react"

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: Home,
    },
    {
      to: "/about",
      label: "About",
      icon: Info,
    },
    {
      to: "/track",
      label: "Track Issue",
      icon: Search,
    },
    {
      to: "/report",
      label: "Report Issue",
      icon: FileText,
      special: true,
    },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-emerald-800/95 backdrop-blur-md shadow-lg"
            : "py-4 bg-gradient-to-r from-emerald-600 to-emerald-800"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo with Hover Effect */}
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
                <Link
                  to={item.to}
                  className={`
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

                  {item.special && (
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        repeatType: "loop",
                      }}
                    >
                      <ChevronRight size={16} className="ml-1" />
                    </motion.div>
                  )}
                </Link>

                {!item.special && isHovered === index && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-[-3px] left-0 right-0 h-[3px] bg-emerald-300 rounded-full"
                    initial={{ width: 0, left: "50%" }}
                    animate={{ width: "100%", left: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}

            {/* Login Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:bg-emerald-400 transition-all duration-300"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            </motion.div>
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
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg
                        ${location.pathname === item.to ? "bg-emerald-700" : ""}
                        ${item.special ? "bg-white text-emerald-600 my-2" : "text-white"}
                      `}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-500 text-white my-2"
                  >
                    <LogIn size={20} />
                    <span className="font-medium">Login</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-20 z-40 pointer-events-none overflow-hidden">
        <div className="absolute top-[-50px] left-[10%] w-20 h-20 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-[-30px] right-[20%] w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
    </>
  )
}

export default Navbar

