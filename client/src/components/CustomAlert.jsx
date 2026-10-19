import React, { useEffect } from 'react'

const CustomAlert = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    // Yahan timer 1.5 seconds (1500ms) kar diya hai taake yeh foran gayab ho jaye
    const timer = setTimeout(() => {
      onClose();
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === 'error';

  return (
    <div className="fixed top-6 right-6 z-50 animate-bounce transition-all duration-300">
      <div className={`flex items-center gap-3.5 px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 transform hover:scale-105 ${
        isError 
          ? 'bg-neutral-900/90 text-white border-rose-500/40 shadow-[0_20px_50px_rgba(225,29,72,0.25)] ring-1 ring-rose-500/20' 
          : 'bg-neutral-900/90 text-white border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/20'
      }`}>
        {/* Glowing Icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shadow-inner ${
          isError ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
        }`}>
          {isError ? '🔒' : '✓'}
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            {isError ? 'Authentication Required' : 'Success'}
          </span>
          <span className="text-xs font-semibold tracking-wide text-neutral-100">{message}</span>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="ml-5 text-neutral-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default CustomAlert