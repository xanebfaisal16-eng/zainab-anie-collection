import React from 'react'
import { useParams, Link } from 'react-router-dom'

const Policy = ({ lang = 'en', darkMode = false }) => {
  const { type } = useParams()

  const content = {
    en: {
      shipping: {
        title: "Shipping & Delivery",
        desc: "We ensure fast and safe delivery across Pakistan within 3 to 5 working days. Enjoy hassle-free shipping on all luxury collections."
      },
      exchange: {
        title: "Exchange & Returns",
        desc: "We offer 7-day easy exchange if there is any manufacturing defect or sizing issue. Customized or stitched articles cannot be returned."
      },
      size: {
        title: "Size Guide",
        desc: "Our unstitched collections come with standard lengths and generous fabric cuts. Please refer to our detailed measurement charts before placing your order."
      },
      back: "Back to Home"
    },
    ur: {
      shipping: {
        title: "شپنگ اور ڈلیوری",
        desc: "ہم پاکستان بھر میں 3 سے 5 کام کے دنوں میں محفوظ اور تیز ڈلیوری فراہم کرتے ہیں۔"
      },
      exchange: {
        title: "ایکسچینج اور ریٹرن",
        desc: "اگر کوئی نقص یا سائز کا مسئلہ ہو تو آپ 7 دن کے اندر آسانی سے ایکسچینج کر سکتے ہیں۔"
      },
      size: {
        title: "سائز گائیڈ",
        desc: "ہمارے ان اسٹچڈ سوٹس میں معیاری اور پورا کپڑا دیا جاتا ہے۔ آرڈر کرنے سے پہلے سائز چارٹ ضرور چیک کریں۔"
      },
      back: "واپس ہوم پر جائیں"
    }
  }

  const t = content[lang] || content.en
  const currentPolicy = t[type] || t.shipping

  return (
    <div className={`min-h-[75vh] max-w-3xl mx-auto px-6 py-16 text-center ${darkMode ? 'text-white' : 'text-neutral-900'} ${lang === 'ur' ? 'font-urdu' : ''}`}>
      <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wider uppercase mb-6 text-amber-600">
        {currentPolicy.title}
      </h1>
      
      <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
        {currentPolicy.desc}
      </p>

      <div className="space-y-4">
        <p className="text-xs text-neutral-400">
          Have more questions? Contact us directly on WhatsApp!
        </p>
        <div>
          <Link 
            to="/" 
            className="inline-block px-6 py-2.5 text-xs tracking-widest uppercase font-semibold border border-neutral-900 dark:border-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Policy