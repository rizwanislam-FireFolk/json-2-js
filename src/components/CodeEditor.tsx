import React, { useMemo, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlightCode } from '../utils/highlighter';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'javascript' | 'json';
  placeholder?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  placeholder = 'Paste your code here...',
  showLineNumbers = true,
  className = '',
}) => {
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => {
    return value ? value.split('\n') : [''];
  }, [value]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <div className={`relative flex w-full h-full font-mono overflow-hidden bg-zinc-950 ${className}`}>
      {/* Line Numbers Column */}
      {showLineNumbers && (
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="select-none py-4 px-3 bg-zinc-950/90 border-r border-zinc-800/80 text-zinc-600 text-right min-w-[3rem] overflow-hidden font-mono text-[13px] leading-[24px]"
        >
          {lines.map((_, i) => (
            <div key={i} className="h-[24px] leading-[24px]">{i + 1}</div>
          ))}
        </div>
      )}

      {/* Editor Main Canvas */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 h-full overflow-auto relative custom-scrollbar bg-zinc-950"
      >
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={(code) => highlightCode(code, language)}
          placeholder={placeholder}
          padding={16}
          tabSize={2}
          insertSpaces={true}
          textareaClassName="editor-textarea-native"
          preClassName="editor-pre-native"
          className="min-h-full font-mono text-[13px] leading-[24px]"
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 13,
            lineHeight: '24px',
            minHeight: '100%',
            backgroundColor: 'transparent',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
};
