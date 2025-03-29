import { useState } from 'react';
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export default function UploadPhoto() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');
    const uniqueCode = uuidv4().slice(0, 6);
    const filePath = `uploads/${uniqueCode}-${file.name}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      setUploadStatus('Upload failed: ' + uploadError.message);
      console.error(uploadError);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
    const imageUrl = publicUrlData.publicUrl;

    const { data: insertData, error: insertError } = await supabase.from('photos').insert([
      { code: uniqueCode, image_url: imageUrl, description, location, status: 'Under Review' },
    ]);

    if (insertError) {
      setUploadStatus('Database insert failed: ' + insertError.message);
      console.error(insertError);
      return;
    }

    setUploadStatus(`Upload successful! Your code: ${uniqueCode}`);
    setFile(null);
    setDescription('');
    setLocation('');
    setStep(4);
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-300 dark:bg-gray-800">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / 4) * 100}%` }}></div>
      </div>
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Step 1: Upload Photo</h2>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4 border p-2 w-full rounded-lg" />
          <button onClick={() => setStep(2)} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Step 2: Add Description</h2>
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4 border p-2 w-full rounded-lg" />
          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(1)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
            <button onClick={() => setStep(3)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Step 3: Add Location</h2>
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="mb-4 border p-2 w-full rounded-lg" />
          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(2)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
            <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded-lg">Upload</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Upload Complete</h2>
          <p className="text-gray-600 dark:text-gray-300">{uploadStatus}</p>
          <button onClick={() => setStep(1)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Upload Another</button>
        </div>
      )}
    </div>
  );
}