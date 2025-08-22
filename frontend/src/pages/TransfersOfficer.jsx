
import { useState, useEffect } from "react";
import axios from "axios";

export default function TransfersOfficer() {
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transfers");
      setTransfers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
         Transfers
      </h1>

      <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Asset</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">From</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transfers.map((t, idx) => (
              <tr
                key={t._id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}
              >
                <td className="px-4 py-3">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{t.asset}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{t.quantity}</td>
                <td className="px-4 py-3">{t.fromBase}</td>
                <td className="px-4 py-3">{t.toBase}</td>
              </tr>
            ))}
            {transfers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                  No transfers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
