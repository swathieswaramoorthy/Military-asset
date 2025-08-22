// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ExpenditureCommander() {
//   const [expenditures, setExpenditures] = useState([]);
//   const [form, setForm] = useState({
//     category: "",
//     amount: "",
//     description: "",
//     date: "",
//   });
//   const [showForm, setShowForm] = useState(false);

//   // Fetch Expenditures
//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/expenditures");
//       setExpenditures(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/expenditures", form);
//       setForm({ category: "", amount: "", description: "", date: "" });
//       setShowForm(false);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Expenditures (Base Commander)
//       </h1>

//       {/* Toggle Button */}
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="px-6 py-2 font-semibold rounded-lg shadow text-white bg-blue-600 hover:bg-blue-700"
//         >
//           {showForm ? "Cancel" : "Add Expenditure"}
//         </button>
//       </div>

//       {/* Expenditure Form */}
//       {showForm && (
//         <div className="max-w-5xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
//           >
//             <input
//               type="text"
//               name="category"
//               placeholder="Equipment Type"
//               value={form.category}
//               onChange={handleChange}
//               required
//               className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="number"
//               name="amount"
//               placeholder="Total Cost"
//               value={form.amount}
//               onChange={handleChange}
//               required
//               className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="text"
//               name="description"
//               placeholder="Remarks"
//               value={form.description}
//               onChange={handleChange}
//               className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="date"
//               name="date"
//               value={form.date}
//               onChange={handleChange}
//               required
//               className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//             />
//             <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
//               Save
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Expenditure Table */}
//       <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3">Date</th>
//               <th className="px-4 py-3">Equipment</th>
//               <th className="px-4 py-3">Cost</th>
//               <th className="px-4 py-3">Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expenditures.map((e) => (
//               <tr key={e._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">
//                   {new Date(e.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-4 py-2">{e.category}</td>
//                 <td className="px-4 py-2">₹{e.amount}</td>
//                 <td className="px-4 py-2">{e.description}</td>
//               </tr>
//             ))}
//             {expenditures.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-gray-400">
//                   No expenditure records found.
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

export default function ExpenditureCommander() {
  const [expenditures, setExpenditures] = useState([]);
  const [form, setForm] = useState({
    category: "",
    amount: "",
    description: "",
    date: "",
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch Expenditures
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenditures");
      setExpenditures(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/expenditures", form);
      setForm({ category: "", amount: "", description: "", date: "" });
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
         Expenditures
      </h1>

      {/* Toggle Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-5 py-2 rounded-full text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ${
            showForm
              ? "bg-gradient-to-r from-gray-500 to-gray-700"
              : "bg-gradient-to-r from-green-400 to-blue-500"
          }`}
        >
          {showForm ? "Cancel" : "Add Expenditure"}
        </button>
      </div>

      {/* Expenditure Form */}
      {showForm && (
        <div className="max-w-5xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
          >
            <input
              type="text"
              name="category"
              placeholder="Equipment Type"
              value={form.category}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="amount"
              placeholder="Total Cost"
              value={form.amount}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="description"
              placeholder="Remarks"
              value={form.description}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
              Save
            </button>
          </form>
        </div>
      )}

      {/* Expenditure Table */}
      <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Equipment</th>
              <th className="px-6 py-3 text-left">Cost</th>
              <th className="px-6 py-3 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {expenditures.length > 0 ? (
              expenditures.map((e) => (
                <tr
                  key={e._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{e.category}</td>
                  <td className="px-6 py-3 font-semibold text-green-600">
                    ₹{e.amount}
                  </td>
                  <td className="px-6 py-3">{e.description}</td>
                </tr>
              ))
            ) : (
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

