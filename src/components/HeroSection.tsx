import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-10 pb-4 text-center px-4 max-w-4xl mx-auto" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-950 dark:text-white tracking-tight leading-tight">
        JSON to JavaScript Object Converter for Free
      </h1>
      <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Convert your JSON file into JavaScript with advanced settings at your fingertips. All are 100% FREE, easy to use and offline conversion with no hidden fees!
      </p>
    </section>
  );
};
