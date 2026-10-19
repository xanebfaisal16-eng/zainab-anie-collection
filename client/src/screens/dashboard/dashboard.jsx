import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ darkMode }) {
  const [activeModal, setActiveModal] = useState(null);
  
  const getStoredEmail = () => {
    return (
      localStorage.getItem("loggedInUserEmail") || 
      localStorage.getItem("userEmail") || 
      localStorage.getItem("user") || 
      localStorage.getItem("currentUser") || 
      ""
    );
  };

  const [userEmail, setUserEmail] = useState(getStoredEmail);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserEmail(getStoredEmail());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const formatNameFromEmail = (email) => {
    if (!email) return "Guest User";
    const namePart = email.split("@")[0];
    const cleanName = namePart.replace(/[0-9._]/g, " ");
    return cleanName
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Valued Customer";
  };

  const [userInfo, setUserInfo] = useState({
    name: formatNameFromEmail(userEmail),
    email: userEmail || "No Email Found",
    phone: "+92 300 1234567",
    address: "House 123, Street 4, Defense Phase V, Lahore"
  });

  useEffect(() => {
    setUserInfo(prev => ({
      ...prev,
      name: formatNameFromEmail(userEmail),
      email: userEmail || "No Email Found"
    }));
  }, [userEmail]);

  const [newAddress, setNewAddress] = useState(userInfo.address);
  const [successMsg, setSuccessMsg] = useState("");

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setSuccessMsg("Profile updated successfully!");
    setActiveModal(null);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAddressUpdate = (e) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, address: newAddress });
    setSuccessMsg("Shipping address updated successfully!");
    setActiveModal(null);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className={`min-h-[80vh] p-6 md:p-12 font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`}>
      
      {successMsg && (
        <div className="max-w-4xl mx-auto mb-6 bg-emerald-600 text-white p-3 text-xs tracking-widest text-center font-semibold rounded-xl">
          {successMsg}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className={`flex justify-between items-center border-b pb-6 ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase">Customer Dashboard</h1>
            <p className={`text-xs tracking-wider mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              WELCOME BACK, {userInfo.name.toUpperCase()}
            </p>
          </div>
          <Link 
            to="/" 
            onClick={() => {
              localStorage.removeItem("loggedInUserEmail");
              localStorage.removeItem("userEmail");
              localStorage.removeItem("user");
              localStorage.removeItem("currentUser");
              localStorage.removeItem("zainab_anie_logged_in");
              setUserEmail("");
            }}
            className={`px-4 py-2 text-xs font-bold tracking-widest rounded-xl transition-all ${darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:opacity-80'}`}
          >
            LOGOUT
          </Link>
        </div>

        {/* User Card */}
        <div className={`p-6 rounded-2xl border transition-colors ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'}`}>
          <h2 className="text-base font-bold tracking-wide">{userInfo.name}</h2>
          <p className={`text-xs mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{userInfo.email}</p>
        </div>

        {/* Interactive Grid (Saved Addresses, Account Settings & Explore Collections) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* SAVED ADDRESSES */}
          <div className={`p-6 rounded-2xl border transition-colors flex flex-col justify-between ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'}`}>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-1">Saved Addresses</h3>
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Manage your delivery addresses for express shipping.</p>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setActiveModal("addresses")}
                className={`text-xs font-bold tracking-widest underline underline-offset-4 hover:opacity-70 transition-all ${darkMode ? 'text-white' : 'text-neutral-900'}`}
              >
                Manage Addresses
              </button>
            </div>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className={`p-6 rounded-2xl border transition-colors flex flex-col justify-between ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'}`}>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-1">Account Settings</h3>
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Update your personal credentials and preferences.</p>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => setActiveModal("profile")}
                className={`text-xs font-bold tracking-widest underline underline-offset-4 hover:opacity-70 transition-all ${darkMode ? 'text-white' : 'text-neutral-900'}`}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* EXPLORE COLLECTIONS / SHOP NOW */}
          <div className={`p-6 rounded-2xl border transition-colors flex flex-col justify-between ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'}`}>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-1">Explore Collections</h3>
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Discover our latest handcrafted formals and unstitched suits.</p>
            </div>
            <div className="mt-6">
              <Link 
                to="/categories" 
                className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-colors text-center"
              >
                Shop Now
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* --- MODALS (Only Addresses and Profile) --- */}
      {activeModal === "addresses" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl p-6 max-w-md w-full shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Manage Delivery Address</h3>
            <form onSubmit={handleAddressUpdate} className="space-y-4">
              <div>
                <label className={`block text-[10px] tracking-widest uppercase mb-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Current Shipping Address</label>
                <textarea 
                  value={newAddress} 
                  onChange={(e) => setNewAddress(e.target.value)}
                  className={`w-full p-3 border rounded-xl text-xs outline-none ${darkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'}`}
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className={`px-4 py-2 text-xs font-bold ${darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={`px-4 py-2 text-xs font-bold rounded-xl ${darkMode ? 'bg-white text-neutral-900' : 'bg-neutral-900 text-white'}`}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === "profile" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl p-6 max-w-md w-full shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4">Edit Profile Credentials</h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className={`block text-[10px] tracking-widest uppercase mb-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Full Name</label>
                <input 
                  type="text" 
                  value={userInfo.name} 
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className={`w-full p-3 border rounded-xl text-xs outline-none ${darkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-[10px] tracking-widest uppercase mb-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Phone Number</label>
                <input 
                  type="text" 
                  value={userInfo.phone} 
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  className={`w-full p-3 border rounded-xl text-xs outline-none ${darkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'}`}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className={`px-4 py-2 text-xs font-bold ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}
                >
                  Cancel/Close
                </button>
                <button 
                  type="submit"
                  className={`px-4 py-2 text-xs font-bold rounded-xl ${darkMode ? 'bg-white text-neutral-950' : 'bg-neutral-900 text-white'}`}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}