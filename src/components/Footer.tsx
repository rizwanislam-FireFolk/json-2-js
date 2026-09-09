import React from 'react';

interface FooterProps {
  onNavigate: (view: 'converter' | 'about' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-zinc-900 border-t border-zinc-800 py-6 px-4 sm:px-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
        <div>
          <span>
            &copy; 2026 json2.js.org. Built with ❤️ by{' '}
            <a
              href="https://github.com/rizwanislam-FireFolk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#F7DF1E] transition-colors underline-offset-2 hover:underline font-medium"
            >
              Rizwan Islam
            </a>
            .
          </span>
        </div>

        {/* Compact, tightly spaced navigation links */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              onNavigate('converter');
              setTimeout(() => {
                const el = document.getElementById('examples-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }, 50);
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Examples
          </button>
          <span className="text-zinc-600">/</span>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <span className="text-zinc-600">/</span>
          <button
            type="button"
            onClick={() => onNavigate('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-zinc-600">/</span>
          <button
            type="button"
            onClick={() => onNavigate('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
};
