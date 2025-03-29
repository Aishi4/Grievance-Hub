import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aboutAnimation from "../";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-center px-6 py-12">
      {/* Heading */}
      <motion.h1
        className="text-5xl font-extrabold text-gray-800 mb-6 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About GrievanceHub
      </motion.h1>
      
      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mt-10">
        {/* Lottie Animation */}
        <div className="w-96 h-96 flex justify-center items-center">
          <Lottie animationData={aboutAnimation} className="w-full h-full" />
        </div>

        {/* Text Content */}
        <motion.div 
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 max-w-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            GrievanceHub is designed to empower citizens by providing an easy and 
            anonymous way to report civic issues. Whether it's potholes, garbage disposal, 
            or water shortages, we ensure your concerns reach the right authorities for 
            swift resolution. Our platform also allows you to track the status of your 
            complaints in real time and receive automated reminders.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;