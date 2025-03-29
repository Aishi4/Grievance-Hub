import React, { useState } from 'react';
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import { Camera, MapPin, FileText, Check, Upload, ArrowRight, X } from 'lucide-react';

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file || !description || !location) {
      setUploadStatus('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setUploadStatus('Submitting...');

    try {
      const code = uuidv4().slice(0, 6);
      const filePath = `uploads/${code}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
      const imageUrl = publicUrlData.publicUrl;
      const { error: insertError } = await supabase.from('photos').insert([
        { code, image_url: imageUrl, description, location, status: 'Under Review' },
      ]);
      if (insertError) throw insertError;
      
      setUploadProgress(100);
      setUniqueCode(code);
      setTimeout(() => setCurrentStep(4), 500);
    } catch (error) {
      setUploadStatus(`Submission failed: ${error.message}`);
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center p-4 bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Your Photo</h2>
        <p className="text-center text-gray-600 mb-6">Share your moments with our community</p>
        {uploadStatus && <p className="text-center text-red-500 mb-4">{uploadStatus}</p>}
        <div className="flex flex-col items-center">
          {preview ? (
            <div className="relative">
              <img src={preview} className="w-full max-h-96 object-contain" alt="Preview" />
              <button onClick={clearFile} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                <X size={18} />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-gray-300 p-12 w-full text-center cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <Upload size={40} className="mx-auto text-gray-500" />
              <p className="text-gray-500 mt-2">Click to upload or drag & drop</p>
            </label>
          )}
        </div>
        <div className="mt-6">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea className="w-full border p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide details about your photo..." />
        </div>
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Location</label>
          <input className="w-full border p-2 rounded" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where was this photo taken?" />
        </div>
        <div className="mt-6 flex justify-between">
          <button className="bg-gray-300 px-4 py-2 rounded" disabled={isSubmitting || currentStep === 1} onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isSubmitting} onClick={handleUpload}>{isSubmitting ? 'Submitting...' : 'Submit Photo'}</button>
        </div>
      </div>
    </div>
  );
}
