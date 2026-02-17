'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const quotes = [
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
  {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
];

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayedText, setDisplayedText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isInView && !isAnimating) {
      setDisplayedText('');
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          currentIndex++;
          if (currentIndex <= text.length) {
            setDisplayedText(text.slice(0, currentIndex));
          } else {
            clearInterval(interval);
          }
        }, 35);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, text, delay, isAnimating]);

  return (
    <span ref={ref}>
      {displayedText}
      {isAnimating && displayedText.length < text.length && displayedText.length > 0 && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-gold/60 ml-1 align-middle"
        />
      )}
    </span>
  );
}

export default function QuotesSection() {
  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#F5F0E8]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Philosophy</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-charcoal">
            Words We Live By
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg 
                    className="w-16 h-16 md:w-24 md:h-24 text-gold/30" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>
                
                <div className="flex-1">
                  <p className="font-playfair text-2xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed mb-6 italic">
                    "<TypewriterText text={quote.text} delay={index * 800 + 500} />"
                  </p>
                  
                  <motion.div 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.3 + 2 }}
                  >
                    <div className="w-12 h-px bg-gold" />
                    <span className="text-warm-gray text-sm tracking-[0.2em] uppercase">
                      {quote.author}
                    </span>
                  </motion.div>
                </div>
              </div>
              
              {index < quotes.length - 1 && (
                <div className="mt-16 md:mt-24 border-b border-charcoal/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
