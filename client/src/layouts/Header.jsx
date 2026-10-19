import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../asset/logo.design.png'

const Header = ({ lang, setLang, darkMode, setDarkMode, t, cartCount = 0, setIsLoggedIn }) => {
  const currentT = t[lang] || t.en
  const navigate = useNavigate()

  const [userEmail, setUserEmail] = useState("")
  const [loggedStatus, setLoggedStatus] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const checkUserStatus = () => {
    const email = localStorage.getItem("loggedInUserEmail") || localStorage.getItem("userEmail") || "";
    const isLogin = localStorage.getItem("zainab_anie_logged_in") === "true";
    setUserEmail(email);
    setLoggedStatus(isLogin || Boolean(email));
  }

  useEffect(() => {
    checkUserStatus();

    window.addEventListener("authChange", checkUserStatus);
    window.addEventListener("storage", checkUserStatus);
    
    return () => {
      window.removeEventListener("authChange", checkUserStatus);
      window.removeEventListener("storage", checkUserStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("zainab_anie_logged_in")
    localStorage.removeItem("loggedInUserEmail")
    localStorage.removeItem("userEmail")
    if (setIsLoggedIn) setIsLoggedIn(false)
    setLoggedStatus(false)
    setUserEmail("")
    
    window.dispatchEvent(new Event("authChange"));
    setMobileMenuOpen(false);
    navigate("/")
  }

  return (
    <header className={`border-b sticky top-0 z-40 backdrop-blur-md transition-colors ${
      darkMode ? 'bg-neutral-950/90 border-neutral-800 text-white' : 'bg-white/90 border-neutral-200 text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo Image + Brand Title */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logoImg} 
            alt="Zainab Anie Logo" 
            className="h-9 md:h-10 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif italic text-base md:text-lg font-bold tracking-[0.2em] leading-none uppercase">
              ZA
            </span>
            <span className="text-[7px] md:text-[8px] italic tracking-[0.25em] text-neutral-400 font-light mt-1 uppercase">
              By Zainab & Ani
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.2em] uppercase">
          <Link to="/" className="hover:text-amber-600 transition-colors">{currentT.home}</Link>
          <Link to="/categories" className="hover:text-amber-600 transition-colors">{currentT.unstitched}</Link>
          <Link to="/about" className="hover:text-amber-600 transition-colors">{currentT.aboutUs}</Link>
          <Link to="/sale" className="text-rose-600 hover:text-rose-700 transition-colors">{currentT.sale}</Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 md:gap-4 text-xs">
          
          {/* Cart Icon with Count Badge */}
          <Link to="/cart" className="relative p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors flex items-center" aria-label="Cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="px-2.5 py-1 border border-neutral-300 dark:border-neutral-700 rounded text-[10px] font-bold tracking-wider hover:border-amber-600 transition-colors"
          >
            {lang === 'en' ? 'اردو' : 'EN'}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors"
          >
            {darkMode ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {/* Desktop User Authentication Status */}
          <div className="hidden md:flex items-center gap-3">
            {loggedStatus ? (
              <div className="flex items-center gap-3">
                {userEmail && (
                  <span className="text-[10px] font-bold text-amber-600 tracking-wider">
                    {userEmail}
                  </span>
                )}
                <button 
                  onClick={handleLogout}
                  className="hover:text-amber-600 tracking-wider text-[11px] font-semibold bg-transparent border-none cursor-pointer uppercase"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-neutral-400 italic tracking-wider">
                  GUEST
                </span>
                <Link to="/login" className="hover:text-amber-600 tracking-wider text-[11px] font-semibold uppercase">
                  LOGIN
                </Link>
              </div>
            )}
          </div>

          {/* Clean, Minimalist Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-1.5 px-2.5 py-1 border border-amber-600/60 rounded bg-transparent text-amber-600 font-bold text-[10px] tracking-widest focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span>MENU</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-6 py-5 flex flex-col gap-4 text-xs font-semibold tracking-[0.15s] uppercase transition-all ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
        }`}>
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-neutral-200 dark:border-neutral-800 hover:text-amber-600 transition-colors"
          >
            {currentT.home}
          </Link>
          <Link 
            to="/categories" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-neutral-200 dark:border-neutral-800 hover:text-amber-600 transition-colors"
          >
            {currentT.unstitched}
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-neutral-200 dark:border-neutral-800 hover:text-amber-600 transition-colors"
          >
            {currentT.aboutUs}
          </Link>
          <Link 
            to="/sale" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-neutral-200 dark:border-neutral-800 text-rose-600 transition-colors"
          >
            {currentT.sale}
          </Link>

          {/* Mobile User Authentication Section */}
          <div className="pt-2 flex flex-col gap-2">
            {loggedStatus ? (
              <>
                {userEmail && (
                  <span className="text-[10px] font-bold text-amber-600 truncate">
                    {userEmail}
                  </span>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-left py-2 text-rose-500 font-bold bg-transparent border-none cursor-pointer uppercase"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-amber-600 font-bold"
              >
                LOGIN / SIGNUP
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header