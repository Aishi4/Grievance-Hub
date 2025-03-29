import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../src/assets/hero-animation.json";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.h1
        className="text-5xl font-extrabold text-blue-700 mb-6 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        GrievanceHub: Empowering Citizens, Enhancing Accountability
      </motion.h1>
      
      {/* Features & Animation Section */}
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center w-full px-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center flex-1">
          {[
            { title: "🔹 Raise Concerns Anonymously", desc: "Report potholes, garbage disposal, water shortages, and more while keeping your identity confidential." },
            { title: "📸 Upload Photos for Evidence", desc: "Strengthen your complaint with images to ensure a quicker resolution." },
            { title: "📊 Track Progress", desc: "Stay updated with real-time issue status." },
            { title: "🔔 Automated Reminders", desc: "If your problem isn’t addressed within a week, the municipal council receives an automatic reminder." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Lottie Animation */}
        <Lottie animationData={animationData} className="w-80 h-80 mx-6" />
      </motion.div>
      
      {/* Call to Action */}
      <motion.div className="mt-10 flex space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Link to="/report" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transform transition duration-300 hover:scale-110 hover:bg-blue-700">
          🚀 Report an Issue
        </Link>
        <Link to="/track" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transform transition duration-300 hover:scale-110 hover:bg-gray-300">
          🔍 Track an Issue
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;