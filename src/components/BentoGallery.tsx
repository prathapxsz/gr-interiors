'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'Penthouse Suite',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    title: 'Modern Villa',
    location: 'Beverly Hills, CA',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
    span: '',
  },
  {
    id: 3,
    title: 'Coastal Retreat',
    location: 'Malibu, CA',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    span: '',
  },
  {
    id: 4,
    title: 'Urban Loft',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop',
    span: 'md:row-span-2',
  },
  {
    id: 5,
    title: 'Minimalist Home',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop',
    span: '',
  },
  {
    id: 6,
    title: 'Classic Estate',
    location: 'Greenwich, CT',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
    span: 'md:col-span-2',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const imageHoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.08,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function BentoGallery() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-charcoal">
            Selected Works
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4 auto-rows-[280px] md:auto-rows-[250px]"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              className={`group relative overflow-hidden cursor-pointer ${project.span}`}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                variants={imageHoverVariants}
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ y: '100%', opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="font-playfair text-xl md:text-2xl text-cream mb-1">
                  {project.title}
                </h3>
                <p className="text-cream/70 text-sm">{project.location}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
