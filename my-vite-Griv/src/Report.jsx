import { useState, useEffect } from "react";

const Report = () => {
  const [reports, setReports] = useState([]);

  // Simulating fetching reports from an API
  useEffect(() => {
    const fetchReports = async () => {
      // Replace with actual API call
      const fakeReports = [
        { id: 1, title: "Pothole on Main Street", status: "Pending", date: "2025-03-25" },
        { id: 2, title: "Garbage not collected", status: "In Progress", date: "2025-03-24" },
        { id: 3, title: "Streetlights not working", status: "Resolved", date: "2025-03-23" },
      ];
      setReports(fakeReports);
    };
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Reported Issues</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {reports.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 border">Issue</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="text-center border-b">
                  <td className="p-3 border">{report.title}</td>
                  <td className={`p-3 border ${
                    report.status === "Resolved" ? "text-green-600" : 
                    report.status === "In Progress" ? "text-yellow-600" : "text-red-600"
                  }`}>
                    {report.status}
                  </td>
                  <td className="p-3 border">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default Report;
