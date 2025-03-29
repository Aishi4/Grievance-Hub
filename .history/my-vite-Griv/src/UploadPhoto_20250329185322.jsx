"use client"

import { useState, useRef } from "react";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";
import { Upload, ImageIcon, MapPin, FileText, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCode, setUploadCode] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setDescription("");
    setLocation("");
    setUploadStatus("");
    setUploadCode(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return setUploadStatus("Please select a file");

    setIsUploading(true);
    setUploadStatus("Uploading...");

    const uniqueCode = uuidv4().slice(0, 6);
    const filePath = `uploads/${uniqueCode}-${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage.from("images").upload(filePath, file);
    if (uploadError) return setUploadStatus(`Error: ${uploadError.message}`), setIsUploading(false);

    const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(filePath);
    const imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from("photos").insert([
      { code: uniqueCode, image_url: imageUrl, description, location, status: "Under Review" }
    ]);
    if (insertError) return setUploadStatus(`Error: ${insertError.message}`), setIsUploading(false);

    setUploadCode(uniqueCode);
    setUploadStatus("success");
    resetForm();
    setIsUploading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-5 border-b flex items-center gap-2 text-xl font-semibold">
        <Upload className="h-5 w-5" />
        <span>Upload Photo</span>
      </div>
      <div className="p-5 space-y-4">
        <AnimatePresence mode="wait">
          {uploadStatus === "success" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center bg-green-50 p-6 rounded-lg">
              <Check className="h-8 w-8 text-green-600 mx-auto" />
              <h3 className="text-lg font-medium text-green-800">Upload Successful!</h3>
              <p className="text-green-700">Your code: <span className="font-mono font-bold">{uploadCode}</span></p>
              <button onClick={resetForm} className="mt-4 py-2 px-4 border rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Upload Another Photo
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
                <input ref={fileInputRef} id="photo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                {preview ? (
                  <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-indigo-300">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 text-white" onClick={resetForm}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-indigo-300 p-8 text-center cursor-pointer hover:bg-gray-50">
                    <ImageIcon className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to select an image</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" /> Description
                </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md resize-none" rows={3} placeholder="Tell us about your photo..." />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4" /> Location
                </label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="Where was this photo taken?" />
              </div>
              {uploadStatus && uploadStatus !== "success" && <p className="text-red-500 text-sm">{uploadStatus}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {uploadStatus !== "success" && (
        <div className="px-5 py-4 bg-gray-50 border-t">
          <button onClick={handleUpload} disabled={isUploading || !file} className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300">
            {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : "Upload Photo"}
          </button>
        </div>
      )}
    </div>
  );
}
