import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
        GrievanceHub: Empowering Citizens, Enhancing Accountability
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-6">
        Facing issues in your locality? Report them anonymously on GrievanceHub, 
        the transparent and secure grievance redressal platform for your municipality.
      </p>
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-600">🔹 Raise Concerns Anonymously</h2>
          <p className="text-gray-600">Report potholes, garbage disposal, water shortages, and more while keeping your identity confidential.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-600">📸 Upload Photos for Evidence</h2>
          <p className="text-gray-600">Strengthen your complaint with images to ensure a quicker resolution.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-600">📊 Track Progress</h2>
          <p className="text-gray-600">Stay updated with real-time issue status.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-600">🔔 Automated Reminders</h2>
          <p className="text-gray-600">If your problem isn’t addressed within a week, the municipal council receives an automatic reminder.</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="mt-8 flex space-x-4">
        <Link to="/report" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
          Report an Issue
        </Link>
        <Link to="/track" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300">
          Track an Issue
        </Link>
      </div>
    </div>
  );
};

export default Home;
