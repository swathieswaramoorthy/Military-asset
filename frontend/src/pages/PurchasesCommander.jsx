// import React, { useEffect, useState } from "react";
// import { DatePicker } from "antd";
// //import moment from "moment";
// import axios from "axios";

// export default function PurchasesCommander() {
//   const [purchases, setPurchases] = useState([]);
//   const [form, setForm] = useState({
//     assetName: "",
//     type: "Weapon",
//     base: "Base 1",
//     quantity: 0,
//     date: null,
//   });

//   const bases = ["Base 1", "Base 2", "Base 3"];
//   const types = ["Weapon", "Vehicle"];

//   const fetchPurchases = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/purchases");
//       setPurchases(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchPurchases();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.date) return alert("Select a date");

//     const payload = {
//       name: form.assetName,
//       type: form.type,
//       base: form.base,
//       quantity: form.quantity,
//       date: form.date.toISOString(),
//     };

//     try {
//       await axios.post("http://localhost:5000/api/purchases", payload);
//       setForm({ assetName: "", type: "Weapon", base: "Base 1", quantity: 0, date: null });
//       fetchPurchases();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Purchases (Base Commander)
//       </h1>

//       {/* Form Section */}
//       <div className="max-w-5xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
//         >
//           <input
//             type="text"
//             placeholder="Asset Name"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             value={form.assetName}
//             onChange={(e) => setForm({ ...form, assetName: e.target.value })}
//             required
//           />
//           <select
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             value={form.type}
//             onChange={(e) => setForm({ ...form, type: e.target.value })}
//           >
//             {types.map((t) => (
//               <option key={t}>{t}</option>
//             ))}
//           </select>
//           <select
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             value={form.base}
//             onChange={(e) => setForm({ ...form, base: e.target.value })}
//           >
//             {bases.map((b) => (
//               <option key={b}>{b}</option>
//             ))}
//           </select>
//           <input
//             type="number"
//             placeholder="Quantity"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             value={form.quantity}
//             onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
//             required
//           />
//           <DatePicker
//             className="w-full border rounded focus:ring-2 focus:ring-blue-400"
//             value={form.date}
//             onChange={(date) => setForm({ ...form, date })}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add
//           </button>
//         </form>
//       </div>

//       {/* Table Section */}
//       <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Asset</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Base</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {purchases.map((p) => (
//               <tr key={p._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{new Date(p.date).toLocaleDateString()}</td>
//                 <td className="px-4 py-2">{p.name}</td>
//                 <td className="px-4 py-2">{p.type}</td>
//                 <td className="px-4 py-2">{p.base}</td>
//                 <td className="px-4 py-2">{p.quantity}</td>
//               </tr>
//             ))}
//             {purchases.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-400">
//                   No purchases found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import axios from "axios";

export default function PurchasesCommander() {
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({
    assetName: "",
    type: "Weapon",
    base: "Base 1",
    quantity: 0,
    date: null,
  });

  const bases = ["Base 1", "Base 2", "Base 3"];
  const types = ["Weapon", "Vehicle"];

  const fetchPurchases = async () => {
    try {
      const res = await axios.get("https://military-asset-management-81rp.onrender.com/api/purchases");
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date) return alert("Select a date");

    const payload = {
      name: form.assetName,
      type: form.type,
      base: form.base,
      quantity: form.quantity,
      date: form.date.toISOString(),
    };

    try {
      await axios.post("https://military-asset-management-81rp.onrender.com/api/purchases", payload);
      setForm({
        assetName: "",
        type: "Weapon",
        base: "Base 1",
        quantity: 0,
        date: null,
      });
      fetchPurchases();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Purchases
      </h1>

      {/* Form Section */}
      <div className="max-w-5xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
        >
          <input
            type="text"
            placeholder="Asset Name"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            value={form.assetName}
            onChange={(e) => setForm({ ...form, assetName: e.target.value })}
            required
          />
          <select
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            value={form.base}
            onChange={(e) => setForm({ ...form, base: e.target.value })}
          >
            {bases.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: parseInt(e.target.value) })
            }
            required
          />
          <DatePicker
            className="w-full border rounded focus:ring-2 focus:ring-blue-400"
            value={form.date}
            onChange={(date) => setForm({ ...form, date })}
            required
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Add
          </button>
        </form>
      </div>

      {/* Table Section */}
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
                Type
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Base
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {purchases.map((p, idx) => (
              <tr
                key={p._id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2">
                  {new Date(p.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.type}</td>
                <td className="px-4 py-2">{p.base}</td>
                <td className="px-4 py-2">{p.quantity}</td>
              </tr>
            ))}
            {purchases.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No purchases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
