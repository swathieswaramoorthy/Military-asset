import { useState, useEffect } from "react";
import axios from "axios";

export default function AssignmentsOfficer() {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("https://military-asset-management-81rp.onrender.com/api/assignments");
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Assignments 
    </h1>

      {/* Assignment Table */}
      <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Asset
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Quantity
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Assigned To
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignments.map((a, idx) => (
              <tr
                key={a._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2">
                  {new Date(a.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{a.asset}</td>
                <td className="px-4 py-2">{a.quantity}</td>
                <td className="px-4 py-2">{a.assignedTo}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    a.status === "Assigned"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {a.status}
                </td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No assignments available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
