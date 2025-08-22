// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Expenditure() {
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     category: "",
//     amount: "",
//     description: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // Fetch expenditures
//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/expenditures");
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let res;
//       if (editingId) {
//         res = await axios.put(
//           `http://localhost:5000/api/expenditures/${editingId}`,
//           formData
//         );
//         setEditingId(null);
//       } else {
//         res = await axios.post("http://localhost:5000/api/expenditures", formData);
//       }

//       setData((prev) => {
//         if (editingId) {
//           return prev.map((item) => (item._id === editingId ? res.data : item));
//         } else {
//           return [res.data, ...prev];
//         }
//       });

//       setFormData({ category: "", amount: "", description: "" });
//       setShowForm(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/expenditures/${id}`);
//       setData(data.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       category: item.category,
//       amount: item.amount,
//       description: item.description,
//     });
//     setEditingId(item._id);
//     setShowForm(true);
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Expenditures (Admin)
//       </h2>

//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => {
//             setShowForm(!showForm);
//             if (!showForm) setEditingId(null);
//           }}
//           className={`px-6 py-2 font-semibold rounded shadow text-white ${
//             showForm ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {showForm ? "Cancel" : editingId ? "Edit Expenditure" : "Add New Expenditure"}
//         </button>
//       </div>

//       {/* Form */}
//       {showForm && (
//         <div className="max-w-xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="category"
//               placeholder="Equipment Type"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//             <input
//               type="number"
//               name="amount"
//               placeholder="Total Cost"
//               value={formData.amount}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//             <input
//               type="text"
//               name="description"
//               placeholder="Remarks"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
//             >
//               {editingId ? "Update Record" : "Save Record"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
//           <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
//             <tr>
//               <th className="py-3 px-6 text-left">Date</th>
//               <th className="py-3 px-6 text-left">Equipment Type</th>
//               <th className="py-3 px-6 text-left">Total Cost</th>
//               <th className="py-3 px-6 text-left">Remarks</th>
//               <th className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length > 0 ? (
//               data.map((item) => (
//                 <tr key={item._id} className="hover:bg-gray-50 border-b border-gray-200">
//                   <td className="py-3 px-6">{new Date(item.date).toLocaleDateString()}</td>
//                   <td className="py-3 px-6">{item.category}</td>
//                   <td className="py-3 px-6">₹{item.amount}</td>
//                   <td className="py-3 px-6">{item.description}</td>
//                   <td className="py-3 px-6 flex justify-center gap-2">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="py-6 text-center text-gray-400">
//                   No records found.
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
import axios from "axios";

export default function Expenditure() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch expenditures
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenditures");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await axios.put(
          `http://localhost:5000/api/expenditures/${editingId}`,
          formData
        );
        setEditingId(null);
      } else {
        res = await axios.post("http://localhost:5000/api/expenditures", formData);
      }

      setData((prev) => {
        if (editingId) {
          return prev.map((item) => (item._id === editingId ? res.data : item));
        } else {
          return [res.data, ...prev];
        }
      });

      setFormData({ category: "", amount: "", description: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/expenditures/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      category: item.category,
      amount: item.amount,
      description: item.description,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        💰 Expenditures
      </h2>

      {/* Add Button */}
      <div className="flex justify-center mb-6">
       <button
  onClick={() => {
    setShowForm(!showForm);
    if (!showForm) setEditingId(null);
  }}
  className={`px-5 py-2 rounded-full text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ${
    showForm
      ? "bg-gradient-to-r from-gray-500 to-gray-700"
      : "bg-gradient-to-r from-green-400 to-blue-500"
  }`}
>
  {showForm ? "Cancel" : editingId ? "Edit Expenditure" : "Add Expenditure"}
</button>

      </div>

      {/* Form */}
      {showForm && (
        <div className="max-w-xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="category"
              placeholder="Equipment Type"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Total Cost"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Remarks"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-300"
            >
              {editingId ? "Update Record" : "Save Record"}
            </button>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border border-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Equipment Type</th>
              <th className="py-3 px-6 text-left">Total Cost</th>
              <th className="py-3 px-6 text-left">Remarks</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-3 px-6">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{item.category}</td>
                  <td className="py-3 px-6">₹{item.amount}</td>
                  <td className="py-3 px-6">{item.description}</td>
                  <td className="py-3 px-6 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-1 rounded-full shadow-md text-sm transition-all duration-300"
                    >
                      Edit
                    </button>
                   <button
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded-full"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

