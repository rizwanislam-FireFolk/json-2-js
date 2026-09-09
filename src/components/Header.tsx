import React from 'react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onNavigate: (view: 'converter' | 'about' | 'privacy' | 'terms') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="w-full bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Text: Thin normal weight domain json2.js.org with yellow .js and identical white color for json2 and .org */}
        <button
          type="button"
          onClick={() => onNavigate('converter')}
          className="flex items-center select-none cursor-pointer focus:outline-hidden group"
          title="Return to Converter"
        >
       <span className="text-xl sm:text-2xl font-normal font-sans leading-none tracking-normal">
            <span className="text-white group-hover:text-gray-200 transition-colors">json2</span>
            <span className="text-[#F7DF1E]">.js</span>
            <span className="text-white group-hover:text-gray-200 transition-colors">.org</span>
          </span>
        </button>

        {/* Action Controls: PWA Install Button */}
        <div className="flex items-center">
          <PWAInstallButton />
        </div>
      </div>
    </header>
  );
};
