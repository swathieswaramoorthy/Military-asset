// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function Transfers() {
//   const [transfers, setTransfers] = useState([]);
//   const [form, setForm] = useState({
//     asset: "",
//     quantity: 0,
//     fromBase: "Base 1",
//     toBase: "Base 2",
//     date: "",
//   });
//   const [editingId, setEditingId] = useState(null);

//   const bases = ["Base 1", "Base 2", "Base 3"];

//   const fetchTransfers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/transfers");
//       setTransfers(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTransfers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.date) return alert("Select a date");

//     const payload = {
//       ...form,
//       date: new Date(form.date).toISOString(),
//     };

//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:5000/api/transfers/${editingId}`, payload);
//         setEditingId(null);
//       } else {
//         await axios.post("http://localhost:5000/api/transfers", payload);
//       }

//       setForm({ asset: "", quantity: 0, fromBase: "Base 1", toBase: "Base 2", date: "" });
//       fetchTransfers();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (transfer) => {
//     setForm({
//       asset: transfer.asset,
//       quantity: transfer.quantity,
//       fromBase: transfer.fromBase,
//       toBase: transfer.toBase,
//       date: transfer.date.split("T")[0],
//     });
//     setEditingId(transfer._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this transfer?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/transfers/${id}`);
//       fetchTransfers();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Transfers (Admin)</h1>

//       {/* Transfer Form */}
//       <div className="max-w-5xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
//         >
//           <input
//             type="text"
//             placeholder="Asset ID"
//             value={form.asset}
//             onChange={(e) => setForm({ ...form, asset: e.target.value })}
//             required
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={form.quantity}
//             onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
//             required
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//           <select
//             value={form.fromBase}
//             onChange={(e) => setForm({ ...form, fromBase: e.target.value })}
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           >
//             {bases.map((b) => (
//               <option key={b}>{b}</option>
//             ))}
//           </select>
//           <select
//             value={form.toBase}
//             onChange={(e) => setForm({ ...form, toBase: e.target.value })}
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           >
//             {bases.map((b) => (
//               <option key={b}>{b}</option>
//             ))}
//           </select>
//           <input
//             type="date"
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//             required
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             {editingId ? "Update" : "Transfer"}
//           </button>
//         </form>
//       </div>

//       {/* Transfers Table */}
//       <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Asset</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">From Base</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">To Base</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {transfers.map((t) => (
//               <tr key={t._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{new Date(t.date).toLocaleDateString()}</td>
//                 <td className="px-4 py-2">{t.asset}</td>
//                 <td className="px-4 py-2">{t.quantity}</td>
//                 <td className="px-4 py-2">{t.fromBase}</td>
//                 <td className="px-4 py-2">{t.toBase}</td>
//                 <td className="px-4 py-2 flex flex-wrap gap-2">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
//                     onClick={() => handleEdit(t)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded"
//                     onClick={() => handleDelete(t._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {transfers.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-400">
//                   No transfers found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({
    asset: "",
    quantity: 0,
    fromBase: "Base 1",
    toBase: "Base 2",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);

  const bases = ["Base 1", "Base 2", "Base 3"];

  const fetchTransfers = async () => {
    try {
      const res = await axios.get("https://military-asset-management-81rp.onrender.com/api/transfers");
      setTransfers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date) return alert("Select a date");

    const payload = {
      ...form,
      date: new Date(form.date).toISOString(),
    };

    try {
      if (editingId) {
        await axios.put(`https://military-asset-management-81rp.onrender.com/api/transfers/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post("https://military-asset-management-81rp.onrender.com/api/transfers", payload);
      }

      setForm({ asset: "", quantity: 0, fromBase: "Base 1", toBase: "Base 2", date: "" });
      fetchTransfers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (transfer) => {
    setForm({
      asset: transfer.asset,
      quantity: transfer.quantity,
      fromBase: transfer.fromBase,
      toBase: transfer.toBase,
      date: transfer.date.split("T")[0],
    });
    setEditingId(transfer._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transfer?")) return;
    try {
      await axios.delete(`https://military-asset-management-81rp.onrender.com/api/transfers/${id}`);
      fetchTransfers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
         Transfers
      </h1>

      {/* Transfer Form */}
      <div className="max-w-5xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
        >
          <input
            type="text"
            placeholder="Asset"
            value={form.asset}
            onChange={(e) => setForm({ ...form, asset: e.target.value })}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={form.fromBase}
            onChange={(e) => setForm({ ...form, fromBase: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            {bases.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select
            value={form.toBase}
            onChange={(e) => setForm({ ...form, toBase: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            {bases.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            {editingId ? "Update" : "Transfer"}
          </button>
        </form>
      </div>

      {/* Transfers Table */}
      <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Asset</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">From Base</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">To Base</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transfers.map((t, idx) => (
              <tr
                key={t._id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{t.asset}</td>
                <td className="px-4 py-2">{t.quantity}</td>
                <td className="px-4 py-2">{t.fromBase}</td>
                <td className="px-4 py-2">{t.toBase}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full transition"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full transition"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {transfers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400 italic">
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
