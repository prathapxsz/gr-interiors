'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  project?: string;
  message?: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Please enter your email';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;
      case 'project':
        if (!value) return 'Please select a project type';
        break;
      case 'message':
        if (!value.trim()) return 'Please enter a message';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const form = formRef.current;
    if (!form) return false;

    const formData = new FormData(form);
    const newErrors: FormErrors = {};
    let isValid = true;

    ['name', 'email', 'project', 'message'].forEach(field => {
      const value = formData.get(field) as string;
      const error = validateField(field, value);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, project: true, message: true });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        setErrors({});
        setTouched({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = "w-full bg-transparent border-b-2 py-3 outline-none transition-all duration-300 text-charcoal placeholder:text-warm-gray/50";
  const getInputClass = (fieldName: keyof FormErrors) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return `${inputBaseClass} ${hasError ? 'border-red-500 focus:border-red-500' : 'border-charcoal/20 focus:border-gold'}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
            Start Your Project
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto">
            Ready to transform your space? Share your vision with us and let's create something extraordinary together.
          </p>
        </motion.div>

        <motion.form
          ref={formRef}
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
          noValidate
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 border border-gold/30"
            >
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-gold rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl text-charcoal mb-2">Thank You</h3>
              <p className="text-warm-gray">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm tracking-wider text-charcoal uppercase">
                    Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    className={getInputClass('name')}
                    placeholder="Your full name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <motion.p 
                      id="name-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm tracking-wider text-charcoal uppercase">
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={getInputClass('email')}
                    placeholder="your@email.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <motion.p 
                      id="email-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="project" className="block text-sm tracking-wider text-charcoal uppercase">
                  Project Type <span className="text-gold">*</span>
                </label>
                <select
                  id="project"
                  name="project"
                  required
                  className={`${getInputClass('project')} cursor-pointer`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={touched.project && !!errors.project}
                  aria-describedby={errors.project ? 'project-error' : undefined}
                >
                  <option value="">Select a project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="consultation">Design Consultation</option>
                </select>
                {touched.project && errors.project && (
                  <motion.p 
                    id="project-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.project}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm tracking-wider text-charcoal uppercase">
                  Message <span className="text-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  className={`${getInputClass('message')} resize-none`}
                  placeholder="Tell us about your project..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {touched.message && errors.message && (
                  <motion.p 
                    id="message-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 bg-charcoal text-cream px-8 md:px-12 py-4 text-sm tracking-wider hover:bg-soft-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    'SEND INQUIRY'
                  )}
                </button>
              </div>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
