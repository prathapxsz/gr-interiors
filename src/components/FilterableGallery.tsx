'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface FilterableGalleryProps {
  projects: Project[];
}

const categories = ['all', 'bedroom', 'hall', 'kitchen', 'pooja'];

export default function FilterableGallery({ projects }: FilterableGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8">
            Our Projects
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 text-sm tracking-wider uppercase border transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-charcoal text-cream border-charcoal'
                    : 'border-charcoal/20 text-warm-gray hover:border-gold hover:text-gold'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  layout: { duration: 0.4 }
                }}
                className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="font-playfair text-xl md:text-2xl text-cream mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gold text-sm capitalize">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-warm-gray text-lg">No projects found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
