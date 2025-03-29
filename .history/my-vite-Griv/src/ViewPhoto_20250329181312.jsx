import React, { useState } from 'react';
import { supabase } from './supabase';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import emptyAnimation from './assets'; // Ensure you have a Lottie JSON file

export default function ViewPhoto() {
  const [code, setCode] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhoto = async () => {
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchPhoto();
    }
  };

  const statusColors = {
    'Under Review': 'bg-yellow-500',
    'In Progress': 'bg-blue-500',
    'Resolved': 'bg-green-500',
    'Rejected': 'bg-red-500',
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <Search size={24} className="mr-2 text-blue-600" /> Track Grievance
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tracking Code
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter your tracking code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              />
              <button
                onClick={fetchPhoto}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium flex items-center"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Search'}
              </button>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-red-600 flex items-center text-sm"
              >
                <AlertCircle size={16} className="mr-1" /> {error}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Show Lottie animation if no photo is found */}
        {!photo && !error && (
          <div className="mt-6 flex flex-col items-center">
            <Lottie animationData={emptyAnimation} className="w-64 h-64" />
            <p className="text-gray-600 mt-4">No grievance found yet.</p>
          </div>
        )}

        {photo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Grievance Details</h3>
              <span
                className={`px-4 py-2 text-sm font-medium text-white rounded-full ${
                  statusColors[photo.status] || 'bg-gray-500'
                }`}
              >
                {photo.status}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={photo.image_url}
                alt="Grievance"
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
              />
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Description</h4>
                  <p className="bg-gray-100 p-3 rounded-lg text-sm">{photo.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Location</h4>
                  <p className="bg-gray-100 p-3 rounded-lg text-sm">{photo.location}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Tracking Code</h4>
                  <p className="bg-gray-100 p-3 rounded-lg text-sm font-mono">{photo.code}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
