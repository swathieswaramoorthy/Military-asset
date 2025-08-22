// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// import Dashboard from "./pages/Dashboard";
// import Purchases from "./pages/Purchases";
// import PurchasesCommander from "./pages/PurchasesCommander";
// import PurchasesOfficer from "./pages/PurchasesOfficer";
// import Expenditure from "./pages/Expenditure";
// import ExpenditureCommander from "./pages/ExpenditureCommander";
// import Assignments from "./pages/Assignments";
// import AssignmentsCommander from "./pages/AssignmentsCommander";
// import Transfers from "./pages/Transfers";
// import TransfersCommander from "./pages/TransfersCommander";
// import TransfersOfficer from "./pages/TransfersOfficer";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// function App() {
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     if (savedUser) setUser(savedUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setShowDropdown(false);
//   };

//   // Role-based pages
//   const getPurchasePage = () => {
//     if (!user) return <Navigate to="/login" />;
//     if (user.role === "Admin") return <Purchases />;
//     if (user.role === "Base Commander") return <PurchasesCommander />;
//     if (user.role === "Logistics Officer") return <PurchasesOfficer />;
//     return <Navigate to="/dashboard" />;
//   };

//   const getTransferPage = () => {
//     if (!user) return <Navigate to="/login" />;
//     if (user.role === "Admin") return <Transfers />;
//     if (user.role === "Base Commander") return <TransfersCommander />;
//     if (user.role === "Logistics Officer") return <TransfersOfficer />;
//     return <Navigate to="/dashboard" />;
//   };

//   const getExpenditurePage = () => {
//     if (!user) return <Navigate to="/login" />;
//     if (user.role === "Admin") return <Expenditure />;
//     if (user.role === "Base Commander") return <ExpenditureCommander />;
//     return <Navigate to="/dashboard" />;
//   };

//   const getAssignmentPage = () => {
//     if (!user) return <Navigate to="/login" />;
//     if (user.role === "Admin") return <Assignments />;
//     if (user.role === "Base Commander") return <AssignmentsCommander />;
//     return <Navigate to="/dashboard" />;
//   };

//   return (
//     <Router>
//       {/* Navbar always visible */}
//       <nav
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           background: "#333",
//           padding: "10px 20px",
//           color: "white",
//           position: "relative",
//         }}
//       >
//         {/* Left side - links */}
//         <div style={{ display: "flex", gap: "20px" }}>
//           <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
//             Dashboard
//           </Link>
//           <Link to="/purchases" style={{ color: "white", textDecoration: "none" }}>
//             Purchases
//           </Link>
//           <Link to="/expenditure" style={{ color: "white", textDecoration: "none" }}>
//             Expenditure
//           </Link>
//           <Link to="/assignments" style={{ color: "white", textDecoration: "none" }}>
//             Assignments
//           </Link>
//           <Link to="/transfers" style={{ color: "white", textDecoration: "none" }}>
//             Transfers
//           </Link>
//         </div>

//         {/* Right side - auth */}
//         <div style={{ position: "relative" }}>
//           {user ? (
//             <div>
//               {/* Profile icon */}
//               <span
//                 style={{ cursor: "pointer", fontSize: "20px" }}
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 👤
//               </span>

//               {/* Dropdown */}
//               {showDropdown && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     right: 0,
//                     top: "40px",
//                     background: "white",
//                     color: "black",
//                     padding: "10px",
//                     borderRadius: "5px",
//                     minWidth: "200px",
//                     boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//                     zIndex: 100,
//                   }}
//                 >
//                   <p><strong>Name:</strong> {user.name || "N/A"}</p>
//                   <p><strong>Email:</strong> {user.email}</p>
//                   <p><strong>Role:</strong> {user.role}</p>
//                   <button
//                     onClick={handleLogout}
//                     style={{
//                       marginTop: "10px",
//                       background: "red",
//                       color: "white",
//                       padding: "5px 10px",
//                       border: "none",
//                       borderRadius: "3px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
//               >
//                 Login
//               </Link>
//               <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>

//       {/* Routes */}
//       <Routes>
//         <Route path="/" element={<Navigate to="/dashboard" />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/purchases" element={getPurchasePage()} />
//         <Route path="/expenditure" element={getExpenditurePage()} />
//         <Route path="/assignments" element={getAssignmentPage()} />
//         <Route path="/transfers" element={getTransferPage()} />
//         <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/signup" element={<Signup setUser={setUser} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  DollarSign,
  ClipboardList,
  Shuffle,
  User,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import PurchasesCommander from "./pages/PurchasesCommander";
import PurchasesOfficer from "./pages/PurchasesOfficer";
import Expenditure from "./pages/Expenditure";
import ExpenditureCommander from "./pages/ExpenditureCommander";
import Assignments from "./pages/Assignments";
import AssignmentsCommander from "./pages/AssignmentsCommander";
import Transfers from "./pages/Transfers";
import TransfersCommander from "./pages/TransfersCommander";
import TransfersOfficer from "./pages/TransfersOfficer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExpenditureOfficer from "./pages/ExpenditureOfficer";
import AssignmentsOfficer from "./pages/AssignmentsOfficer";

function Navbar({ user, setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
  };

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/purchases", label: "Purchases", icon: <ShoppingCart size={18} /> },
        { to: "/transfers", label: "Transfers", icon: <Shuffle size={18} /> },
    { to: "/expenditure", label: "Expenditure", icon: <DollarSign size={18} /> },
    { to: "/assignments", label: "Assignments", icon: <ClipboardList size={18} /> },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Left side links */}
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
              location.pathname === link.to
                ? "text-blue-400 font-semibold"
                : "hover:bg-gray-700 hover:text-blue-400"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Right side auth */}
      <div className="relative">
        {user ? (
          <div>
            {/* Profile icon */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-700 transition"
            >
              <User size={20} />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-60 p-4 z-50">
                <p className="font-semibold">👤 Name: {user.name || "N/A"}</p>
                <p className="text-sm text-gray-600">E-mail: {user.email}</p>
                <p className="text-sm text-gray-600">Role: {user.role}</p>
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md hover:bg-gray-700 hover:text-blue-400 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Role-based pages
  const getPurchasePage = () => {
    if (!user) return <Navigate to="/login" />;
    if (user.role === "Admin") return <Purchases />;
    if (user.role === "Base Commander") return <PurchasesCommander />;
    if (user.role === "Logistics Officer") return <PurchasesOfficer />;
    return <Navigate to="/dashboard" />;
  };

  const getTransferPage = () => {
    if (!user) return <Navigate to="/login" />;
    if (user.role === "Admin") return <Transfers />;
    if (user.role === "Base Commander") return <TransfersCommander />;
    if (user.role === "Logistics Officer") return <TransfersOfficer />;
    return <Navigate to="/dashboard" />;
  };

  const getExpenditurePage = () => {
    if (!user) return <Navigate to="/login" />;
    if (user.role === "Admin") return <Expenditure />;
    if (user.role === "Base Commander") return <ExpenditureCommander />;
    if (user.role === "Logistics Officer") return <ExpenditureOfficer />;

    return <Navigate to="/dashboard" />;
  };

  const getAssignmentPage = () => {
    if (!user) return <Navigate to="/login" />;
    if (user.role === "Admin") return <Assignments />;
    if (user.role === "Base Commander") return <AssignmentsCommander />;
        if (user.role === "Logistics Officer") return <AssignmentsOfficer />;

    return <Navigate to="/dashboard" />;
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/purchases" element={getPurchasePage()} />
        <Route path="/expenditure" element={getExpenditurePage()} />
        <Route path="/assignments" element={getAssignmentPage()} />
        <Route path="/transfers" element={getTransferPage()} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;

