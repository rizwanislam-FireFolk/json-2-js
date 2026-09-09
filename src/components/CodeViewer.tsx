import React, { useMemo } from 'react';
import { highlightCode } from '../utils/highlighter';

interface CodeViewerProps {
  code: string;
  language: 'javascript' | 'json' | 'typescript';
  showLineNumbers?: boolean;
  placeholder?: string;
  className?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language,
  showLineNumbers = true,
  placeholder = '// No code to display',
  className = '',
}) => {
  const lines = useMemo(() => {
    if (!code) return [];
    return code.split('\n');
  }, [code]);

  const highlightedHtml = useMemo(() => {
    if (!code) return '';
    return highlightCode(code, language);
  }, [code, language]);

  if (!code) {
    return (
      <div className={`w-full h-full flex items-center justify-center p-6 text-zinc-600 font-mono text-xs sm:text-sm ${className}`}>
        {placeholder}
      </div>
    );
  }

  return (
    <div className={`relative flex w-full h-full font-mono text-[13px] overflow-hidden bg-zinc-950 ${className}`}>
      {/* Line Numbers Column */}
      {showLineNumbers && (
        <div 
          aria-hidden="true" 
          className="select-none py-4 px-3 bg-zinc-950/90 border-r border-zinc-800/80 text-zinc-600 text-right min-w-[3rem] font-mono text-[13px] leading-[24px]"
        >
          {lines.map((_, i) => (
            <div key={i} className="h-[24px] leading-[24px]">{i + 1}</div>
          ))}
        </div>
      )}

      {/* Code Area */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-zinc-950 select-text">
        <pre 
          className="m-0 font-mono text-[13px] leading-[24px] text-zinc-100 selection:bg-[#F7DF1E]/30 selection:text-white"
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            lineHeight: '24px',
            fontSize: '13px'
          }}
        >
          <code 
            className={`language-${language} font-mono`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }} 
          />
        </pre>
      </div>
    </div>
  );
};
