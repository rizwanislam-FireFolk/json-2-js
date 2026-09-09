import { ConverterOptions, ConversionResult } from '../types';

const JS_RESERVED_WORDS = new Set([
  'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch',
  'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
  'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final',
  'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
  'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
  'null', 'package', 'private', 'protected', 'public', 'return', 'short',
  'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
  'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
  'with', 'yield'
]);

function isValidIdentifier(name: string): boolean {
  if (!name || JS_RESERVED_WORDS.has(name)) {
    return false;
  }
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
}

function escapeString(str: string, quoteStyle: 'single' | 'double' | 'backtick'): string {
  if (quoteStyle === 'single') {
    return `'${str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')}'`;
  } else if (quoteStyle === 'backtick') {
    return `\`${str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${')}\``;
  } else {
    return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')}"`;
  }
}

function formatValue(
  value: unknown,
  options: ConverterOptions,
  currentDepth: number,
  statsCounter: { keys: number }
): string {
  const isCompact = options.indentSize === 0;
  const indentChar = options.indentSize === 'tab' ? '\t' : ' '.repeat(typeof options.indentSize === 'number' ? options.indentSize : 2);
  const currentIndent = isCompact ? '' : indentChar.repeat(currentDepth);
  const nextIndent = isCompact ? '' : indentChar.repeat(currentDepth + 1);
  const newline = isCompact ? '' : '\n';
  const spaceAfterColon = isCompact ? '' : ' ';

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    return escapeString(value, options.quoteStyle);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }

    const items = value.map((item, index) => {
      const formatted = formatValue(item, options, currentDepth + 1, statsCounter);
      const isLast = index === value.length - 1;
      const comma = (!isLast || (options.trailingCommas && !isCompact)) ? ',' : '';
      return `${nextIndent}${formatted}${comma}`;
    });

    if (isCompact) {
      return `[${items.join(',')}]`;
    }
    return `[${newline}${items.join(newline)}${newline}${currentIndent}]`;
  }

  if (typeof value === 'object') {
    let keys = Object.keys(value as Record<string, unknown>);
    if (keys.length === 0) {
      return '{}';
    }

    if (options.sortKeys) {
      keys = [...keys].sort((a, b) => a.localeCompare(b));
    }

    const entries = keys.map((key, index) => {
      statsCounter.keys++;
      let keyFormatted = '';
      if (options.unquoteKeys && isValidIdentifier(key)) {
        keyFormatted = key;
      } else {
        keyFormatted = escapeString(key, options.quoteStyle);
      }

      const val = (value as Record<string, unknown>)[key];
      const valFormatted = formatValue(val, options, currentDepth + 1, statsCounter);
      const isLast = index === keys.length - 1;
      const comma = (!isLast || (options.trailingCommas && !isCompact)) ? ',' : '';

      return `${nextIndent}${keyFormatted}:${spaceAfterColon}${valFormatted}${comma}`;
    });

    if (isCompact) {
      return `{${entries.join(',')}}`;
    }
    return `{${newline}${entries.join(newline)}${newline}${currentIndent}}`;
  }

  return String(value);
}

