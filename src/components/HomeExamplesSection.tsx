import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Code2 } from 'lucide-react';
import { COMPARISON_EXAMPLES } from '../data/samples';

export const HomeExamplesSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(COMPARISON_EXAMPLES?.[0]?.id || '');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeExample = COMPARISON_EXAMPLES?.find((ex) => ex.id === activeTabId) || COMPARISON_EXAMPLES?.[0];

  const handleCopy = async (code: string, key: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!activeExample) return null;

  const handleLoadIntoConverter = (jsonCode: string) => {
    window.dispatchEvent(
      new CustomEvent('load-example-json', {
        detail: { json: jsonCode },
      })
    );
  };

  return (
    <section id="examples-section" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-800 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Code2 className="w-4 h-4 text-[#F7DF1E]" />
            <span className="text-xs font-semibold text-[#F7DF1E] uppercase tracking-wider">Interactive Examples</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            JSON vs JavaScript Object Examples
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
            See how rigid JSON format transforms into clean, idiomatic JavaScript object syntax across common developer use cases.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleLoadIntoConverter(activeExample.jsonCode)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7DF1E] hover:bg-[#ebd21a] text-zinc-950 text-xs font-bold transition-all cursor-pointer shadow-xs whitespace-nowrap"
          title="Load this example into the converter"
        >
          <span>Try in Converter</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 scrollbar-none">
        {COMPARISON_EXAMPLES.map((ex) => {
          const isActive = ex.id === activeTabId;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActiveTabId(ex.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'bg-zinc-800 text-[#F7DF1E] border-zinc-700 shadow-2xs'
                  : 'bg-zinc-900/80 text-gray-400 border-zinc-800/80 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {ex.title.replace(' Example', '')}
            </button>
          );
        })}
      </div>

      {/* Description & Features */}
      <div className="mb-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
          {activeExample.description}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {activeExample.features.map((feat) => (
            <span
              key={feat}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-gray-300 border border-zinc-700/60"
            >
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Code Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT: JSON */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col shadow-xs">
          <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Input JSON</span>
            <button
              type="button"
              onClick={() => handleCopy(activeExample.jsonCode, 'json-' + activeExample.id)}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-zinc-800"
              title="Copy JSON code"
            >
              {copiedKey === 'json-' + activeExample.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="p-4 bg-zinc-950 flex-1 overflow-x-auto">
            <pre className="font-mono text-xs text-amber-300 leading-relaxed">
              <code>{activeExample.jsonCode}</code>
            </pre>
          </div>
          <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
            {activeExample.jsonCode.split('\n').length} lines, {activeExample.jsonCode.length} chars
          </div>
        </div>

        {/* RIGHT: JavaScript */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col shadow-xs">
          <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs">
            <span className="font-semibold text-white">JavaScript Object Output</span>
            <button
              type="button"
              onClick={() => handleCopy(activeExample.jsCode, 'js-' + activeExample.id)}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-zinc-800"
              title="Copy JavaScript code"
            >
              {copiedKey === 'js-' + activeExample.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="p-4 bg-zinc-950 flex-1 overflow-x-auto">
            <pre className="font-mono text-xs text-[#F7DF1E] leading-relaxed">
              <code>{activeExample.jsCode}</code>
            </pre>
          </div>
          <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-[11px] font-mono text-zinc-500">
            {activeExample.jsCode.split('\n').length} lines, {activeExample.jsCode.length} chars
          </div>
        </div>
      </div>
    </section>
  );
};
