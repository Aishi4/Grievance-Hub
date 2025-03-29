"use client";

import { useState, useRef } from "react";
import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";
import { Upload, ImageIcon, MapPin, FileText, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [uploadCode, setUploadCode] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return setStatus("Please select a file");
    setStatus("Uploading...");

    try {
      const uniqueCode = uuidv4().slice(0, 6);
      const filePath = `uploads/${uniqueCode}-${file.name}`;

      const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file);
      if (uploadError) throw new Error(uploadError.message);

      const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(filePath);
      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("photos").insert([
        { code: uniqueCode, image_url: imageUrl, description, location, status: "Under Review" },
      ]);
      if (insertError) throw new Error(insertError.message);

      setUploadCode(uniqueCode);
      setStatus("success");
      resetForm();
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setDescription("");
    setLocation("");
    setStatus("");
    setUploadCode(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 text-xl font-semibold mb-4">
          <Upload className="h-5 w-5" />
          <span>Upload Photo</span>
        </div>
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <SuccessMessage uploadCode={uploadCode} resetForm={resetForm} />
          ) : (
            <UploadForm
              file={file}
              preview={preview}
              description={description}
              location={location}
              handleFileChange={handleFileChange}
              setDescription={setDescription}
              setLocation={setLocation}
              clearFile={clearFile}
              handleUpload={handleUpload}
              status={status}
              fileInputRef={fileInputRef}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const SuccessMessage = ({ uploadCode, resetForm }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Check className="h-8 w-8 text-green-600" />
    </motion.div>
    <h3 className="text-lg font-medium text-green-800 mb-2">Upload Successful!</h3>
    <p className="text-green-700 mb-4">Your photo has been uploaded and is under review.</p>
    <p className="text-green-800 font-mono font-bold bg-green-100 p-3 rounded-md inline-block">Code: {uploadCode}</p>
    <button onClick={resetForm} className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">Upload Another Photo</button>
  </motion.div>
);

const UploadForm = ({ file, preview, description, location, handleFileChange, setDescription, setLocation, clearFile, handleUpload, status, fileInputRef }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Photo</label>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
          <button onClick={clearFile} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <button onClick={() => fileInputRef.current?.click()} className="w-full p-4 border-2 border-dashed rounded-lg text-center text-gray-500 hover:bg-gray-50 transition">Select Photo</button>
      )}
    </div>
    <InputField label="Description" icon={FileText} value={description} setValue={setDescription} placeholder="Tell us about your photo..." />
    <InputField label="Location" icon={MapPin} value={location} setValue={setLocation} placeholder="Where was this photo taken?" />
    {status && status !== "Uploading..." && <p className="text-red-500 text-sm">{status}</p>}
    <button onClick={handleUpload} disabled={!file} className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Upload Photo</button>
  </motion.div>
);

const InputField = ({ label, icon: Icon, value, setValue, placeholder }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium">
      <Icon className="h-4 w-4" /> {label}
    </label>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 border rounded-md" />
  </div>
);
