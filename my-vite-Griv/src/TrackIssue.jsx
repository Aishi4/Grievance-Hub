import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrackIssue = () => {
  const [issueNumber, setIssueNumber] = useState("");
  const [issueStatus, setIssueStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (issueNumber === "123456") {
        setIssueStatus({ status: "Resolved", details: "Your issue has been successfully resolved." });
      } else {
        setIssueStatus({ status: "In Progress", details: "Your issue is currently being reviewed by our team." });
      }
      setLoading(false);
      toast.success("Issue status fetched successfully!");
    }, 2000);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-700 to-purple-900 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200 p-10"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full shadow-lg">
              <FileText size={40} className="text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Track Your Issue
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Enter your issue number to check the status</p>
        </motion.div>

        <form onSubmit={handleTrack} className="space-y-6">
          <label className="block text-gray-800 font-semibold mb-2 text-lg">Issue Number</label>
          <input
            type="text"
            value={issueNumber}
            onChange={(e) => setIssueNumber(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Enter your issue number"
          />
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-3 rounded-xl flex items-center justify-center">
            {loading ? "Checking..." : <><Search size={20} className="mr-2" /> Check Status</>}
          </button>
        </form>

        {issueStatus && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-gray-100 rounded-xl"
          >
            <h2 className="text-xl font-bold text-gray-800">Status: {issueStatus.status}</h2>
            <p className="text-gray-600 mt-2">{issueStatus.details}</p>
          </motion.div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default TrackIssue;
