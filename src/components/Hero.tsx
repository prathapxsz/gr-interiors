'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
          alt="Luxury Interiors"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-cream/80 text-sm tracking-[0.3em] uppercase mb-6"
        >
          Luxury Interiors
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl text-cream max-w-5xl leading-[1.1] mb-8"
        >
          Where Elegance Meets
          <span className="block italic text-gold">Timeless Design</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-cream/70 text-lg max-w-xl mb-10"
        >
          Creating bespoke interiors that reflect your unique vision and elevate everyday living.
        </motion.p>
        
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="border border-cream/50 text-cream px-8 py-4 text-sm tracking-wider hover:bg-cream hover:text-charcoal transition-all duration-500"
        >
          VIEW PORTFOLIO
        </motion.a>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-cream/30 mx-auto mb-2" />
        <span className="text-cream/50 text-xs tracking-widest">SCROLL</span>
      </motion.div>
    </section>
  );
}
