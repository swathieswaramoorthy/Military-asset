
// import React, { useState } from "react";
// import { DatePicker, Select, Button, Modal } from "antd";
// const { RangePicker } = DatePicker;
// const { Option } = Select;

// export default function Dashboard() {
//   const [filters, setFilters] = useState({
//     startDate: null,
//     endDate: null,
//     base: "All",
//     equipmentType: "All",
//   });

//   const [appliedFilters, setAppliedFilters] = useState(filters);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Sample dataset
//   const data = [
//     {
//       date: "2025-08-01",
//       base: "Base A",
//       equipmentType: "Tank",
//       openingBalance: 100,
//       purchases: 20,
//       transferIn: 10,
//       transferOut: 5,
//       assigned: 8,
//       expended: 2,
//     },
//     {
//       date: "2025-08-10",
//       base: "Base B",
//       equipmentType: "Jeep",
//       openingBalance: 50,
//       purchases: 15,
//       transferIn: 5,
//       transferOut: 10,
//       assigned: 7,
//       expended: 3,
//     },
//     {
//       date: "2025-08-15",
//       base: "Base A",
//       equipmentType: "Tank",
//       openingBalance: 80,
//       purchases: 10,
//       transferIn: 20,
//       transferOut: 5,
//       assigned: 6,
//       expended: 4,
//     },
//   ];

//   // Apply filters
//   const filteredData = data.filter((item) => {
//     const itemDate = new Date(item.date);
//     const start = appliedFilters.startDate ? new Date(appliedFilters.startDate) : null;
//     const end = appliedFilters.endDate ? new Date(appliedFilters.endDate) : null;

//     const dateMatch =
//       (!start || itemDate >= start) && (!end || itemDate <= end);
//     const baseMatch =
//       appliedFilters.base === "All" || item.base === appliedFilters.base;
//     const typeMatch =
//       appliedFilters.equipmentType === "All" ||
//       item.equipmentType === appliedFilters.equipmentType;

//     return dateMatch && baseMatch && typeMatch;
//   });

//   // Aggregations
//   const totals = filteredData.reduce(
//     (acc, curr) => {
//       acc.openingBalance += curr.openingBalance;
//       acc.purchases += curr.purchases;
//       acc.transferIn += curr.transferIn;
//       acc.transferOut += curr.transferOut;
//       acc.assigned += curr.assigned;
//       acc.expended += curr.expended;
//       return acc;
//     },
//     {
//       openingBalance: 0,
//       purchases: 0,
//       transferIn: 0,
//       transferOut: 0,
//       assigned: 0,
//       expended: 0,
//     }
//   );

//   const netMovement = totals.purchases + totals.transferIn - totals.transferOut;
//   const closingBalance =
//     totals.openingBalance + netMovement - (totals.assigned + totals.expended);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       {/* Filters */}
//       <div className="flex gap-4 mb-4">
//         <RangePicker
//           onChange={(dates) =>
//             setFilters({
//               ...filters,
//               startDate: dates ? dates[0].toDate() : null,
//               endDate: dates ? dates[1].toDate() : null,
//             })
//           }
//         />
//         <Select
//           defaultValue="All"
//           style={{ width: 150 }}
//           onChange={(value) => setFilters({ ...filters, base: value })}
//         >
//           <Option value="All">All Bases</Option>
//           <Option value="Base A">Base A</Option>
//           <Option value="Base B">Base B</Option>
//         </Select>
//         <Select
//           defaultValue="All"
//           style={{ width: 150 }}
//           onChange={(value) => setFilters({ ...filters, equipmentType: value })}
//         >
//           <Option value="All">All Equipment</Option>
//           <Option value="Tank">Tank</Option>
//           <Option value="Jeep">Jeep</Option>
//         </Select>
//         <Button type="primary" onClick={() => setAppliedFilters(filters)}>
//           Apply
//         </Button>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-3 gap-6">
//         <div className="p-4 bg-blue-100 rounded-xl shadow">
//           <h2 className="text-lg font-semibold">Opening Balance</h2>
//           <p className="text-2xl">{totals.openingBalance}</p>
//         </div>

//         <div
//           className="p-4 bg-green-100 rounded-xl shadow cursor-pointer"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <h2 className="text-lg font-semibold">Net Movement</h2>
//           <p className="text-2xl">{netMovement}</p>
//         </div>

//         <div className="p-4 bg-purple-100 rounded-xl shadow">
//           <h2 className="text-lg font-semibold">Closing Balance</h2>
//           <p className="text-2xl">{closingBalance}</p>
//         </div>

//         <div className="p-4 bg-yellow-100 rounded-xl shadow">
//           <h2 className="text-lg font-semibold">Assigned</h2>
//           <p className="text-2xl">{totals.assigned}</p>
//         </div>

//         <div className="p-4 bg-red-100 rounded-xl shadow">
//           <h2 className="text-lg font-semibold">Expended</h2>
//           <p className="text-2xl">{totals.expended}</p>
//         </div>
//       </div>

