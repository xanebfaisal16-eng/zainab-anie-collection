import React from 'react'

const LoginModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl transform transition-all">
        
        {/* Icon / Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
            🔒
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-wide">Login Required</h3>
            <p className="text-xs text-neutral-400">Authentication needed to proceed</p>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
          Please log in first to use the cart and place orders. Would you like to proceed to the login page now?
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-white text-neutral-900 hover:bg-neutral-200 transition-all shadow-lg"
          >
            Yes, Log In
          </button>
        </div>

      </div>
    </div>
  )
}

export default LoginModal