import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../src/assets/hero-animation.json";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <motion.h1
        className="text-6xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        GrievanceHub: Empowering Citizens, Enhancing Accountability
      </motion.h1>
      
      {/* Features & Animation Section */}
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center flex-1">
          {[
            { title: "🔹 Raise Concerns Anonymously", desc: "Report potholes, garbage disposal, water shortages, and more while keeping your identity confidential." },
            { title: "📸 Upload Photos for Evidence", desc: "Strengthen your complaint with images to ensure a quicker resolution." },
            { title: "📊 Track Progress", desc: "Stay updated with real-time issue status." },
            { title: "🔔 Automated Reminders", desc: "If your problem isn’t addressed within a week, the municipal council receives an automatic reminder." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-3">{feature.title}</h2>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Lottie Animation */}
        <div className="w-96 h-96 flex justify-center items-center">
          <Lottie animationData={animationData} className="w-full h-full" />
        </div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div className="mt-12 flex space-x-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Link to="/report" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-xl shadow-xl text-lg font-semibold transform transition duration-300 hover:scale-110 hover:shadow-2xl">
          🚀 Report an Issue
        </Link>
        <Link to="/track" className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 px-8 py-4 rounded-xl shadow-xl text-lg font-semibold transform transition duration-300 hover:scale-110 hover:shadow-2xl">
          🔍 Track an Issue
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;