//       {/* Popup Modal for Net Movement */}
//       <Modal
//         title="Net Movement Details"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <p><strong>Purchases:</strong> {totals.purchases}</p>
//         <p><strong>Transfer In:</strong> {totals.transferIn}</p>
//         <p><strong>Transfer Out:</strong> {totals.transferOut}</p>
//       </Modal>
//     </div>
//   );
// }
import React, { useState } from "react";
import { DatePicker, Select, Button, Modal } from "antd";
import {
  DatabaseOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
  CheckCircleOutlined,
  FireOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Dashboard() {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    base: "All",
    equipmentType: "All",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample dataset
  const data = [
    {
      date: "2025-08-01",
      base: "Base A",
      equipmentType: "Tank",
      openingBalance: 100,
      purchases: 20,
      transferIn: 10,
      transferOut: 5,
      assigned: 8,
      expended: 2,
    },
    {
      date: "2025-08-10",
      base: "Base B",
      equipmentType: "Jeep",
      openingBalance: 50,
      purchases: 15,
      transferIn: 5,
      transferOut: 10,
      assigned: 7,
      expended: 3,
    },
    {
      date: "2025-08-15",
      base: "Base A",
      equipmentType: "Tank",
      openingBalance: 80,
      purchases: 10,
      transferIn: 20,
      transferOut: 5,
      assigned: 6,
      expended: 4,
    },
  ];

  // Apply filters
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const start = appliedFilters.startDate ? new Date(appliedFilters.startDate) : null;
    const end = appliedFilters.endDate ? new Date(appliedFilters.endDate) : null;

    const dateMatch = (!start || itemDate >= start) && (!end || itemDate <= end);
    const baseMatch = appliedFilters.base === "All" || item.base === appliedFilters.base;
    const typeMatch =
      appliedFilters.equipmentType === "All" ||
      item.equipmentType === appliedFilters.equipmentType;

    return dateMatch && baseMatch && typeMatch;
  });

  // Aggregations
  const totals = filteredData.reduce(
    (acc, curr) => {
      acc.openingBalance += curr.openingBalance;
      acc.purchases += curr.purchases;
      acc.transferIn += curr.transferIn;
      acc.transferOut += curr.transferOut;
      acc.assigned += curr.assigned;
      acc.expended += curr.expended;
      return acc;
    },
    {
      openingBalance: 0,
      purchases: 0,
      transferIn: 0,
      transferOut: 0,
      assigned: 0,
      expended: 0,
    }
  );

  const netMovement = totals.purchases + totals.transferIn - totals.transferOut;
  const closingBalance =
    totals.openingBalance + netMovement - (totals.assigned + totals.expended);

  const metrics = [
    {
      title: "Opening Balance",
      value: totals.openingBalance,
      color: "bg-blue-100",
      icon: <DatabaseOutlined className="text-blue-600 text-3xl" />,
    },
    {
      title: "Net Movement",
      value: netMovement,
      color: "bg-green-100",
      icon: <SwapOutlined className="text-green-600 text-3xl" />,
      onClick: () => setIsModalOpen(true),
    },
    {
      title: "Closing Balance",
      value: closingBalance,
      color: "bg-purple-100",
      icon: <PieChartOutlined className="text-purple-600 text-3xl" />,
    },
    {
      title: "Assigned",
      value: totals.assigned,
      color: "bg-yellow-100",
      icon: <CheckCircleOutlined className="text-yellow-600 text-3xl" />,
    },
    {
      title: "Expended",
      value: totals.expended,
      color: "bg-red-100",
      icon: <FireOutlined className="text-red-600 text-3xl" />,
    },
    {
      title: "Purchases",
      value: totals.purchases,
      color: "bg-indigo-100",
      icon: <ShoppingCartOutlined className="text-indigo-600 text-3xl" />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Military Assest Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <RangePicker
          onChange={(dates) =>
            setFilters({
              ...filters,
              startDate: dates ? dates[0].toDate() : null,
              endDate: dates ? dates[1].toDate() : null,
            })
          }
        />
        <Select
          defaultValue="All"
          style={{ width: 160 }}
          onChange={(value) => setFilters({ ...filters, base: value })}
        >
          <Option value="All">All Bases</Option>
          <Option value="Base A">Base A</Option>
          <Option value="Base B">Base B</Option>
        </Select>
        <Select
          defaultValue="All"
          style={{ width: 160 }}
          onChange={(value) => setFilters({ ...filters, equipmentType: value })}
        >
          <Option value="All">All Equipment</Option>
          <Option value="Tank">Tank</Option>
          <Option value="Jeep">Jeep</Option>
        </Select>
        <Button type="primary" onClick={() => setAppliedFilters(filters)}>
          Apply Filters
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            onClick={metric.onClick}
            className={`${metric.color} p-6 rounded-xl shadow-md flex items-center justify-between cursor-pointer transform transition hover:scale-105`}
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{metric.title}</h2>
              <p className="text-2xl font-bold mt-1 text-gray-800">{metric.value}</p>
            </div>
            {metric.icon}
          </div>
        ))}
      </div>

      {/* Popup Modal for Net Movement */}
      <Modal
        title="Net Movement Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p><strong>Purchases:</strong> {totals.purchases}</p>
        <p><strong>Transfer In:</strong> {totals.transferIn}</p>
        <p><strong>Transfer Out:</strong> {totals.transferOut}</p>
      </Modal>
    </div>
  );
}
