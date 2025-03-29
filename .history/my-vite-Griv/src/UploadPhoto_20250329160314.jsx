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
      setUniqueCode(code);
      setCurrentStep(4);
    } catch (error) {
      setUploadStatus(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6 bg-[#f8f8f8] rounded-2xl shadow-lg border border-gray-200 text-black">
      <h1 className="text-3xl font-bold text-center mb-6">Upload Your Photo</h1>
      <div className="space-y-6">
        {currentStep === 1 && (
          <div className="text-center">
            {preview ? (
              <div className="relative">
                <img src={preview} className="w-full rounded-lg shadow-md" alt="Preview" />
                <button onClick={clearFile} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600">
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-400 p-10 rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                <Upload size={40} className="mx-auto text-gray-500" />
                <p className="mt-3 text-sm">Click to upload or drag & drop</p>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}
            <button onClick={() => setCurrentStep(2)} disabled={!file} className={`mt-6 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition ${file ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'}`}>Next</button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <label className="block mb-2 font-semibold">Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Provide details..." />
            <label className="block mt-4 mb-2 font-semibold">Location *</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter location" />
            <button onClick={() => setCurrentStep(3)} disabled={!description || !location} className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">Review</button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review Your Submission</h2>
            <img src={preview} className="w-full rounded-lg shadow-md mb-4" alt="Preview" />
            <p><strong>Description:</strong> {description}</p>
            <p className="mt-2"><strong>Location:</strong> {location}</p>
            <button onClick={handleUpload} disabled={isSubmitting} className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">Submit</button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center">
            <Check size={48} className="mx-auto text-green-500" />
            <h2 className="text-2xl font-semibold mt-4">Submission Successful</h2>
            <p className="mt-2">Your tracking code: <strong className="text-blue-600 text-lg">{uniqueCode}</strong></p>
            <button onClick={() => setCurrentStep(1)} className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">Submit Another</button>
          </div>
        )}
      </div>
    </div>
  );
}