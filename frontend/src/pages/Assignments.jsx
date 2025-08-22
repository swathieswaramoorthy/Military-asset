
import { useState, useEffect } from "react";
import axios from "axios";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    asset: "",
    quantity: 0,
    assignedTo: "",
    status: "Assigned",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const statuses = ["Assigned", "Expended"];

  const fetchAssignments = async (statusFilter = "All") => {
    try {
      const res = await axios.get(
        `https://military-asset-management-81rp.onrender.com/api/assignments?status=${statusFilter}`
      );
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `https://military-asset-management-81rp.onrender.com/api/assignments/${editingId}`,
          form
        );
        setEditingId(null);
      } else {
        await axios.post("https://military-asset-management-81rp.onrender.com/api/assignments", form);
      }
      setForm({
        asset: "",
        quantity: 0,
        assignedTo: "",
        status: "Assigned",
        date: "",
      });
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (assignment) => {
    setForm({
      asset: assignment.asset,
      quantity: assignment.quantity,
      assignedTo: assignment.assignedTo,
      status: assignment.status,
      date: assignment.date.split("T")[0],
    });
    setEditingId(assignment._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`https://military-asset-management-81rp.onrender.com/api/assignments/${id}`);
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`https://military-asset-management-81rp.onrender.com/api/assignments/${id}`, {
        status,
      });
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Assignments
      </h1>

      {/* Assignment Form */}
      <div className="max-w-5xl mx-auto mb-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {editingId ? "✏️ Update Assignment" : "➕ Add New Assignment"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
        >
          <input
            type="text"
            placeholder="Asset ID"
            value={form.asset}
            onChange={(e) => setForm({ ...form, asset: e.target.value })}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: parseInt(e.target.value) })
            }
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
          />
          <input
            type="text"
            placeholder="Assigned To"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
          />
          {/* <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {editingId ? "Update" : "Assign"}
          </button> */}
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
   {editingId ? "Update" : "Assign"}
</button>

        </form>
      </div>

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
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Actions
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
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  {a.status === "Assigned" && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full"
                      onClick={() => handleStatusChange(a._id, "Expended")}
                    >
                      Mark Expended
                    </button>

                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full"
                    onClick={() => handleEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded-full"
                    onClick={() => handleDelete(a._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

