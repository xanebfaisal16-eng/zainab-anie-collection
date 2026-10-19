import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel({ darkMode }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  
  // Active Tab for Order Filtering ("all", "Pending", "Dispatched", "Completed", "Cancelled")
  const [activeTab, setActiveTab] = useState("all");
  
  // Add Product Form State
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("UNSTITCHED");
  
  // Image Mode State ("url" or "file")
  const [imageMode, setImageMode] = useState("url");
  const [imageInput, setImageInput] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Bank Details Form State
  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountTitle: "",
    accountNumber: "",
    iban: ""
  });

  // Fetch Orders, Products, and Bank Details from Backend Database
  const fetchData = async () => {
    try {
      const ordersRes = await fetch("http://localhost:8080/api/v1/orders", {
        headers: {
          "email": "xanebfaisal16@gmail.com"
        }
      });
      const ordersData = await ordersRes.json();
      if (ordersData.ok || Array.isArray(ordersData)) {
        setOrders(ordersData.orders || ordersData || []);
      }

      const productsRes = await fetch("http://localhost:8080/api/v1/products");
      const productsData = await productsRes.json();
      if (productsData.ok || Array.isArray(productsData)) {
        setProducts(productsData.products || productsData || []);
      }

      const bankRes = await fetch("http://localhost:8080/api/v1/bank-details");
      const bankData = await bankRes.json();
      if (bankData.ok && bankData.details) {
        setBankForm(bankData.details);
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Order Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/orders/${orderId}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "email": "xanebfaisal16@gmail.com"
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.ok) {
        setOrders(orders.map(order => (order.id === orderId || order._id === orderId) ? { ...order, status: newStatus } : order));
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Server error while updating status.");
    }
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/v1/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "email": "xanebfaisal16@gmail.com"
        }
      });
      const data = await response.json();
      if (data.ok || response.ok) {
        setOrders(orders.filter(order => order.id !== orderId && order._id !== orderId));
      } else {
        setOrders(orders.filter(order => order.id !== orderId && order._id !== orderId));
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      setOrders(orders.filter(order => order.id !== orderId && order._id !== orderId));
    }
  };

  // Handle Bank Details Update
  const handleUpdateBankDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/bank-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankForm)
      });
      const data = await response.json();
      if (data.ok) {
        alert("Bank details updated successfully!");
      } else {
        alert("Failed to update bank details.");
      }
    } catch (err) {
      console.error("Error updating bank details:", err);
      alert("Server error while updating bank details.");
    }
  };

  // Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!brand || !name || !price) {
      alert("Please fill in all required product fields.");
      return;
    }

    let finalImageUrl = imageInput || "https://via.placeholder.com/300x400";

    if (imageMode === "file" && imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        finalImageUrl = reader.result;
        await sendProductToBackend(finalImageUrl);
      };
      return;
    }

    await sendProductToBackend(finalImageUrl);
  };

  const sendProductToBackend = async (imageUrl) => {
    const newProduct = {
      id: Date.now().toString(),
      brand: brand.toUpperCase(),
      title: name.toUpperCase(),
      category: category,
      price: Number(price),
      image: imageUrl
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });
      const data = await response.json();
      if (data.ok) {
        setBrand("");
        setName("");
        setPrice("");
        setImageInput("");
        setImageFile(null);
        fetchData();
      } else {
        alert("Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Server error while adding product.");
    }
  };

  const goldPrimary = "#d4af37";

  const getStatusBgColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "cancelled": return "#dc2626";
      case "completed": return "#16a34a";
      case "dispatched": return "#2563eb";
      case "pending":
      default: return "#d97706";
    }
  };

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(o => (o.status || "Pending").toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 font-sans" style={{ background: darkMode ? "#121212" : "#fff", color: darkMode ? "#fff" : "#000" }}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-8 gap-4" style={{ borderColor: darkMode ? "#333" : "#eaeaea" }}>
        <div>
          <h2 className="text-xl md:text-2xl tracking-widest font-bold uppercase m-0" style={{ color: goldPrimary }}>
            Admin Control Panel
          </h2>
          <p className="text-xs mt-1" style={{ color: darkMode ? "#aaa" : "#666" }}>
            Logged in as: admin@zainabanie.com
          </p>
        </div>
        <button 
          onClick={() => navigate("/")}
          className="px-5 py-2.5 text-xs font-bold rounded cursor-pointer shadow"
          style={{ background: goldPrimary, color: "#000", border: "none" }}
        >
          Back to Website
        </button>
      </div>

      {/* Customer Orders Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-sm md:text-base tracking-widest uppercase font-semibold" style={{ color: goldPrimary }}>
            Customer Orders ({filteredOrders.length})
          </h3>

          <div className="flex flex-wrap gap-2 text-xs">
            {["all", "Pending", "Dispatched", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded uppercase font-bold tracking-wider transition-all ${
                  activeTab === tab 
                    ? 'bg-amber-500 text-black shadow' 
                    : darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
                style={activeTab === tab ? { background: goldPrimary, color: "#000" } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-xs italic" style={{ color: darkMode ? "#888" : "#666" }}>No orders found in this section.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredOrders.map((order, idx) => (
              <div key={order.id || order._id || idx} className="p-5 rounded-lg shadow-sm border" style={{ background: darkMode ? "#181818" : "#fbfbfa", borderColor: darkMode ? "#2a2a2a" : "#eaeaea" }}>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 mb-4 gap-3" style={{ borderColor: darkMode ? "#2a2a2a" : "#eee" }}>
                  <span className="text-xs font-bold">
                    Order ID: <span style={{ color: goldPrimary }}>#{order.orderId || order.id}</span>
                  </span>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <select 
                      value={order.status || "Pending"} 
                      onChange={(e) => handleStatusChange(order.id || order._id, e.target.value)}
                      className="px-3 py-1.5 rounded text-xs font-bold cursor-pointer text-white border-none outline-none"
                      style={{ background: getStatusBgColor(order.status) }}
                    >
                      <option value="Pending">PENDING</option>
                      <option value="Dispatched">DISPATCHED</option>
                      <option value="Completed">COMPLETED</option>
                      <option value="Cancelled">CANCELLED</option>
                    </select>

                    <button
                      onClick={() => handleDeleteOrder(order.id || order._id)}
                      className="px-3 py-1.5 rounded text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
                  <div className="space-y-1.5">
                    <p><strong>Customer Name:</strong> {order.fullName}</p>
                    <p className="truncate"><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    {order.paymentMethod === "bank" && (
                      <p><strong>Bank Ref / TRX ID:</strong> <span style={{ color: goldPrimary, fontWeight: "bold" }}>{order.bankReceiptRef || "N/A"}</span></p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <p><strong>Payment Method:</strong> {order.paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}</p>
                    <p><strong>Total Price:</strong> <span style={{ color: goldPrimary, fontWeight: "bold" }}>PKR {order.grandTotal}</span></p>
                    <p><strong>Delivery Address:</strong> {order.address}, {order.city}, {order.country}</p>
                    <p><strong>Date:</strong> {order.date || "N/A"}</p>
                  </div>
                </div>

                {/* Ordered Items List with Images, Titles & Quantities */}
                <div className="p-3 rounded" style={{ background: darkMode ? "#101010" : "#f4f1ea" }}>
                  <p className="text-xs font-bold mb-2.5" style={{ color: goldPrimary }}>Ordered Items:</p>
                  {order.items && order.items.map((item, i) => {
                    const itemImg = Array.isArray(item.image) ? item.image[0] : (item.image || "https://via.placeholder.com/60");
                    const itemQty = item.quantity || item.qty || 1;
                    const itemPrice = Number(item.price || 0);
                    return (
                      <div key={i} className="text-xs flex items-center justify-between pb-2.5 mb-2.5 border-b last:border-b-0 last:mb-0 last:pb-0" style={{ borderColor: darkMode ? "#222" : "#e5e0d5" }}>
                        <div className="flex items-center gap-3">
                          <img 
                            src={itemImg} 
                            alt={item.title || item.name} 
                            style={{ width: "45px", height: "55px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ddd" }} 
                          />
                          <div>
                            <p className="font-bold uppercase tracking-wide">{item.title || item.name}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: darkMode ? "#aaa" : "#555" }}>
                              Quantity: <span style={{ color: goldPrimary, fontWeight: "bold" }}>{itemQty}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold" style={{ color: goldPrimary }}>PKR {itemPrice * itemQty}</p>
                          <p className="text-[10px]" style={{ color: darkMode ? "#888" : "#777" }}>(PKR {itemPrice} each)</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manage Bank Account Details Section */}
      <div className="p-6 md:p-8 rounded-lg border mb-12 shadow-sm" style={{ background: darkMode ? "#181818" : "#fbfbfa", borderColor: darkMode ? "#2a2a2a" : "#eaeaea" }}>
        <h3 className="text-sm md:text-base tracking-widest uppercase font-semibold mb-6" style={{ color: goldPrimary }}>
          Manage Bank Account Details (for Bank Transfer Checkout)
        </h3>

        <form onSubmit={handleUpdateBankDetails} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Bank Name (e.g. Meezan Bank) *" 
            value={bankForm.bankName}
            onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            required
          />
          <input 
            type="text" 
            placeholder="Account Title *" 
            value={bankForm.accountTitle}
            onChange={(e) => setBankForm({ ...bankForm, accountTitle: e.target.value })}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            required
          />
          <input 
            type="text" 
            placeholder="Account Number *" 
            value={bankForm.accountNumber}
            onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            required
          />
          <input 
            type="text" 
            placeholder="IBAN *" 
            value={bankForm.iban}
            onChange={(e) => setBankForm({ ...bankForm, iban: e.target.value })}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            required
          />

          <button 
            type="submit"
            className="sm:col-span-2 py-3.5 text-xs font-bold tracking-widest uppercase rounded shadow cursor-pointer"
            style={{ background: `linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)`, color: "#000", border: "none" }}
          >
            UPDATE BANK DETAILS
          </button>
        </form>
      </div>

      {/* Add New Product Section */}
      <div className="p-6 md:p-8 rounded-lg border mb-12 shadow-sm" style={{ background: darkMode ? "#181818" : "#fbfbfa", borderColor: darkMode ? "#2a2a2a" : "#eaeaea" }}>
        <h3 className="text-sm md:text-base tracking-widest uppercase font-semibold mb-6" style={{ color: goldPrimary }}>
          Add New Product
        </h3>

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Brand Name (e.g. MARIA.B) *" 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            required
          />
          <input 
            type="text" 
            placeholder="Product Name *" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            required
          />
          <input 
            type="number" 
            placeholder="Price (PKR) *" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            required
          />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 text-xs rounded border outline-none"
            style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
          >
            <option value="UNSTITCHED">UNSTITCHED</option>
            <option value="FORMAL">FORMAL</option>
            <option value="SALE">SALE</option>
          </select>

          <div className="sm:col-span-2 flex flex-wrap gap-4 items-center text-xs">
            <span className="font-bold" style={{ color: goldPrimary }}>Image Source:</span>
            <label className="cursor-pointer flex items-center gap-1">
              <input type="radio" name="imageMode" checked={imageMode === "url"} onChange={() => setImageMode("url")} /> Paste Image URL
            </label>
            <label className="cursor-pointer flex items-center gap-1">
              <input type="radio" name="imageMode" checked={imageMode === "file"} onChange={() => setImageMode("file")} /> Browse from Computer
            </label>
          </div>

          {imageMode === "url" ? (
            <input 
              type="text" 
              placeholder="Paste Image URL here (https://...)" 
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="sm:col-span-2 p-3 text-xs rounded border outline-none"
              style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
            />
          ) : (
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="sm:col-span-2 p-2.5 text-xs rounded border outline-none"
              style={{ background: darkMode ? "#1a1a1a" : "#fff", borderColor: darkMode ? "#333" : "#ccc", color: darkMode ? "#fff" : "#000" }}
              required
            />
          )}

          <button 
            type="submit"
            className="sm:col-span-2 py-3.5 text-xs font-bold tracking-widest uppercase rounded shadow cursor-pointer"
            style={{ background: `linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%)`, color: "#000", border: "none" }}
          >
            + ADD PRODUCT TO WEBSITE
          </button>
        </form>
      </div>

      {/* Manage Products Section */}
      <div>
        <h3 className="text-sm md:text-base tracking-widest uppercase font-semibold mb-6" style={{ color: goldPrimary }}>
          Manage Products ({products.length})
        </h3>
        {products.length === 0 ? (
          <p className="text-xs italic" style={{ color: darkMode ? "#888" : "#666" }}>No products found in the database.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((prod) => (
              <div key={prod.id || prod._id} className="p-4 rounded-lg border shadow-sm" style={{ background: darkMode ? "#181818" : "#fbfbfa", borderColor: darkMode ? "#2a2a2a" : "#eaeaea" }}>
                <img src={prod.image} alt={prod.title} className="w-full h-44 object-cover mb-3 rounded" />
                <h4 className="text-xs font-bold mb-1 truncate">{prod.brand} - {prod.title}</h4>
                <p className="text-xs font-bold" style={{ color: goldPrimary }}>PKR {prod.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}