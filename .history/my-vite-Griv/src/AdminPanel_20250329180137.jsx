import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function AdminPanel() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const correctPassword = "admin123"; // Change this to a secure value or fetch from env

  useEffect(() => {
    if (isAuthenticated) {
      fetchPhotos();
    }
  }, [isAuthenticated]);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('photos').select('*');
    if (error) {
      console.error('Error fetching photos:', error.message);
    } else {
      setPhotos(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('photos').update({ status: newStatus }).eq('id', id);
    if (error) {
      console.error('Error updating status:', error.message);
    } else {
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === id ? { ...photo, status: newStatus } : photo
        )
      );
    }
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-gray-600 border-t-transparent rounded-full"></div>
        </div>
      ) : photos.length === 0 ? (
        <p className="text-center text-gray-600">No photos found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white shadow-lg rounded-2xl overflow-hidden p-4">
              <img src={photo.image_url} alt="Uploaded" className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="text-gray-800 font-semibold">{photo.description}</p>
                <p className="text-sm text-gray-500">{photo.location}</p>
                <p className="mt-2 text-sm"><b>Status:</b> <span className="text-blue-600">{photo.status}</span></p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => updateStatus(photo.id, 'Reviewed')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Mark as Reviewed
                  </button>
                  <button onClick={() => updateStatus(photo.id, 'Under Review')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                    Mark as Under Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
