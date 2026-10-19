import React, { useState, useEffect } from 'react'

const CookieBanner = ({ darkMode = false }) => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user already accepted or declined cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 border-t shadow-2xl transition-colors duration-300 ${
      darkMode 
        ? 'bg-neutral-950/95 border-neutral-800 text-neutral-200 backdrop-blur-md' 
        : 'bg-white/95 border-neutral-200 text-neutral-800 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Text Details */}
        <div className="text-xs leading-relaxed max-w-3xl">
          <p className="font-semibold uppercase tracking-wider mb-1 text-amber-600">
            We Value Your Privacy
          </p>
          <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            We use cookies to enhance your browsing experience, serve personalized shopping content, and analyze our website traffic. By clicking <span className="font-semibold text-neutral-900 dark:text-white">"Accept All"</span>, you consent to our use of cookies.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleDecline}
            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors border ${
              darkMode 
                ? 'border-neutral-700 hover:border-neutral-500 text-neutral-300' 
                : 'border-neutral-300 hover:border-neutral-500 text-neutral-700'
            }`}
          >
            Decline
          </button>

          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-initial px-6 py-2 text-xs font-semibold tracking-widest uppercase bg-amber-600 text-black hover:bg-amber-500 transition-colors shadow-md"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  )
}

export default CookieBanner