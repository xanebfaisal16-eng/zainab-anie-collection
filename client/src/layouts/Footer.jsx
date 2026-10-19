import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaTiktok, FaFacebookF } from 'react-icons/fa'

const Footer = ({ lang = 'en', darkMode = false }) => {
  const isDark = darkMode
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:8080/api/v1/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setMessage(lang === 'ur' ? 'کامیابی سے سبسکرائب ہو گیا!' : 'Successfully subscribed!')
        setEmail('')
      } else {
        setMessage(data.message || (lang === 'ur' ? 'کچھ غلط ہو गया।' : 'Something went wrong.'))
      }
    } catch (err) {
      setMessage(lang === 'ur' ? 'سرور سے رابطہ نہیں ہو सका।' : 'Failed to connect to server.')
    } finally {
      setLoading(false)
    }
  }

  const content = {
    en: {
      desc: "Crafting timeless elegance and modern luxury fashion. Handcrafted formals, unstitched collections, and bespoke ensembles.",
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { name: "New Arrivals", path: "/categories" },
        { name: "Unstitched", path: "/categories" },
        { name: "Sale", path: "/sale" }
      ],
      customerCareTitle: "Customer Care",
      customerCare: [
        { name: "Policies & Delivery", path: "/policy/shipping" }
      ],
      socialTitle: "Connect With Us",
      newsletterTitle: "Newsletter",
      newsletterDesc: "Subscribe to receive updates and exclusive collection access.",
      placeholder: "Enter your email",
      joinBtn: "JOIN",
      rights: "© 2026 ZAINAB ANIE. ALL RIGHTS RESERVED."
    },
    ur: {
      desc: "لازوال خوبصورتی اور جدید لگژری فیشن کی تخلیق۔ ہاتھ سے بنی فارملز اور ان اسٹچڈ کلیکشنز۔",
      quickLinksTitle: "فوری لنکس",
      quickLinks: [
        { name: "نئی آمد", path: "/categories" },
        { name: "ان اسٹچڈ", path: "/categories" },
        { name: "سیل", path: "/sale" }
      ],
      customerCareTitle: "کسٹمر کیئر",
      customerCare: [
        { name: "پالیسیاں اور ڈلیوری", path: "/policy/shipping" }
      ],
      socialTitle: "سوشل چینلز",
      newsletterTitle: "نیوز لیٹر",
      newsletterDesc: "اپڈیٹس اور خصوصی کلیکشن کے لیے سبسکرائب کریں۔",
      placeholder: "ای میل درج کریں",
      joinBtn: "جوائن",
      rights: "© 2026 ZAINAB ANIE. تمام حقوق محفوظ ہیں۔"
    }
  }

  const t = content[lang] || content.en

  return (
    <footer className={`border-t transition-colors ${
      isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
    } ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
      <div className={`max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs ${lang === 'ur' ? 'direction-rtl' : ''}`}>
        
        {/* Brand Column & Social Links */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold tracking-[0.2em] uppercase">ZAINAB ANIE</h3>
          <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light text-[11px]">
            {t.desc}
          </p>

          <div className="space-y-2 pt-2">
            <h4 className="font-semibold tracking-[0.2em] uppercase text-[10px] text-neutral-400">{t.socialTitle}</h4>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <a href="https://www.instagram.com/zabyzainabani/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shadow-sm" style={{ backgroundColor: "#E1306C" }} title="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="https://www.tiktok.com/@za.byzainabani" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shadow-sm" style={{ backgroundColor: "#000000" }} title="TikTok">
                <FaTiktok size={13} />
              </a>
              <a href="https://www.facebook.com/zabyzainabaniy" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 shadow-sm" style={{ backgroundColor: "#1877F2" }} title="Facebook">
                <FaFacebookF size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-semibold tracking-[0.2em] uppercase text-[11px]">{t.quickLinksTitle}</h4>
          <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
            {t.quickLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="hover:text-amber-600 transition-colors">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support */}
        <div className="space-y-3">
          <h4 className="font-semibold tracking-[0.2em] uppercase text-[11px]">{t.customerCareTitle}</h4>
          <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
            {t.customerCare.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path} className="hover:text-amber-600 transition-colors">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h4 className="font-semibold tracking-[0.2em] uppercase text-[11px]">{t.newsletterTitle}</h4>
          <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">
            {t.newsletterDesc}
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder} 
                required
                className={`bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs w-full focus:outline-none ${lang === 'ur' ? 'text-right' : ''}`}
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-bold tracking-wider uppercase text-[10px] whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                {loading ? '...' : t.joinBtn}
              </button>
            </div>
            {message && (
              <p className={`text-[11px] font-medium ${message.includes('success') || message.includes('کامیابی') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {message}
              </p>
            )}
          </form>
        </div>

      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 text-center py-4 text-[10px] tracking-widest text-neutral-400 uppercase">
        {t.rights}
      </div>
    </footer>
  )
}

export default Footer