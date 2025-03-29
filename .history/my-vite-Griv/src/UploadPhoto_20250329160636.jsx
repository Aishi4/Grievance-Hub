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
    <div className="max-w-lg mx-auto py-12 px-8 bg-white rounded-3xl shadow-xl border border-gray-200 text-black transition-all duration-300 hover:shadow-2xl">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Upload Your Photo</h1>
      <div className="space-y-8">
        {currentStep === 1 && (
          <div className="text-center">
            {preview ? (
              <div className="relative">
                <img src={preview} className="w-full rounded-xl shadow-lg" alt="Preview" />
                <button onClick={clearFile} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition">
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-400 p-12 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <Upload size={48} className="mx-auto text-gray-600" />
                <p className="mt-4 text-sm text-gray-700">Click to upload or drag & drop</p>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}
            <button onClick={() => setCurrentStep(2)} disabled={!file} className={`mt-8 px-8 py-4 text-white font-bold rounded-xl shadow-md transition ${file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}>Next</button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <label className="block mb-3 font-bold text-gray-800">Description *</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Provide details..." />
            <label className="block mt-6 mb-3 font-bold text-gray-800">Location *</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Enter location" />
            <button onClick={() => setCurrentStep(3)} disabled={!description || !location} className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition">Review</button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Submission</h2>
            <img src={preview} className="w-full rounded-xl shadow-lg mb-6" alt="Preview" />
            <p><strong className="text-gray-800">Description:</strong> {description}</p>
            <p className="mt-3"><strong className="text-gray-800">Location:</strong> {location}</p>
            <button onClick={handleUpload} disabled={isSubmitting} className="mt-8 px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 transition">Submit</button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center">
            <Check size={56} className="mx-auto text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900 mt-6">Submission Successful</h2>
            <p className="mt-4 text-lg">Your tracking code: <strong className="text-blue-600 text-xl">{uniqueCode}</strong></p>
            <button onClick={() => setCurrentStep(1)} className="mt-8 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition">Submit Another</button>
          </div>
        )}
      </div>
    </div>
  );
}