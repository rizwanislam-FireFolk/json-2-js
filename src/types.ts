export interface ConverterOptions {
  variableDeclaration: 'none' | 'const' | 'let' | 'var' | 'export_const' | 'export_default' | 'module_exports' | 'ts_as_const' | 'object_freeze';
  variableName: string;
  quoteStyle: 'single' | 'double' | 'backtick';
  unquoteKeys: boolean;
  trailingCommas: boolean;
  indentSize: 2 | 4 | 'tab' | 0;
  semicolon: boolean;
  sortKeys: boolean;
  autoConvert: boolean;
}

export interface ConversionResult {
  success: boolean;
  output: string;
  error?: string;
  stats?: {
    inputLines: number;
    outputLines: number;
    inputBytes: number;
    outputBytes: number;
    keysConverted: number;
  };
}

export interface SampleItem {
  id: string;
  title: string;
  category: string;
  description: string;
  json: string;
}

export interface ComparisonExample {
  id: string;
  title: string;
  description: string;
  jsonCode: string;
  jsCode: string;
  features: string[];
}
