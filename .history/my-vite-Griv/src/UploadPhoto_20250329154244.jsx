import React, { useState } from 'react';
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import { Camera, MapPin, FileText, Check, Upload, ArrowRight, X } from 'lucide-react';

export default function UploadPhoto() {
  // Form state
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCode, setUniqueCode] = useState('');

  // Handle file selection and preview
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

  // Clear file selection
  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen mi flex items-center justify-center bg-[#f8f8f8] p-4">
      <div className=" w-full bg-white p-8 rounded-lg shadow-xl border border-gray-300 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Neighborhood Grievance Form</h1>
        
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center justify-center">
              <Camera size={24} className="mr-2 text-blue-500" /> Upload Photo
            </h2>
            <div className="mb-6 flex flex-col items-center">
              {preview ? (
                <div className="relative mb-4">
                  <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
                  <button onClick={clearFile} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-400 bg-gray-100 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-200 transition duration-300 w-full max-w-xs" onClick={() => document.getElementById('file-upload').click()}>
                  <Upload size={40} className="mx-auto text-blue-500 mb-3" />
                  <p className="text-gray-700 mb-2 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, or GIF files</p>
                </div>
              )}
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
            <button onClick={() => setCurrentStep(2)} disabled={!file} className={`px-6 py-3 rounded-lg font-medium shadow-md transition duration-300 flex items-center justify-center ${file ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              Next <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}