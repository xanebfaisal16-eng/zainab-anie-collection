import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = ({ lang = 'en', darkMode = false, t, isLoggedIn, userInfo }) => {
  const location = useLocation()

  const navLinks = [
    { name: t?.[lang]?.home || "HOME", path: "/" },
    { name: t?.[lang]?.unstitched || "UNSTITCHED", path: "/categories" },
    { name: t?.[lang]?.aboutUs || "ABOUT US", path: "/about" }
  ]

  // User details check karne ke liye (LocalStorage ya props se)
  const userEmail = userInfo?.email || localStorage.getItem("loggedInUserEmail") || localStorage.getItem("userEmail") || "";
  const userName = userInfo?.name || localStorage.getItem("userName") || userEmail.split('@')[0] || "User";

  return (
    <div className={`border-b px-4 transition-colors ${darkMode ? 'border-neutral-800 bg-neutral-950 text-neutral-300' : 'border-neutral-100 bg-white text-neutral-700'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-3 gap-3">
        
        {/* Navigation Links */}
        <nav className="flex justify-start md:justify-center gap-6 md:gap-8 text-xs font-semibold tracking-[0.2em] uppercase overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path
            return (
              <Link 
                key={index} 
                to={link.path} 
                className={`transition-colors duration-200 ${
                  isActive 
                    ? 'border-b-2 border-black dark:border-white pb-1 font-bold' 
                    : darkMode ? 'hover:text-white' : 'hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            )
          })}

          {/* Sale Link */}
          <Link 
            to="/categories" 
            className="text-red-500 font-bold hover:text-red-600 transition-colors"
          >
            {t?.[lang]?.sale || "SALE"}
          </Link>
        </nav>

        {/* Login / Logout Live Status Bar */}
        <div className="text-[11px] font-medium tracking-wider">
          {isLoggedIn || userEmail ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>You are logged in as <strong>{userName}</strong></span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full border border-rose-500/20">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>You are logged out</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navigation