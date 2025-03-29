import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportSubmit = () => {
  const [step, setStep] = useState(1);
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

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Report submitted successfully!");
      setFormData({ title: "", description: "", images: [] });
      setPreviews([]);
      setLoading(false);
      setStep(1);
    }, 2000);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white-700 to-purple-900 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 p-10"
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
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Submit Your Report
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Follow the steps to complete your submission</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <label className="block text-gray-800 font-semibold mb-2 text-lg">Issue Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Briefly describe your issue"
              />
              <button onClick={() => setStep(2)} className="w-full bg-blue-500 text-white p-3 rounded-xl">Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block text-gray-800 font-semibold mb-2 text-lg">Detailed Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                placeholder="Provide comprehensive details about your issue"
              />
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="bg-gray-400 text-white p-3 rounded-xl">Back</button>
                <button onClick={() => setStep(3)} className="bg-blue-500 text-white p-3 rounded-xl">Next</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <label className="block text-gray-800 font-semibold mb-2 text-lg">Upload Supporting Images</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-40 border-4 border-dashed border-blue-300 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300 rounded-xl cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-10">
                    <Upload size={40} className="text-blue-500 mb-2" />
                    <p className="text-gray-600 text-sm">
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
              {previews.length > 0 && (
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {previews.map((preview, index) => (
                    <img 
                      key={index} 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="h-24 w-24 object-cover rounded-lg border shadow-sm"
                    />
                  ))}
                </div>
              )}
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="bg-gray-400 text-white p-3 rounded-xl">Back</button>
                <button type="submit" disabled={loading} className="bg-green-500 text-white p-3 rounded-xl">Submit</button>
              </div>
            </>
          )}
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ReportSubmit;