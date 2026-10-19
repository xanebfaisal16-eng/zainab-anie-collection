import React, { useState, useEffect } from 'react'

const PromoModal = ({ darkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Banner Images / Cards
  const cards = [
    {
      id: 1,
      title: "NEW ARRIVALS '26",
      subtitle: "Unstitched Lawn Collection",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      tag: "Limited Stock"
    },
    {
      id: 2,
      title: "FESTIVE CHIFFON",
      subtitle: "Hand-embroidered Dupattas & Shirts",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      tag: "Trending"
    },
    {
      id: 3,
      title: "BOUTIQUE SPECIAL",
      subtitle: "Exclusive Organza Patches",
      image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=800",
      tag: "Exclusive"
    }
  ]

  // Open pop-up on page load
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenPromo')
    if (!hasSeenModal) {
      setIsOpen(true)
    }
  }, [])

  const closeModal = () => {
    sessionStorage.setItem('hasSeenPromo', 'true')
    setIsOpen(false)
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Modal Box */}
      <div className={`relative w-full max-w-lg rounded-none shadow-2xl overflow-hidden border ${
        darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
      }`}>
        
        {/* Close Button [X] */}
        <button 
          onClick={closeModal}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-bold hover:bg-black transition-colors"
        >
          ✕
        </button>

        {/* Card Content Slider */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img 
            src={cards[currentIndex].image} 
            alt={cards[currentIndex].title}
            className="w-full h-full object-cover transition-all duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-center text-white">
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-bold mb-1">
              {cards[currentIndex].tag}
            </span>
            <h3 className="font-serif text-2xl font-light uppercase tracking-widest mb-1">
              {cards[currentIndex].title}
            </h3>
            <p className="text-xs text-neutral-300 mb-4 font-light">
              {cards[currentIndex].subtitle}
            </p>

            <button 
              onClick={closeModal}
              className="w-full py-2.5 text-xs tracking-[0.2em] uppercase font-semibold bg-amber-600 text-black hover:bg-amber-500 transition-colors"
            >
              Explore Collection
            </button>
          </div>

          {/* Left Arrow */}
          <button 
            onClick={prevCard}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white hover:bg-black/70 transition-colors text-xs"
          >
            ❮
          </button>

          {/* Right Arrow */}
          <button 
            onClick={nextCard}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white hover:bg-black/70 transition-colors text-xs"
          >
            ❯
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-1.5 py-3 bg-neutral-950">
          {cards.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-neutral-600'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default PromoModal