import React from 'react'
import MetaData from '../layouts/MetaData'

const AboutUs = ({ lang = 'en', darkMode = false }) => {
  const isDark = darkMode

  // Multilingual content for About Us page (Elevated & Success-Driven)
  const content = {
    en: {
      est: "EST. 2026 — LAHORE",
      title: "The Pinnacle of Pakistani Couture",
      subtitle: "Zainab Anie represents a triumphant journey of modern luxury, where timeless hand-craftsmanship meets contemporary haute couture elegance.",
      philosophyBadge: "OUR LEGACY & PHILOSOPHY",
      philosophyTitle: "A Celebrated Tradition of Uncompromised Excellence",
      desc1: "Every masterpiece we create reflects countless hours of dedication by Pakistan’s finest master artisans. From intricate zardozi to ethereal hand-woven drapes, we craft heirlooms meant to be treasured for generations.",
      desc2: "Our commitment to slow fashion and absolute exclusivity has redefined luxury standards, making every ensemble a symbol of grace, success, and royal heritage.",
      stat1Title: "100%",
      stat1Desc: "Pure Handcrafted Textiles",
      stat2Title: "Bespoke",
      stat2Desc: "Exclusive Custom Tailoring",
      atelierLabel: "INSIDE THE ZAINAB ANIE ATELIER",
      pillars: [
        {
          num: "01",
          title: "Master Artisanal Craft",
          desc: "Exquisite hand-embellished details featuring authentic dabka, zardozi, and resham artistry."
        },
        {
          num: "02",
          title: "Flawless Silhouette",
          desc: "Immaculate tailoring designed to offer a regal drape and unmatched confidence."
        },
        {
          num: "03",
          title: "Absolute Exclusivity",
          desc: "Curated small-batch collections reflecting true slow fashion and elite modern luxury."
        }
      ]
    },
    ur: {
      est: "قیام ۲۰۲۶ — لاہور",
      title: "پاکستانی کوتور کا نیا باب",
      subtitle: "زینب عنی جدید لگژری اور شاندار روایتی کاریگری کا ایک کامیاب سنگم ہے، جو ہر عورت کو شاہانہ وقار عطا کرتا ہے۔",
      philosophyBadge: "ہماری میراث اور فلاسفی",
      philosophyTitle: "بے مثال کاریگری اور لازوال خوبصورتی کی کہانی",
      desc1: "ہمارا ہر شاہکار پاکستان کے ماہر کاریگروں کی بے پناہ محنت کا نتیجہ ہے۔ ڈبکا، زردوزی اور ریشم کے حسین امتزاج سے ہم ایسے لباس تیار کرتے ہیں جو نسلوں تک یادگار رہتے ہیں۔",
      desc2: "سلو فیشن اور انفرادیت کے اصولوں پر کاربند رہتے ہوئے، ہم نے لگژری فیشن میں ایک نیا معیار قائم کیا ہے جو کامیابی اور عظمت کا عکاس ہے۔",
      stat1Title: "100%",
      stat1Desc: "خالص ہاتھ سے بنے ہوئے کپڑے",
      stat2Title: "بیسپوک",
      stat2Desc: "خصوصی کسٹم ٹیلرنگ",
      atelierLabel: "زینب عنی ایٹیلیئر کی جھلک",
      pillars: [
        {
          num: "01",
          title: "شاہانہ کاریگری",
          desc: "ڈبکا، زردوزی اور ریشم کے کام سے سجی ہوئی بے مثال ہاتھ کی کڑھائی۔"
        },
        {
          num: "02",
          title: "بہترین سلائٹس",
          desc: "شاہانہ انداز اور بے مثال اعتماد کے لیے تیار کردہ لاجواب کٹس۔"
        },
        {
          num: "03",
          title: "خصوصی انفرادیت",
          desc: "خالص سلو فیشن اور اعلیٰ ترین لگژری کے تحت تیار کردہ محدود کلیکشنز۔"
        }
      ]
    }
  }

  const t = content[lang] || content.en

  return (
    <div 
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000'
      }}
      className={`min-h-[85vh] py-16 px-4 md:px-8 transition-colors duration-300 ${lang === 'ur' ? 'font-urdu text-right' : ''}`}
    >
      <MetaData title="About Us"/>
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className={`flex items-center justify-center gap-3 mb-4 ${lang === 'ur' ? 'flex-row-reverse' : ''}`}>
          <span className="w-8 h-[1px] bg-amber-600"></span>
          <span className="text-[11px] md:text-xs tracking-[0.35em] uppercase text-amber-600 font-bold">
            {t.est}
          </span>
          <span className="w-8 h-[1px] bg-amber-600"></span>
        </div>

        <h1 
          style={{ color: isDark ? '#ffffff' : '#111111' }}
          className="font-serif text-3xl md:text-5xl font-light tracking-widest uppercase mb-4 leading-tight"
        >
          {t.title}
        </h1>
        
        <p 
          style={{ color: isDark ? '#d1d5db' : '#333333' }}
          className="text-xs md:text-sm leading-relaxed font-normal tracking-wide max-w-2xl mx-auto"
        >
          {t.subtitle}
        </p>
      </div>

      {/* Split Section: Story & Fashion Visual */}
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 ${lang === 'ur' ? 'md:grid-flow-dense' : ''}`}>
        
        {/* Left Column: New High-End Editorial Shoot Image */}
        <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuipWcizTV0n0NetGAt0p0cV7lR78DnVwTtfGxH6_gKRah6vwinFixNDYAEO2s3-cZuqTOXEMTXoLed8wt9DzuX8YxsNkmzFWeSGdvNg&s=10" 
            alt="New Couture Studio Shoot" 
            className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
          />
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-md text-white text-[10px] tracking-widest uppercase font-serif text-center">
            {t.atelierLabel}
          </div>
        </div>

        {/* Right Column: Story Text */}
        <div className={`space-y-6 ${lang === 'ur' ? 'md:pr-4' : 'md:pl-4'}`}>
          <span className="text-[11px] tracking-[0.3em] uppercase text-amber-600 font-bold block">
            {t.philosophyBadge}
          </span>
          
          <h2 
            style={{ color: isDark ? '#ffffff' : '#111111' }}
            className="font-serif text-2xl md:text-3xl font-light tracking-wide leading-snug"
          >
            {t.philosophyTitle}
          </h2>
          
          <p 
            style={{ color: isDark ? '#e5e7eb' : '#222222' }}
            className="text-xs md:text-sm font-normal leading-relaxed"
          >
            {t.desc1}
          </p>
          
          <p 
            style={{ color: isDark ? '#e5e7eb' : '#222222' }}
            className="text-xs md:text-sm font-normal leading-relaxed"
          >
            {t.desc2}
          </p>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-neutral-300 dark:border-neutral-800">
            <div>
              <h4 className="font-serif text-xl font-bold text-amber-600">{t.stat1Title}</h4>
              <p 
                style={{ color: isDark ? '#9ca3af' : '#444444' }}
                className="text-[10px] tracking-widest uppercase font-semibold"
              >
                {t.stat1Desc}
              </p>
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-amber-600">{t.stat2Title}</h4>
              <p 
                style={{ color: isDark ? '#9ca3af' : '#444444' }}
                className="text-[10px] tracking-widest uppercase font-semibold"
              >
                {t.stat2Desc}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Clean Horizontal Pillars */}
      <div className="max-w-5xl mx-auto border-t border-b border-neutral-300 dark:border-neutral-800 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.pillars.map((pillar, idx) => (
          <div key={idx} className={`text-center px-4 ${idx === 1 ? 'md:border-x border-neutral-300 dark:border-neutral-800' : ''}`}>
            <span className="text-amber-600 font-serif text-sm font-bold block mb-1">{pillar.num}</span>
            <h3 style={{ color: isDark ? '#ffffff' : '#111111' }} className="font-serif text-xs uppercase tracking-widest font-semibold mb-2">
              {pillar.title}
            </h3>
            <p style={{ color: isDark ? '#d1d5db' : '#444444' }} className="text-xs font-normal leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AboutUs