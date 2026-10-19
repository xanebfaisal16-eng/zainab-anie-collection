import React, { useState } from 'react'

const Sale = ({ lang = 'en', darkMode = false }) => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleNotify = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setShowPopup(true);
  };

  return (
    <div className={`min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300 relative overflow-hidden ${
      darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-900'
    } ${lang === 'ur' ? 'font-urdu' : ''}`}>
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Split Luxury Banner Card */}
      <div className={`w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 border transition-all duration-300 shadow-2xl relative z-10 ${
        darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
      } overflow-hidden rounded-2xl`}>
        
        {/* Left Side: Luxury Model Image & Vibe */}
        <div className="relative min-h-[320px] md:min-h-[480px] bg-neutral-950 flex flex-col items-center justify-end p-8 text-center overflow-hidden group">
          {/* Background Fashion Model Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-85"
            style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__UhhgKhJfWA3im2m9SdiQeVEcqfEABhuc5qjC1LVMgtFhcyRPK_13Wo&s=10')` }}
          ></div>

          {/* Dark Overlay Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>

          <div className="relative z-20 space-y-3 mb-2">
            <span className="inline-block px-3 py-1 text-[10px] tracking-[0.3em] uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full font-semibold backdrop-blur-md">
              {lang === 'ur' ? 'ایکسکلوسیو پریویو' : 'PREVIEW VAULT'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-widest uppercase">
              {lang === 'ur' ? 'شاہانہ انداز' : 'Timeless Elegance'}
            </h3>
            <p className="text-neutral-300 text-xs tracking-wider max-w-xs mx-auto font-light">
              {lang === 'ur' 
                ? 'خوبصورت کٹائی اور نفاست سے تیار کردہ ملبوسات۔' 
                : 'Handcrafted formals and unstitched masterpieces designed for the connoisseur of luxury.'}
            </p>
          </div>
        </div>

        {/* Right Side: Clean & Elegant Luxury Content */}
        <div className="p-8 sm:p-12 flex flex-col justify-center text-center md:text-left">
          
          {/* Subtle Category Tag */}
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-600 dark:text-amber-400 font-semibold mb-3">
            {lang === 'ur' ? 'موسمی کلیکشن' : 'EXCLUSIVE EDITORIAL'}
          </span>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl font-light uppercase mb-3 leading-tight tracking-wider">
            {lang === 'ur' ? 'سیزنل سیل' : 'SEASONAL SALE'} <br /> 
            <span className="font-normal italic text-neutral-500 text-2xl sm:text-3xl mt-1 block">
              {lang === 'ur' ? 'بہت جلد آ رہی ہے' : 'Coming Soon'}
            </span>
          </h1>

          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 font-light">
            {lang === 'ur' 
              ? 'ہمارے نئے شاندار کلیکشن تک رسائی حاصل کرنے کے لیے اپنا ای میل درج کریں۔ پبلک لانچ سے پہلے وی آئی پی ممبرز کو خصوصی ڈسکاؤنٹ ملے گا۔'
              : 'Prepare for our exclusive markdown of handcrafted formals. Register your email below for priority early access.'}
          </p>

          {/* Signup Form */}
          <form onSubmit={handleNotify} className="w-full flex flex-col gap-3">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'ur' ? 'اپنی ای میل درج کریں' : 'Enter your email address'} 
              className={`bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 px-4 py-3.5 text-xs w-full focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors rounded-xl ${lang === 'ur' ? 'text-right' : ''}`}
              required
            />
            <button 
              type="submit"
              className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white font-bold px-6 py-3.5 tracking-[0.2em] uppercase text-xs transition-all shadow-md rounded-xl"
            >
              {lang === 'ur' ? 'نوٹیفائی کریں' : 'Notify Me'}
            </button>
          </form>

        </div>

      </div>

      {/* --- SUCCESS POPUP MODAL --- */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className={`border rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 text-lg font-bold">
              ✓
            </div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-2">You're on the VIP List</h3>
            <p className={`text-xs my-3 leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Thank you! We have registered <span className="font-semibold underline">{email}</span>. You will receive priority early access before the vault opens.
            </p>
            <button 
              onClick={() => {
                setShowPopup(false);
                setEmail('');
              }}
              className={`mt-4 px-6 py-2.5 text-xs font-bold rounded-xl w-full tracking-widest uppercase transition-all ${darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:opacity-90'}`}
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Sale