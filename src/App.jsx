import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, 
  PieChart, Pie, Cell 
} from "recharts";

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFD700" }, // Gold
    secondary: { main: "#C0A060" }, // Deeper Gold
    background: { default: "#00FF00", paper: "#000000" },
    text: { primary: "#F0FFFF", secondary: "#F0FFFF" },
    fontFamily: "Arial, sans-serif",
    
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h4: { color: "#E6E6FA" },
    h5: { color: "#E6E6FA" },
    h55: { color: "#FFFFFF" },
  },
});



const initialData = [
  { name: "Jan", value: 400, sales: 2400 },
  { name: "Feb", value: 300, sales: 1398 },
  { name: "Mar", value: 200, sales: 9800 },     
  { name: "Apr", value: 278, sales: 3908 },
  { name: "May", value: 189, sales: 4800 },
  { name: "Jun", value: 239, sales: 3800 },
  { name: "Jul", value: 349, sales: 4300 },
  { name: "Aug", value: 349, sales: 4300 },
  { name: "Sep", value: 349, sales: 4300 },
  { name: "Nov", value: 349, sales: 4300 },
  { name: "Dec", value: 349, sales: 4300 },
];

const initialPieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const getQuarterlyData = (data) => {
  const quarters = {
    "Q1": data.filter(d => ["Jan", "Feb", "Mar"].includes(d.name)).reduce((sum, d) => sum + d.value, 0),
    "Q2": data.filter(d => ["Apr", "May", "Jun"].includes(d.name)).reduce((sum, d) => sum + d.value, 0),
    "Q3": data.filter(d => ["Jul", "Aug", "Sep"].includes(d.name)).reduce((sum, d) => sum + d.value, 0),
    "Q4": data.filter(d => ["Oct", "Nov", "Dec"].includes(d.name)).reduce((sum, d) => sum + d.value, 0),
  };
  
  return Object.keys(quarters).map(q => ({ name: q, value: quarters[q] }));
};

const Charts = () => {
  const [data, setData] = useState(initialData);
  const [pieData, setPieData] = useState(initialPieData);
  const [selectedChart, setSelectedChart] = useState("line");
  const [selectedItem, setSelectedItem] = useState("Jan");
  const [value, setValue] = useState("");
  const [sales, setSales] = useState("");
  const quarterlyData = getQuarterlyData(data);

  const handleUpdate = () => {
    if (!selectedItem || !value || (selectedChart === "line" && !sales)) {
      alert("Please fill in all required fields!");
      return;
    }

    if (selectedChart === "line" || selectedChart === "bar") {
      const updatedData = data.map((item) =>
        item.name === selectedItem ? { ...item, value: parseInt(value), sales: parseInt(sales) } : item
      );
      setData(updatedData);
    } else if (selectedChart === "pie") {
      const updatedPieData = pieData.map((item) =>
        item.name === selectedItem ? { ...item, value: parseInt(value) } : item
      );
      setPieData(updatedPieData);
    }

    setValue("");
    setSales("");
  };

  return (
    <ThemeProvider theme={darkTheme}>
     <CssBaseline /> {/* Ensures background stays dark */}

     <AppBar position="static" sx={{ backgroundColor: "#000080" }}>
        <Toolbar >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Data Dashboard
          </Typography>
        </Toolbar>
      </AppBar>


    <div className="p-6">
      {/* Update Section */}
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <select 
          value={selectedChart} 
          onChange={(e) => setSelectedChart(e.target.value)} 
          className="p-2 border rounded">
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>

        <select 
          value={selectedItem} 
          onChange={(e) => setSelectedItem(e.target.value)} 
          className="p-2 border rounded">
          <option value="">Select Item</option>
          {selectedChart !== "pie"
            ? data.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)
            : pieData.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
        </select>

        <input 
          type="number" 
          placeholder="Value" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="p-2 border rounded"
        />

        {selectedChart === "line" &&   (
          <input 
            type="number" 
            placeholder="Sales" 
            value={sales} 
            onChange={(e) => setSales(e.target.value)} 
            className="p-2 border rounded"
          />
        )}

        {selectedChart === "bar" &&   (
          <input 
            type="number" 
            placeholder="Sales" 
            value={sales} 
            onChange={(e) => setSales(e.target.value)} 
            className="p-2 border rounded"
          />
        )}

        <button 
          onClick={handleUpdate} 
          className="p-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition">
          Update Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82889d" />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quarter Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie data={quarterlyData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {quarterlyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
    </ThemeProvider>
  );
};

export default Charts;
