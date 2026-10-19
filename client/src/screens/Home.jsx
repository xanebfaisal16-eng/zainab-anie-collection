import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

const Home = ({ lang = 'en', darkMode = false, t }) => {
  // Multilingual translations dictionary for Home screen
  const homeText = {
    en: {
      subtitle: "FESTIVE UNSTITCHED COLLECTION '26",
      desc: "Discover handcrafted luxury unstitched lawn and fine fabrics crafted with perfection and sophistication.",
      btn: "Explore Collection"
    },
    ur: {
      subtitle: "فیسٹیو ان سٹچڈ کلیکشن '26",
      desc: "خوبصورت اور دلکش ہاتھ کی کڑھائی والے ان سٹچڈ سوٹ انتہائی نفاست کے ساتھ دریافت کریں۔",
      btn: "کلیکشن دیکھیں"
    }
  }

  const currentT = homeText[lang] || homeText.en

  return (
    <div className={`min-h-[85vh] flex flex-col justify-center items-center text-center px-4 py-12 transition-colors duration-300 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'} ${lang === 'ur' ? 'font-urdu' : ''}`}>
      <MetaData title="Home"/>
      
      {/* Subtitle */}
      <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-amber-600 font-medium mb-3">
        {currentT.subtitle}
      </span>

      {/* Typewriter Heading */}
      <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl font-light tracking-wide min-h-[60px] md:min-h-[80px] flex items-center justify-center max-w-4xl mx-auto">
        <Typewriter
          words={[
            'ZAINAB ANIE',
            'LUXURY UNSTITCHED',
            'EMBROIDERED LAWN',
            'FESTIVE CHIFFON',
            'ELEGANCE REDEFINED'
          ]}
          loop={true}
          cursor
          cursorStyle='|'
          typeSpeed={75}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

      <p className="text-sm md:text-base text-neutral-500 max-w-md my-6 leading-relaxed font-light">
        {currentT.desc}
      </p>

      {/* CTA Button */}
      <Link 
        to="/categories" 
        className={`px-8 py-3 text-xs tracking-widest uppercase font-semibold border transition-all duration-300 ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'}`}
      >
        {currentT.btn}
      </Link>

    </div>
  )
}

export default Home