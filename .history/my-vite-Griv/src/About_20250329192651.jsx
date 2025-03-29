"use client"

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aboutAnimation from "../src/assets/.json";
import { ChevronRight, MapPin, Clock, Shield, GitlabIcon as GitHub, Linkedin, Twitter } from 'lucide-react';

const About = () => {
  const features = [
    { 
      icon: <MapPin className="h-5 w-5 text-green-600" />, 
      title: "Location-based Reporting", 
      description: "Pinpoint issues on a map for accurate location tracking" 
    },
    { 
      icon: <Clock className="h-5 w-5 text-green-600" />, 
      title: "Real-time Updates", 
      description: "Track the status of your complaints as they progress" 
    },
    { 
      icon: <Shield className="h-5 w-5 text-green-600" />, 
      title: "Anonymous Reporting", 
      description: "Report issues without revealing your identity" 
    },
  ];

  const creators = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in React and Node.js. Passionate about civic tech.",
      image: "/placeholder.svg?height=100&width=100",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Priya Sharma",
      role: "UI/UX Designer",
      bio: "Designer focused on creating accessible and intuitive user experiences for social impact projects.",
      image: "/placeholder.svg?height=100&width=100",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Marcus Chen",
      role: "Project Manager",
      bio: "Experienced in coordinating civic tech initiatives and building community partnerships.",
      image: "/placeholder.svg?height=100&width=100",
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-200 opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-green-300 opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>

      {/* Heading with enhanced animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 mb-3 drop-shadow-sm">
            About GrievanceHub
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Empowering citizens to report and resolve civic issues efficiently
          </p>
        </motion.div>
      </motion.div>
      
      {/* Content Section with improved layout */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-12 z-10">
        {/* Lottie Animation with enhanced container */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-50 rounded-full blur-3xl opacity-30" />
            <Lottie 
              animationData={aboutAnimation} 
              className="w-full h-full max-w-md relative z-10" 
            />
          </div>
        </motion.div>

        {/* Text Content with enhanced design */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 backdrop-blur-sm bg-opacity-80">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              GrievanceHub is designed to empower citizens by providing an easy and 
              anonymous way to report civic issues. Whether it's potholes, garbage disposal, 
              or water shortages, we ensure your concerns reach the right authorities for 
              swift resolution.
            </p>
            
            <div className="space-y-4 mt-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.2), duration: 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-green-100 p-2 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              className="mt-8 flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Stats section */}
      <motion.div 
        className="flex flex-wrap justify-center gap-8 mt-16 w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {[
          { value: "10,000+", label: "Issues Reported" },
          { value: "85%", label: "Resolution Rate" },
          { value: "24hrs", label: "Avg. Response Time" }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            className="bg-white bg-opacity-80 backdrop-blur-sm px-8 py-6 rounded-xl shadow-md border border-green-100"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-3xl font-bold text-green-600">{stat.value}</h3>
            <p className="text-green-700">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Creators Section */}
      <motion.section 
        className="w-full max-w-6xl mt-24 mb-12 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-3">Meet Our Team</h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            The passionate individuals behind GrievanceHub working to make a difference in civic engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-green-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + (index * 0.2), duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="relative h-48 bg-gradient-to-r from-green-400 to-green-600">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <img 
                    src={creator.image || "/placeholder.svg"} 
                    alt={creator.name} 
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <h3 className="text-xl font-bold text-gray-800">{creator.name}</h3>
                <p className="text-green-600 font-medium mb-3">{creator.role}</p>
                <p className="text-gray-600 mb-6">{creator.bio}</p>
                
                <div className="flex justify-center space-x-4">
                  <a href={creator.social.github} className="text-gray-600 hover:text-green-600 transition-colors">
                    <GitHub className="h-5 w-5" />
                  </a>
                  <a href={creator.social.linkedin} className="text-gray-600 hover:text-green-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={creator.social.twitter} className="text-gray-600 hover:text-green-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
