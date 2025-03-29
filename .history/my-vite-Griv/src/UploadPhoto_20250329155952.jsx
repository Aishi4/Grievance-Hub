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
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-center">Upload Your Photo</h2>
      {uploadStatus && <p className="text-red-500 text-center mt-2">{uploadStatus}</p>}

      {currentStep === 1 && (
        <div className="text-center">
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="w-full rounded-lg" />
              <button onClick={() => setPreview(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                <X size={18} />
              </button>
            </div>
          ) : (
            <label className="block border-dashed border-2 border-gray-300 p-6 cursor-pointer rounded-lg">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <Upload className="mx-auto h-8 w-8 text-gray-500" />
              <p className="mt-2 text-gray-500">Click to upload</p>
            </label>
          )}
          <button onClick={() => setCurrentStep(2)} disabled={!file} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Next Step
          </button>
        </div>
      )}
      
      {currentStep === 2 && (
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea className="w-full border p-2 rounded mt-1" value={description} onChange={(e) => setDescription(e.target.value)} />

          <label className="block text-gray-700 mt-4">Location</label>
          <input className="w-full border p-2 rounded mt-1" value={location} onChange={(e) => setLocation(e.target.value)} />
          
          <div className="flex justify-between mt-4">
            <button onClick={() => setCurrentStep(1)} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
            <button onClick={() => setCurrentStep(3)} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={!description || !location}>Continue</button>
          </div>
        </div>
      )}
      
      {currentStep === 3 && (
        <div>
          <h3 className="text-lg font-semibold">Review Submission</h3>
          <img src={preview} alt="Preview" className="w-full rounded-lg mt-2" />
          <p className="mt-2"><strong>Description:</strong> {description}</p>
          <p><strong>Location:</strong> {location}</p>
          <div className="flex justify-between mt-4">
            <button onClick={() => setCurrentStep(2)} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
            <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
          </div>
        </div>
      )}
      
      {currentStep === 4 && (
        <div className="text-center">
          <Check className="mx-auto text-green-500 w-10 h-10" />
          <h3 className="text-lg font-bold mt-2">Submission Successful!</h3>
          <p>Your tracking code: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{uniqueCode}</span></p>
        </div>
      )}
    </div>
  );
}