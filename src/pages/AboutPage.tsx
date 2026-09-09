import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in text-gray-200">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-white hover:border-[#F7DF1E] text-xs font-semibold transition-all mb-8 cursor-pointer shadow-2xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Converter</span>
      </button>

      {/* Main Title */}
      <div className="border-b border-zinc-800 pb-6 mb-8">
        <h1 className="text-3xl sm:text-4xl font-normal font-sans">
          <span className="text-white">About </span>
          <span className="text-white">json2</span>
          <span className="text-[#F7DF1E]">js</span>
        </h1>
        <p className="mt-3 text-base text-gray-400 leading-relaxed font-sans">
          A community-driven, 100% free developer utility hosted on the popular js.org network.
        </p>
      </div>

      {/* Flat Wikipedia-style Plain Text Content */}
      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-300">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            js.org Community Hosted Project
          </h2>
          <p>
            <strong>json2js</strong>
            It was created to give developers a lightning-fast, zero-friction, and completely ad-free way to transform JSON payloads into native JavaScript object literals and vice versa.
          </p>
          <p className="mt-3 text-gray-400">
            Non-Commercial &amp; Community First: No paid plans, no telemetry, no tracking scripts, and no ads. Built solely to serve JavaScript and TypeScript developers worldwide.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            100% Client-Side &amp; Private
          </h2>
          <p>
            All transformations happen directly in your browser using JavaScript&apos;s native parsing and serialization engine. Your sensitive JSON files and variables never leave your machine, preventing any data leakage or external exposure.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            PWA &amp; Offline Ready
          </h2>
          <p>
            Equipped with a modern Service Worker and Web App Manifest. You can install this tool directly onto your desktop or mobile device and convert data completely offline without an active internet connection.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            Idiomatic JavaScript Output
          </h2>
          <p>
            Supports unquoted object keys (where valid ECMAScript identifier rules apply), single or double quotes, trailing commas, custom declarations (<code className="text-[#F7DF1E] font-mono text-xs">const</code>, <code className="text-[#F7DF1E] font-mono text-xs">let</code>, <code className="text-[#F7DF1E] font-mono text-xs">export default</code>, <code className="text-[#F7DF1E] font-mono text-xs">module.exports</code>), and customizable indentation.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            Built by Rizwan Islam
          </h2>
          <p>
            Maintained with ❤️ by{' '}
            <a
              href="https://github.com/rizwanislam-FireFolk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F7DF1E] hover:underline font-medium"
            >
              Rizwan Islam
            </a>
            . Open source, independent, and community-centric.
          </p>
        </div>
      </div>
    </div>
  );
};
