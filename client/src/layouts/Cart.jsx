import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, updateQuantity, removeFromCart, darkMode, lang }) {
  const navigate = useNavigate();

  // Calculate total price using unique product id check
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-20 px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-lg md:text-xl font-bold tracking-widest mb-4">
          {lang === 'ur' ? 'آپ کی کارٹ خالی ہے' : 'YOUR CART IS EMPTY'}
        </h2>
        <p className={`text-xs mb-6 max-w-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {lang === 'ur' ? 'آپ نے ابھی تک کارٹ میں کوئی پروڈکٹ شامل نہیں کی۔' : 'You have not added any products to your cart yet.'}
        </p>
        <button 
          onClick={() => navigate("/categories")}
          className={`px-6 py-3 text-[10px] font-bold tracking-widest transition-all ${
            darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
        >
          {lang === 'ur' ? 'مزید خریداری کریں' : 'CONTINUE SHOPPING'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 font-sans">
      
      {/* Heading */}
      <h2 className="text-center mb-8 text-lg md:text-xl font-bold tracking-widest uppercase">
        {lang === 'ur' ? 'آپ کا آرڈر خلاصہ' : 'YOUR ORDER SUMMARY'}
      </h2>

      {/* Items List */}
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => {
          const itemId = item._id || item.id;
          return (
            <div 
              key={itemId} 
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 gap-4 ${
                darkMode ? 'border-neutral-800' : 'border-neutral-200'
              }`}
            >
              
              {/* Product Info */}
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg shrink-0" />
                <div>
                  <span className={`text-[10px] tracking-wider block ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {item.brand}
                  </span>
                  <h4 className="text-xs md:text-sm font-semibold tracking-wide my-1">{item.title}</h4>
                  <p className="text-xs font-bold">PKR {item.price} {lang === 'ur' ? 'فی عدد' : 'each'}</p>
                </div>
              </div>

              {/* Quantity Controls & Subtotal Wrapper for Mobile responsiveness */}
              <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center gap-6 mt-2 sm:mt-0">
                
                {/* Quantity Controls (+ / -) */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(itemId, item.quantity - 1)}
                    className={`w-7 h-7 flex items-center justify-center font-bold border transition-colors ${
                      darkMode ? 'border-neutral-700 hover:bg-neutral-800 text-white' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(itemId, item.quantity + 1)}
                    className={`w-7 h-7 flex items-center justify-center font-bold border transition-colors ${
                      darkMode ? 'border-neutral-700 hover:bg-neutral-800 text-white' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-right">
                  <p className="text-xs md:text-sm font-bold mb-1">PKR {item.price * item.quantity}</p>
                  <button 
                    onClick={() => removeFromCart(itemId)}
                    className="text-[10px] text-rose-500 hover:underline tracking-wider uppercase font-semibold"
                  >
                    {lang === 'ur' ? 'ختم کریں' : 'Remove'}
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Total & Proceed to Checkout */}
      <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
        darkMode ? 'border-neutral-800' : 'border-neutral-200'
      }`}>
        <div>
          <p className={`text-[11px] tracking-wider mb-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {lang === 'ur' ? 'کل رقم (Total Amount):' : 'TOTAL AMOUNT:'}
          </p>
          <h3 className="text-xl md:text-2xl font-bold tracking-wide">PKR {totalPrice}</h3>
        </div>

        <button 
          onClick={() => navigate("/checkout")}
          className={`w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-lg ${
            darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
        >
          {lang === 'ur' ? 'چیک آؤٹ کی طرف جائیں' : 'PROCEED TO CHECKOUT'}
        </button>
      </div>

    </div>
  );
}