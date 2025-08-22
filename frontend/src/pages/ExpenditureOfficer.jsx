// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ExpenditureOfficer() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/expenditures");
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Expenditures (Logistics Officer)</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-6">Date</th>
//               <th className="py-3 px-6">Equipment</th>
//               <th className="py-3 px-6">Cost</th>
//               <th className="py-3 px-6">Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
//                 <td className="px-4 py-2">{item.category}</td>
//                 <td className="px-4 py-2">₹{item.amount}</td>
//                 <td className="px-4 py-2">{item.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";

export default function ExpenditureOfficer() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://military-asset-management-81rp.onrender.com/api/expenditures");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
         Expenditures
      </h1>

      {/* Expenditure Table */}
      <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Equipment
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Cost
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, idx) => (
              <tr
                key={item._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 font-medium text-green-600">
                  ₹{item.amount}
                </td>
                <td className="px-4 py-2">{item.description}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No expenditure records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

