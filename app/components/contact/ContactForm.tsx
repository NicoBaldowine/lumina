'use client';

import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../ThemeProvider';

export default function ContactForm() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const inputClasses = `w-full px-4 py-3 text-big-description transition-colors ${
    isDarkMode
      ? 'bg-[#1a1a1a] text-white placeholder-neutral-500 border border-neutral-700 focus:border-neutral-500'
      : 'bg-neutral-100 text-black placeholder-neutral-400 border border-neutral-200 focus:border-neutral-400'
  } outline-none`;

  const labelClasses = `block mb-2 text-small-description ${
    isDarkMode ? 'text-white' : 'text-black'
  }`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      {/* Left side - Text */}
      <div>
        <h1
          className={`text-big-title mb-6 transition-all duration-1000 ease-out ${
            isDarkMode ? 'text-white' : 'text-black'
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Let&apos;s build something together.
        </h1>
        <p
          className={`text-big-description mb-6 transition-all duration-1000 delay-200 ease-out ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          If you&apos;re working on something or want to connect, share a bit about yourself and what you&apos;re looking to create. We&apos;ll get back to you as soon as possible.
        </p>
        <p
          className={`text-big-description transition-all duration-1000 delay-300 ease-out ${
            isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Write us at{' '}
          <a
            href="mailto:hi@islumina.com"
            className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}
          >
            hi@islumina.com
          </a>
          {' '}or follow us on{' '}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isDarkMode ? 'text-white' : 'text-black'} hover:underline`}
          >
            instagram
          </a>
        </p>
      </div>

      {/* Right side - Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`transition-all duration-1000 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <label htmlFor="company" className={labelClasses}>
            Company or Project
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Enter company or project's name"
            value={formData.company}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div
          className={`transition-all duration-1000 delay-[400ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <label htmlFor="message" className={labelClasses}>
            What do you need help with?
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about your project"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />
        </div>

        <div
          className={`flex justify-end transition-all duration-1000 delay-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            type="submit"
            className={`px-6 py-3 rounded-full text-small-description transition-all duration-300 ${
              isDarkMode
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