export function convertJsonToJsObject(
  jsonText: string,
  options: ConverterOptions
): ConversionResult {
  const trimmed = jsonText.trim();
  if (!trimmed) {
    return {
      success: true,
      output: '',
      stats: {
        inputLines: 0,
        outputLines: 0,
        inputBytes: 0,
        outputBytes: 0,
        keysConverted: 0,
      },
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err: unknown) {
    try {
      const relaxed = Function('"use strict";return (' + trimmed + ')')();
      parsed = relaxed;
    } catch {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON input';
      return {
        success: false,
        output: '',
        error: errorMessage,
      };
    }
  }

  const statsCounter = { keys: 0 };
  const rawJsObj = formatValue(parsed, options, 0, statsCounter);

  const semi = options.semicolon ? ';' : '';
  const varName = options.variableName.trim() || 'data';
  let finalJs = rawJsObj;

  switch (options.variableDeclaration) {
    case 'const':
      finalJs = `const ${varName} = ${rawJsObj}${semi}`;
      break;
    case 'let':
      finalJs = `let ${varName} = ${rawJsObj}${semi}`;
      break;
    case 'var':
      finalJs = `var ${varName} = ${rawJsObj}${semi}`;
      break;
    case 'export_const':
      finalJs = `export const ${varName} = ${rawJsObj}${semi}`;
      break;
    case 'export_default':
      finalJs = `export default ${rawJsObj}${semi}`;
      break;
    case 'module_exports':
      finalJs = `module.exports = ${rawJsObj}${semi}`;
      break;
    case 'ts_as_const':
      finalJs = `export const ${varName} = ${rawJsObj} as const${semi}`;
      break;
    case 'object_freeze':
      finalJs = `export const ${varName} = Object.freeze(${rawJsObj})${semi}`;
      break;
    case 'none':
    default:
      finalJs = `${rawJsObj}${semi}`;
      break;
  }

  const inputLines = jsonText.split('\n').length;
  const outputLines = finalJs.split('\n').length;

  return {
    success: true,
    output: finalJs,
    stats: {
      inputLines,
      outputLines,
      inputBytes: new Blob([jsonText]).size,
      outputBytes: new Blob([finalJs]).size,
      keysConverted: statsCounter.keys,
    },
  };
}

export function convertJsToJson(
  jsText: string,
  indent: number | 'tab' = 2
): ConversionResult {
  const trimmed = jsText.trim();
  if (!trimmed) {
    return {
      success: true,
      output: '',
      stats: {
        inputLines: 0,
        outputLines: 0,
        inputBytes: 0,
        outputBytes: 0,
        keysConverted: 0,
      },
    };
  }

  // Strip variable declaration wrappers if present
  let cleanJs = trimmed;
  cleanJs = cleanJs.replace(/^(export\s+default|export\s+const\s+\w+\s*=|module\.exports\s*=|const\s+\w+\s*=|let\s+\w+\s*=|var\s+\w+\s*=)\s*/, '');
  cleanJs = cleanJs.replace(/\s+as\s+const\s*;?$/, '');
  cleanJs = cleanJs.replace(/^Object\.freeze\((.*)\)\s*;?$/s, '$1');
  cleanJs = cleanJs.replace(/;\s*$/, '');

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanJs);
  } catch {
    try {
      parsed = Function('"use strict";return (' + cleanJs + ')')();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JavaScript object expression';
      return {
        success: false,
        output: '',
        error: errorMessage,
      };
    }
  }

  try {
    const indentVal = indent === 'tab' ? '\t' : indent;
    const formatted = JSON.stringify(parsed, null, indentVal);
    return {
      success: true,
      output: formatted,
      stats: {
        inputLines: jsText.split('\n').length,
        outputLines: formatted.split('\n').length,
        inputBytes: new Blob([jsText]).size,
        outputBytes: new Blob([formatted]).size,
        keysConverted: typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 0,
      },
    };
  } catch (err: unknown) {
    return {
      success: false,
      output: '',
      error: err instanceof Error ? err.message : 'Failed to stringify to JSON',
    };
  }
}

export function formatJsonString(jsonText: string, indent: number | 'tab' = 2): { success: boolean; formatted: string; error?: string } {
  try {
    const parsed = JSON.parse(jsonText);
    const indentVal = indent === 'tab' ? '\t' : indent;
    return {
      success: true,
      formatted: JSON.stringify(parsed, null, indentVal),
    };
  } catch (err: unknown) {
    return {
      success: false,
      formatted: jsonText,
      error: err instanceof Error ? err.message : 'Invalid JSON',
    };
  }
}

export function minifyJsonString(jsonText: string): { success: boolean; minified: string; error?: string } {
  try {
    const parsed = JSON.parse(jsonText);
    return {
      success: true,
      minified: JSON.stringify(parsed),
    };
  } catch (err: unknown) {
    return {
      success: false,
      minified: jsonText,
      error: err instanceof Error ? err.message : 'Invalid JSON',
    };
  }
}
