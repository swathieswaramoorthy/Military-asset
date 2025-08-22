// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Purchases() {
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPurchases = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/purchases");
//       setPurchases(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPurchases();
//   }, []);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Purchases (Logistics Officer)
//       </h1>

//       <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
//         {loading ? (
//           <p className="text-center py-6 text-gray-500">Loading purchases...</p>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Asset</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Base</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {purchases.map((p) => (
//                 <tr key={p._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2">{new Date(p.date).toLocaleDateString()}</td>
//                   <td className="px-4 py-2">{p.name}</td>
//                   <td className="px-4 py-2">{p.type}</td>
//                   <td className="px-4 py-2">{p.base}</td>
//                   <td className="px-4 py-2">{p.quantity}</td>
//                 </tr>
//               ))}
//               {purchases.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-6 text-gray-400">
//                     No purchases found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ExpenditureOfficer() {
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenditures = async () => {
    try {
      const res = await axios.get("https://military-asset-management-81rp.onrender.com/api/expenditures");
      setExpenditures(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenditures();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
       Purchases
      </h1>

      <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        {loading ? (
          <p className="text-center py-6 text-gray-500 animate-pulse">
            Loading expenditures...
          </p>
        ) : (
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
              {expenditures.map((item, idx) => (
                <tr
                  key={item._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-2">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">₹{item.amount}</td>
                  <td className="px-4 py-2">{item.description}</td>
                </tr>
              ))}
              {expenditures.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No expenditures found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

