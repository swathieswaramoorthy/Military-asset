// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ROLES = ["Admin", "Base Commander", "Logistics Officer"];

export default function Signup({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
    assignedBase: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in name, email, and password.");
      return;
    }
    if (form.role === "Base Commander" && !form.assignedBase.trim()) {
      setError("Assigned Base is required for Base Commander.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password, // (use bcrypt on the server in production)
        role: form.role,
        assignedBase: form.role === "Base Commander" ? form.assignedBase.trim() : "",
      };

      const res = await axios.post("http://localhost:5000/api/auth/signup", payload);

      // store user and move to dashboard
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Signup failed. Please check your details or try a different email.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const showAssignedBase = form.role === "Base Commander";

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create an Account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={onChange}
          autoComplete="name"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={onChange}
          autoComplete="email"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
          onChange={onChange}
          autoComplete="new-password"
          required
        />

        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm font-medium">Role</label>
          <select
            name="role"
            className="border p-2 rounded"
            value={form.role}
            onChange={onChange}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {showAssignedBase && (
          <input
            name="assignedBase"
            type="text"
            placeholder="Assigned Base (e.g., Base 1)"
            className="border p-2 rounded"
            value={form.assignedBase}
            onChange={onChange}
            required={showAssignedBase}
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Creating account..." : "Sign Up"}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
