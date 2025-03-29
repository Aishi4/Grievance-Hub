"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Lottie from "lottie-react"
import animationData from "../src/assets/earth.json"

const Home = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 text-center max-w-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-green-800 bg-green-100 rounded-full shadow-sm">
          Citizen Empowerment Platform
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6 leading-tight drop-shadow-sm">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
            GrievanceHub
          </span>
          <span className="block text-3xl md:text-4xl mt-2 text-green-700">
            Empowering Citizens, Enhancing Accountability
          </span>
        </h1>
        <p className="text-lg md:text-xl text-green-700 max-w-3xl mx-auto">
          A modern platform that connects citizens with local authorities to resolve community issues efficiently and
          transparently.
        </p>
      </motion.div>

      {/* Features & Animation Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mt-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        {/* Lottie Animation */}
        <div className="w-full md:w-2/5 h-80 md:h-96 flex justify-center items-center order-2 md:order-1 mt-8 md:mt-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-teal-300 rounded-full filter blur-3xl opacity-30"></div>
            <Lottie animationData={animationData} className="w-full h-full relative z-10" />
          </div>
        </div>

        {/* Features List */}
        <div className="w-full md:w-3/5 order-1 md:order-2">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center md:text-left">Why Choose GrievanceHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🔒",
                title: "Anonymous Reporting",
                desc: "Report issues while keeping your identity confidential.",
              },
              {
                icon: "📸",
                title: "Visual Evidence",
                desc: "Upload photos to strengthen your complaint for faster resolution.",
              },
              {
                icon: "📊",
                title: "Real-time Tracking",
                desc: "Monitor the progress of your reported issues with live updates.",
              },
              {
                icon: "🔔",
                title: "Smart Reminders",
                desc: "Automatic escalation if issues aren't addressed within a week.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-green-100 hover:border-green-300 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">{feature.title}</h3>
                <p className="text-green-700">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonial Section */}
      <motion.div
        className="w-full max-w-4xl mt-16 bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-green-100 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <p className="text-green-800 text-lg italic mb-4">
            "GrievanceHub transformed how our community interacts with local authorities. The pothole I reported was
            fixed within 3 days, and I could track the entire process!"
          </p>
          <p className="font-medium text-green-700">— Samantha K., Community Member</p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <Link
          to="/report"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-xl text-lg font-semibold transform transition duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center group"
        >
          <span>Report an Issue</span>
          <svg
            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
        <Link
          to="/track"
          className="bg-white text-green-700 border-2 border-green-500 px-8 py-4 rounded-xl shadow-lg text-lg font-semibold transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-50 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
          <span>Track an Issue</span>
        </Link>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="w-full max-w-4xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        {[
          { value: "2,500+", label: "Issues Resolved" },
          { value: "94%", label: "Resolution Rate" },
          { value: "48hrs", label: "Avg. Response Time" },
          { value: "12", label: "Municipalities" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center shadow-md border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
          >
            <div className="text-2xl md:text-3xl font-bold text-green-700">{stat.value}</div>
            <div className="text-sm text-green-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Home

