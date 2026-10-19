import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Layouts
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Checkout from './layouts/Checkout'
import CookieBanner from './components/CookieBanner'
import WhatsAppButton from './components/WhatsAppButton'
import Cart from './layouts/Cart'

// Screens
import Home from './screens/Home'
import AboutUs from './screens/Aboutus'
import Categories from './screens/Categories'
import Login from './screens/authorization/Login'
import SignUp from './screens/authorization/SignUp'
import SingleProduct from './screens/SingleProduct'
import ForgetPassword from './screens/authorization/ForgetPassword'
import Index from './screens/dashboard/Index'
import Dashboard from './screens/dashboard/dashboard'
import Policy from './components/Policy'
import Sale from './screens/Sales'
import AdminPanel from './pages/AdminPanel'

// Typewriter Component for 403 Page
const AccessDeniedView = ({ darkMode }) => {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const messages = [
    "Access Restricted: This page is confidential and secured.",
    "رسائی محدود ہے: یہ صفحہ خفیہ اور محفوظ ہے۔"
  ];

  useEffect(() => {
    const i = loopNum % messages.length;
    const fullText = messages[i];

    const handleTyping = () => {
      setCurrentText(
        isDeleting 
          ? fullText.substring(0, currentText.length - 1) 
          : fullText.substring(0, currentText.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(100);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed, messages]);

  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "60px 20px" }}>
      <h2 style={{ color: "#dc2626", fontSize: "36px", fontWeight: "bold", letterSpacing: "2px", marginBottom: "15px" }}>
        403 - ACCESS DENIED
      </h2>
      <p style={{ fontSize: "14px", color: darkMode ? "#9ca3af" : "#4b5563", maxWidth: "450px", marginBottom: "25px", lineHeight: "1.6" }}>
        You do not have permission to view this control panel.
      </p>

      {/* Typewriter Effect Line */}
      <div style={{ height: "30px", fontSize: "13px", color: "#dc2626", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "1px", marginBottom: "30px" }}>
        {currentText}
        <span style={{ animation: "blink 1s infinite" }}>|</span>
      </div>

      <button 
        onClick={() => window.location.href = "/"}
        style={{ padding: "12px 30px", background: "#dc2626", color: "#fff", border: "none", fontWeight: "bold", fontSize: "11px", letterSpacing: "2px", cursor: "pointer", borderRadius: "4px" }}
      >
        RETURN TO HOME
      </button>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState('en')
  const [darkMode, setDarkMode] = useState(false)
  
  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // Login State synced instantly with localStorage and custom events
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("zainab_anie_logged_in") === "true" || Boolean(localStorage.getItem("loggedInUserEmail"))
  })

  useEffect(() => {
    const handleAuthSync = () => {
      const status = localStorage.getItem("zainab_anie_logged_in") === "true" || Boolean(localStorage.getItem("loggedInUserEmail"));
      setIsLoggedIn(status);
    };

    window.addEventListener("authChange", handleAuthSync);
    window.addEventListener("storage", handleAuthSync);

    return () => {
      window.removeEventListener("authChange", handleAuthSync);
      window.removeEventListener("storage", handleAuthSync);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("zainab_anie_logged_in", isLoggedIn)
  }, [isLoggedIn])
  
  // Cart State Initialization from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("zainab_anie_cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("zainab_anie_cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Add to Cart Function with Unique ID Check (_id or id)
  const addToCart = (product) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    const productId = product._id || product.id;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => String(item._id || item.id) === String(productId))
      if (existingItem) {
        return prevItems.map(item => 
          String(item._id || item.id) === String(productId) ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, id: productId, quantity: 1 }]
    })
  }

  // Update Cart Item Quantity using Unique ID
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      setCartItems(prev => prev.map(item => String(item._id || item.id) === String(id) ? { ...item, quantity: newQuantity } : item))
    }
  }

  // Remove Item from Cart using Unique ID
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => String(item._id || item.id) !== String(id)))
  }

  const t = {
    en: {
      by: "BY ZAINAB ANIE",
      home: "HOME",
      unstitched: "UNSTITCHED",
      aboutUs: "ABOUT US",
      contact: "CONTACT US",
      sale: "SALE",
      currency: "PKR"
    },
    ur: {
      by: "بائے زینب عنی",
      home: "ہوم",
      unstitched: "ان اسٹچڈ",
      aboutUs: "ہمارے بارے میں",
      contact: "رابطہ کریں",
      sale: "سیل",
      currency: "روپے"
    }
  }

  // Helper check for Admin Authorization
  const loggedInEmail = localStorage.getItem("loggedInUserEmail") || localStorage.getItem("userEmail");
  const isAdminAuthorized = loggedInEmail === "xanebfaisal16@gmail.com" || loggedInEmail === "textilehub040@gmail.com";

  return (
    <Router>
      <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'} ${lang === 'ur' ? 'text-right' : 'text-left'}`}>
        
        {/* Login / Sign Up Confirmation Modal */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
              <div className="mb-4">
                <h3 className="text-base font-semibold tracking-wide">Account Required</h3>
                <p className="text-xs text-neutral-400 mt-1">Please log in or sign up to add items to your cart and proceed with checkout.</p>
              </div>
              <div className="flex items-center justify-between gap-2 mt-6">
                <button 
                  onClick={() => setIsLoginModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setIsLoginModalOpen(false);
                      window.location.href = "/signup";
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 text-white hover:bg-neutral-700 transition-all border border-neutral-700"
                  >
                    Sign Up
                  </button>
                  <button 
                    onClick={() => {
                      setIsLoginModalOpen(false);
                      window.location.href = "/login";
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-neutral-900 hover:bg-neutral-200 transition-all shadow-lg"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Layout */}
        <Header 
          lang={lang} 
          setLang={setLang} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          t={t} 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        {/* Dynamic Routes Setup */}
        <main className="flex-grow max-w-7xl mx-auto w-full font-sans">
          <Routes>
            <Route path="/" element={<Home lang={lang} darkMode={darkMode} t={t} />} />
            <Route path="/about" element={<AboutUs lang={lang} darkMode={darkMode} />} />
            <Route path="/categories" element={<Categories lang={lang} darkMode={darkMode} addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
            <Route path="/sale" element={<Sale lang={lang} darkMode={darkMode} />} />
            <Route path="/product/:id" element={<SingleProduct lang={lang} darkMode={darkMode} addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
            <Route path="/policy/:type" element={<Policy lang={lang} darkMode={darkMode} />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cartItems={cartItems} 
                  updateQuantity={updateQuantity} 
                  removeFromCart={removeFromCart} 
                  darkMode={darkMode} 
                  lang={lang} 
                />
              } 
            />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} darkMode={darkMode} lang={lang} />} />
            <Route path="/login" element={<Login darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignUp darkMode={darkMode} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/forget-password" element={<ForgetPassword darkMode={darkMode} />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/dashboard/index" element={<Index darkMode={darkMode} />} />
            
            {/* Secured Admin Protected Route */}
            <Route 
              path="/admin" 
              element={
                isAdminAuthorized ? (
                  <AdminPanel darkMode={darkMode} />
                ) : (
                  <AccessDeniedView darkMode={darkMode} />
                )
              } 
            />
          </Routes>
        </main>

        <Footer lang={lang} darkMode={darkMode} />
        <WhatsAppButton />
        <CookieBanner darkMode={darkMode} />
        
      </div>
    </Router>
  )
}

export default App