import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Copy,
  Check,
  Download,
  Trash2,
  ArrowLeftRight,
  Shuffle,
  AlignLeft,
  Minimize2,
} from 'lucide-react';
import { ConverterOptions, ConversionResult, TargetLanguage } from '../types';
import { convertJsonToJsObject, convertJsToJson, formatJsonString, minifyJsonString } from '../utils/jsonToJsConverter';
import { SAMPLE_JSONS } from '../data/samples';
import { CodeEditor } from './CodeEditor';
import { CodeViewer } from './CodeViewer';

type ConversionDirection = 'json-to-js' | 'js-to-json';

interface ConverterWorkspaceProps {
  targetLanguage?: TargetLanguage;
  onSelectLanguage?: (lang: TargetLanguage) => void;
}

export const ConverterWorkspace: React.FC<ConverterWorkspaceProps> = ({
  targetLanguage = 'javascript',
  onSelectLanguage,
}) => {
  const [direction, setDirection] = useState<ConversionDirection>('json-to-js');
  const [inputText, setInputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const [options, setOptions] = useState<ConverterOptions>({
    variableDeclaration: targetLanguage === 'typescript' ? 'ts_as_const' : 'const',
    variableName: 'data',
    quoteStyle: 'single',
    unquoteKeys: true,
    trailingCommas: true,
    indentSize: 2,
    semicolon: true,
    sortKeys: false,
    autoConvert: true,
  });

  const [result, setResult] = useState<ConversionResult>({
    success: true,
    output: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize options with targetLanguage when changed from parent or URL
  useEffect(() => {
    if (targetLanguage === 'typescript') {
      setOptions(prev => {
        if (!prev.variableDeclaration.startsWith('ts_')) {
          return { ...prev, variableDeclaration: 'ts_as_const' };
        }
        return prev;
      });
    } else if (targetLanguage === 'javascript') {
      setOptions(prev => {
        if (prev.variableDeclaration.startsWith('ts_')) {
          return { ...prev, variableDeclaration: 'const' };
        }
        return prev;
      });
    }
  }, [targetLanguage]);

  const performConversion = useCallback((text: string, dir: ConversionDirection, opts: ConverterOptions) => {
    setIsConverting(true);
    let res: ConversionResult;
    if (dir === 'json-to-js') {
      res = convertJsonToJsObject(text, opts);
    } else {
      res = convertJsToJson(text, opts.indentSize);
    }
    setResult(res);
    setTimeout(() => setIsConverting(false), 150);
  }, []);

  // Automatic real-time conversion whenever input or options change
  useEffect(() => {
    performConversion(inputText, direction, options);
  }, [inputText, direction, options, performConversion]);

  // Listen for example loading from home page examples section
  useEffect(() => {
    const handleLoadSample = (e: Event) => {
      const customEvent = e as CustomEvent<{ json: string }>;
      if (customEvent.detail?.json) {
        setInputText(customEvent.detail.json);
        setDirection('json-to-js');
        const el = document.getElementById('converter-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('load-example-json', handleLoadSample);
    return () => window.removeEventListener('load-example-json', handleLoadSample);
  }, []);

  const handleSwapDirection = () => {
    const nextDirection: ConversionDirection = direction === 'json-to-js' ? 'js-to-json' : 'json-to-js';
    const nextInput = result.output || inputText;
    setDirection(nextDirection);
    setInputText(nextInput);
    performConversion(nextInput, nextDirection, options);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
      performConversion(content, direction, options);
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInputText(content);
        performConversion(content, direction, options);
      };
      reader.readAsText(file);
    }
  };

  const handleCopyOutput = async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = result.output;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result.output) return;
    const isJs = direction === 'json-to-js';
    const isTs = isJs && options.variableDeclaration.startsWith('ts_');
    const extension = isJs ? (isTs ? 'ts' : 'js') : 'json';
    const mimeType = isJs
      ? (isTs ? 'application/typescript;charset=utf-8' : 'application/javascript;charset=utf-8')
      : 'application/json;charset=utf-8';
    const filename = `${options.variableName || 'output'}.${extension}`;
    
    const blob = new Blob([result.output], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFormatJson = () => {
    const formatted = formatJsonString(inputText, options.indentSize);
    if (formatted.success) {
      setInputText(formatted.formatted);
    }
  };

  const handleMinifyJson = () => {
    const minified = minifyJsonString(inputText);
    if (minified.success) {
      setInputText(minified.minified);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult({ success: true, output: '' });
  };

  const handleRandomSample = () => {
    const randomSample = SAMPLE_JSONS[Math.floor(Math.random() * SAMPLE_JSONS.length)];
    if (direction === 'json-to-js') {
      setInputText(randomSample.json);
      performConversion(randomSample.json, 'json-to-js', options);
    } else {
      const converted = convertJsonToJsObject(randomSample.json, options);
      setInputText(converted.output || randomSample.json);
      performConversion(converted.output || randomSample.json, 'js-to-json', options);
    }
  };

  const handleFormatChange = (newVal: ConverterOptions['variableDeclaration']) => {
    setOptions(prev => ({ ...prev, variableDeclaration: newVal }));
    if (newVal.startsWith('ts_')) {
      onSelectLanguage?.('typescript');
    } else {
      onSelectLanguage?.('javascript');
    }
  };

  const isJsonToJs = direction === 'json-to-js';
  const isTypeScript = options.variableDeclaration.startsWith('ts_');
  const targetLabel = isTypeScript ? 'TypeScript' : 'JavaScript';
  const leftLabel = isJsonToJs ? 'JSON' : targetLabel;
  const rightLabel = isJsonToJs ? targetLabel : 'JSON';
  const leftPlaceholder = isJsonToJs 
    ? 'Paste your JSON or upload a file...'
    : `Paste your ${targetLabel} or upload a file...`;

  return (
    <div id="converter-section" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4">
      {/* Main Side-by-Side Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-4 lg:gap-3">
        {/* LEFT CARD: JSON (or JS in reverse mode) */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative bg-zinc-900 rounded-2xl border ${
            isDragging ? 'border-[#F7DF1E] ring-2 ring-[#F7DF1E]/50' : 'border-zinc-800'
          } shadow-xs flex flex-col overflow-hidden transition-all duration-150 h-[580px] min-h-[580px] w-full`}
        >
          {/* Card Header: Plain 'JSON' title and pure icon-only buttons with no backgrounds or badges */}
          <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white tracking-wide">{leftLabel}</span>
            </div>

            {/* Icon-only Action Controls (No background, card, label, or badge) */}
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.js,application/json,text/plain"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-zinc-800/60"
                title="Upload file"
              >
                <Upload className="w-4 h-4" />
              </button>

              {isJsonToJs && (
                <>
                  <button
                    type="button"
                    onClick={handleFormatJson}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-zinc-800/60"
                    title="Beautify / Format JSON"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleMinifyJson}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-zinc-800/60"
                    title="Minify JSON (one line)"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer rounded-md hover:bg-zinc-800/60"
                title="Clear content"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drag & Drop Visual Overlay */}
          {isDragging && (
            <div className="absolute inset-0 z-20 bg-[#F7DF1E]/10 backdrop-blur-xs border-2 border-dashed border-[#F7DF1E] rounded-2xl flex flex-col items-center justify-center pointer-events-none">
              <Upload className="w-10 h-10 text-[#F7DF1E] animate-bounce mb-2" />
              <p className="text-sm font-semibold text-white">Drop your file here</p>
            </div>
          )}

          {/* Code Editor with Real Syntax Highlighting & Line Numbers */}
          <div className="flex-1 relative flex bg-zinc-950 overflow-hidden">
            <CodeEditor
              value={inputText}
              onChange={(val) => setInputText(val)}
              language={isJsonToJs ? 'json' : 'javascript'}
              placeholder={leftPlaceholder}
              showLineNumbers={true}
            />
          </div>

          {/* Clean Card Footer */}
          <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>{result.error ? <span className="text-red-400">{result.error}</span> : ''}</span>
            <span>
              {inputText ? inputText.split('\n').length : 0} lines, {inputText.length} chars
            </span>
          </div>
        </div>

        {/* MIDDLE: Switch Direction Button */}
        <div className="flex lg:flex-col items-center justify-center py-2 lg:py-0 gap-2">
          <button
            type="button"
            onClick={handleSwapDirection}
            className={`group relative flex items-center justify-center w-11 h-11 lg:w-12 lg:h-12 rounded-full ${
              isTypeScript
                ? 'bg-[#3178C6] hover:bg-[#2563eb] text-white'
                : 'bg-[#F7DF1E] hover:bg-[#ebd21a] text-zinc-950'
            } active:scale-95 shadow-md transition-all cursor-pointer`}
            title={isTypeScript ? 'Switch direction (JSON ↔ TypeScript)' : 'Switch direction (JSON ↔ JavaScript)'}
          >
            <ArrowLeftRight className={`w-5 h-5 transition-transform group-hover:scale-110 ${isConverting ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* RIGHT CARD: JavaScript or TypeScript */}
        <div className="relative bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xs flex flex-col overflow-hidden h-[580px] min-h-[580px] w-full">
          {/* Card Header: Plain title, clean icon-only copy button, and single Download button */}
          <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white tracking-wide">{rightLabel}</span>
            </div>

            {/* Action Buttons: Clean Ghost Copy Icon + Clean Download Button with text and icon */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyOutput}
                disabled={!result.output}
                className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer rounded-md hover:bg-zinc-800/60"
                title={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={!result.output}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed ${
                  isTypeScript
                    ? 'text-white bg-[#3178C6] hover:bg-[#2563eb]'
                    : 'text-zinc-950 bg-[#F7DF1E] hover:bg-[#ebd21a]'
                }`}
                title={isTypeScript ? 'Download .ts file' : 'Download .js file'}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {isJsonToJs ? (isTypeScript ? '.ts' : '.js') : '.json'}</span>
              </button>
            </div>
          </div>

          {/* Code Output Viewer with Real Syntax Highlighting */}
          <div className="flex-1 relative flex bg-zinc-950 overflow-hidden">
            {result.error && (
              <div className="absolute inset-0 bg-red-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                <p className="text-sm font-semibold text-red-200">Conversion Error</p>
                <p className="text-xs text-red-300 mt-1 max-w-sm font-mono">{result.error}</p>
              </div>
            )}

            <CodeViewer
              code={result.output}
              language={isJsonToJs ? (isTypeScript ? 'typescript' : 'javascript') : 'json'}
              placeholder={isTypeScript ? '// Converted TypeScript code will appear here...' : '// Converted code will appear here...'}
              showLineNumbers={true}
            />
          </div>

          {/* Clean Card Footer */}
          <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-500 font-mono flex items-center justify-between">
            <span>{result.stats?.keysConverted ? `${result.stats.keysConverted} keys` : ''}</span>
            <span>
              {result.output ? result.output.split('\n').length : 0} lines, {result.output ? result.output.length : 0} chars
            </span>
          </div>
        </div>
      </div>

      {/* ADVANCED DEVELOPER SETTINGS TOOLBAR */}
      <div className="mt-6 bg-zinc-900 rounded-xl border border-zinc-800 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-gray-300">
            {/* Format Selector */}
            {isJsonToJs && (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[11px]">Format:</span>
                  <select
                    value={options.variableDeclaration}
                    onChange={(e) => handleFormatChange(e.target.value as ConverterOptions['variableDeclaration'])}
                    className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-2.5 py-1.5 text-xs outline-hidden cursor-pointer"
                  >
                    <optgroup label="JavaScript Formats">
                      <option value="const">const data = &#123;...&#125;</option>
                      <option value="let">let data = &#123;...&#125;</option>
                      <option value="var">var data = &#123;...&#125;</option>
                      <option value="export_const">export const data = &#123;...&#125;</option>
                      <option value="export_default">export default &#123;...&#125;</option>
                      <option value="module_exports">module.exports = &#123;...&#125;</option>
                      <option value="object_freeze">Object.freeze(&#123;...&#125;)</option>
                      <option value="none">Raw Object &#123;...&#125;</option>
                    </optgroup>
                    <optgroup label="TypeScript Formats">
                      <option value="ts_as_const">TypeScript: const data = &#123;...&#125; as const</option>
                      <option value="ts_interface">TypeScript: interface &amp; const data</option>
                      <option value="ts_type">TypeScript: type &amp; const data</option>
                      <option value="ts_interface_only">TypeScript: interface definitions only</option>
                    </optgroup>
                  </select>
                </div>

                {options.variableDeclaration !== 'none' && options.variableDeclaration !== 'export_default' && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400 font-semibold uppercase tracking-wider text-[11px]">Var Name:</span>
                    <input
                      type="text"
                      value={options.variableName}
                      onChange={(e) => setOptions(prev => ({ ...prev, variableName: e.target.value }))}
                      placeholder="data"
                      className="w-20 bg-zinc-800 border border-zinc-700 text-white rounded-lg px-2 py-1.5 font-mono text-xs outline-hidden"
                    />
                  </div>
                )}

                {/* Quotes Style */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider text-[11px]">Quotes:</span>
                  <div className="inline-flex rounded-lg border border-zinc-700 bg-zinc-800 p-0.5">
                    <button
                      type="button"
                      onClick={() => setOptions(prev => ({ ...prev, quoteStyle: 'single' }))}
                      className={`px-2 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                        options.quoteStyle === 'single' ? 'bg-[#F7DF1E] text-zinc-950 font-bold shadow-2xs' : 'text-gray-400'
                      }`}
                    >
                      'Single'
                    </button>
                    <button
                      type="button"
                      onClick={() => setOptions(prev => ({ ...prev, quoteStyle: 'double' }))}
                      className={`px-2 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                        options.quoteStyle === 'double' ? 'bg-[#F7DF1E] text-zinc-950 font-bold shadow-2xs' : 'text-gray-400'
                      }`}
                    >
                      "Double"
                    </button>
                    <button
                      type="button"
                      onClick={() => setOptions(prev => ({ ...prev, quoteStyle: 'backtick' }))}
                      className={`px-2 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                        options.quoteStyle === 'backtick' ? 'bg-[#F7DF1E] text-zinc-950 font-bold shadow-2xs' : 'text-gray-400'
                      }`}
                    >
                      `Backtick`
                    </button>
                  </div>
                </div>

                {/* Unquote Keys */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.unquoteKeys}
                    onChange={(e) => setOptions(prev => ({ ...prev, unquoteKeys: e.target.checked }))}
                    className="w-3.5 h-3.5 accent-[#F7DF1E] rounded cursor-pointer"
                  />
                  <span>Unquote Keys</span>
                </label>

                {/* Trailing Commas */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.trailingCommas}
                    onChange={(e) => setOptions(prev => ({ ...prev, trailingCommas: e.target.checked }))}
                    className="w-3.5 h-3.5 accent-[#F7DF1E] rounded cursor-pointer"
                  />
                  <span>Trailing Commas</span>
                </label>

                {/* Semicolons */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.semicolon}
                    onChange={(e) => setOptions(prev => ({ ...prev, semicolon: e.target.checked }))}
                    className="w-3.5 h-3.5 accent-[#F7DF1E] rounded cursor-pointer"
                  />
                  <span>Semicolons</span>
                </label>

                {/* Sort Keys A-Z */}
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.sortKeys}
                    onChange={(e) => setOptions(prev => ({ ...prev, sortKeys: e.target.checked }))}
                    className="w-3.5 h-3.5 accent-[#F7DF1E] rounded cursor-pointer"
                  />
                  <span>Sort A-Z</span>
                </label>
              </>
            )}

            {/* Indent Size */}
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-[11px]">Indent:</span>
              <select
                value={options.indentSize}
                onChange={(e) => setOptions(prev => ({ ...prev, indentSize: e.target.value === 'tab' ? 'tab' : Number(e.target.value) as 0 | 2 | 4 }))}
                className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-2.5 py-1.5 text-xs outline-hidden cursor-pointer"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value="tab">Tabs</option>
                <option value={0}>Compact (1-line)</option>
              </select>
            </div>
          </div>

          {/* Random Sample Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleRandomSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-[#F7DF1E]/20 text-gray-200 border border-zinc-700 hover:border-[#F7DF1E] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#F7DF1E]" />
              <span>Random Sample</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
