import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PageProps> = ({ onBack }) => {
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
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-base text-gray-400 leading-relaxed font-sans">
          Last updated: 2026 September. json2.js.org commitment to zero telemetry and total developer privacy.
        </p>
      </div>

      {/* Flat Wikipedia-style Plain Text Content */}
      <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-300">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            1. Zero Server-Side Transmission
          </h2>
          <p>
            json2.js.org does not have any backend database, server API, or analytics pipeline that stores or reads the data you convert. All JSON parsing, syntax validation, JavaScript AST transformations, and text formatting execute strictly inside your local web browser&apos;s memory sandbox.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            2. No Account or Personal Information Required
          </h2>
          <p>
            You do not need to register, sign in, or provide any personal details (such as your name, email, or credentials) to use any feature of json2.js.org.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            3. No Third-Party Tracking &amp; No Cookies
          </h2>
          <p>
            We do not use tracking pixels, advertising networks, session replays, fingerprinting, or invasive analytics cookies. Your local preferences are saved exclusively in your device&apos;s browser <code className="text-[#F7DF1E] font-mono text-xs">localStorage</code>.
          </p>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
            4. Community Hosting &amp; Infrastructure
          </h2>
          <p>
            This project is hosted via the community js.org DNS system. Standard network routing and DDoS protections provided by modern web hosting networks apply at the DNS layer without any inspection of your code or input payloads.
          </p>
        </div>
      </div>
    </div>
  );
};
