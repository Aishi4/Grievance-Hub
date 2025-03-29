import React, { useState, useCallback } from 'react';
import { supabase } from './supabase';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import emptyAnimation from './assets/search.json';

export default function ViewPhoto() {
  const [code, setCode] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const statusColors = {
    'Under Review': 'bg-yellow-500',
    'In Progress': 'bg-blue-500',
    'Resolved': 'bg-green-500',
    'Rejected': 'bg-red-500',
  };

  const fetchPhoto = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter a tracking code');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('code', code.trim())
        .single();

      if (error || !data) {
        setError('No grievance found with this code.');
        setPhoto(null);
      } else {
        setPhoto(data);
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-green-50 to-green-100 relative overflow-hidden">
      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['top-20 left-10', 'top-40 right-10', 'bottom-20 left-1/3'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`} />
        ))}
      </div>

      <div className="max-w-3xl mx-auto p-6">
        {/* Search Box */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold flex items-center mb-4 text-blue-">
            <Search size={24} className="mr-2 text-black" /> Track Grievance
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Code</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter your tracking code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchPhoto()}
                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                onClick={fetchPhoto}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg flex items-center disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Search'}
              </button>
            </div>
            {error && <ErrorMessage message={error} />}
          </div>
        </motion.div>

        {/* Lottie Animation */}
        {!photo && !error && (
          <div className="mt-6 flex flex-col items-center">
            <Lottie animationData={emptyAnimation} className="w-64 h-64" />
            <p className="text-gray-600 mt-4">No grievance found yet.</p>
          </div>
        )}

        {/* Display Photo Details */}
        {photo && <GrievanceDetails photo={photo} statusColors={statusColors} />}
      </div>
    </div>
  );
}

const ErrorMessage = ({ message }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-red-600 flex items-center text-sm" aria-live="polite">
    <AlertCircle size={16} className="mr-1" /> {message}
  </motion.div>
);

const GrievanceDetails = ({ photo, statusColors }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-white p-6 rounded-xl shadow-lg border">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold">Grievance Details</h3>
      <StatusBadge status={photo.status} statusColors={statusColors} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={photo.image_url} alt="Grievance" className="w-full h-64 object-cover rounded-lg border" />
      <div className="space-y-4">
        <DetailItem title="Description" content={photo.description} />
        <DetailItem title="Location" content={photo.location} />
        <DetailItem title="Tracking Code" content={photo.code} isMono />
      </div>
    </div>
  </motion.div>
);

const StatusBadge = ({ status, statusColors }) => (
  <span className={`px-4 py-2 text-sm font-medium text-white rounded-full ${statusColors[status] || 'bg-gray-500'}`}>
    {status}
  </span>
);

const DetailItem = ({ title, content, isMono = false }) => (
  <div>
    <h4 className="font-medium text-gray-700">{title}</h4>
    <p className={`bg-gray-100 p-3 rounded-lg text-sm ${isMono ? 'font-mono' : ''}`}>{content}</p>
  </div>
);
