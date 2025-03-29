import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storage = getStorage(app);
const db = getFirestore(app);

const ReportSubmit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = [];
      
      for (const image of formData.images) {
        const imageRef = ref(storage, `reports/${image.name}`);
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
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">Submit a Report</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold">Issue Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter issue title"
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the issue"
            />
          </div>

          <div>
            <label className="block font-semibold">Upload Images (Optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReportSubmit;
