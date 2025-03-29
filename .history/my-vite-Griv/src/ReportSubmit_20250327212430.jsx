import { useState } from "react";
import { motion } from "framer-motion";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, FileText, Send } from "lucide-react";

const storage = getStorage(app);
const db = getFirestore(app);

const ReportSubmit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
  });
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Create image previews
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = [];
     
      for (const image of formData.images) {
        const imageRef = ref(storage, `reports/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }
     
      await addDoc(collection(db, "reports"), {
        title: formData.title,
        description: formData.description,
        imageUrls,
        createdAt: new Date()
      });
     
      toast.success("Report submitted successfully!");
      setFormData({ title: "", description: "", images: [] });
      setPreviews([]);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="p-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-4 rounded-full">
                <FileText size={40} className="text-indigo-600" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Submit Your Report
            </h1>
            <p className="text-gray-500 mt-2">Share details of your grievance</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-700 font-semibold mb-2">
                Issue Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                placeholder="Briefly describe your issue"
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-700 font-semibold mb-2">
                Detailed Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 resize-none"
                placeholder="Provide comprehensive details about your issue"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Supporting Images
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 rounded-xl cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <Upload size={40} className="text-indigo-500 mb-2" />
                    <p className="text-gray-500 text-sm">
                      {formData.images.length > 0 
                        ? `${formData.images.length} image(s) selected` 
                        : "Drag & drop or click to upload"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    multiple
                    onChange={handleFileChange} 
                  />
                </label>
              </div>

              {/* Image Previews */}
              {previews.length > 0 && (
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {previews.map((preview, index) => (
                    <img 
                      key={index} 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <span>Submitting...</span>
                  <div className="animate-spin">🌀</div>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit Report</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ReportSubmit;