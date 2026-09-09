<div align="center">

# JSON to JavaScript Object Converter
### `json2.js.org`

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-green.svg)](https://json2.js.org/)

**Convert JSON files and text payloads into clean, idiomatic JavaScript object literals, ES6 modules, and constants with advanced configuration settings.**  
100% Free • Offline-First • Client-Side Only • No Hidden Fees

[**Live Demo**](https://json2.js.org/) • [**Report Bug**](https://github.com/your-username/json-to-js-converter/issues) • [**Request Feature**](https://github.com/your-username/json-to-js-converter/issues)

</div>

---

## 📖 Overview

**JSON to JavaScript Object Converter** is an open-source, client-side web utility tailored for modern frontend and full-stack developers. 

While JSON is a strict serialization standard requiring double-quoted keys and disallowing comments, trailing commas, or functions, modern JavaScript codebases benefit from clean, unquoted object literals, ES6 variable declarations, and TypeScript literal assertions (`as const`). This tool bridges that gap cleanly and privately right inside your browser.

---

## ✨ Key Features

- ⚡ **Zero-Latency In-Browser Conversion**: All AST parsing and formatting runs entirely in client-side memory.
- 🔒 **100% Private & Safe**: No data or payloads are ever uploaded to any backend server or third-party service.
- 🔄 **Bidirectional Transformation**:
  - **JSON ➔ JavaScript Object**: Strips redundant quotes on valid identifiers, supports ES6 export wrappers, TypeScript `as const`, single quotes, and trailing commas.
  - **JavaScript ➔ JSON**: Safely parses JavaScript object literals back into valid RFC 8259 JSON format.
- 🎨 **Real Syntax Highlighting**: Powered by PrismJS for JS, TS, and JSON token coloring (keywords, keys, strings, numbers, booleans, and operators).
- ⚙️ **Advanced Formatting Options**:
  - **Variable Wrappers**: `const`, `let`, `var`, `export const`, `export default`, `module.exports =`, `as const`, `Object.freeze()`, or raw object literals.
  - **Quote Types**: Single quotes (`'`), double quotes (`"`), or backticks (`` ` ``).
  - **Key Quote Handling**: Smart unquoting of valid identifiers while keeping reserved words (e.g. `class`, `default`) and special characters safely quoted.
  - **Indentation**: 2 spaces, 4 spaces, tabs, or compact/minified output.
  - **Key Sorting**: Alphabetical property sorting recursively across nested objects.
  - **Trailing Commas & Semicolons**: Clean formatting tailored for atomic Git diffs.
- 📱 **PWA & Offline Installation**: Installable as a lightweight desktop or mobile PWA that functions without an active internet connection.
- 📊 **SEO & Structured Data**: Pre-configured OpenGraph metadata, Twitter cards, and JSON-LD schema (`WebApplication`, `HowTo`, `FAQPage`).

---

## 🔍 Before & After Comparison

### Input JSON
```json
{
  "project": "json-to-js",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "tags": [
    "json",
    "javascript",
    "converter"
  ]
}
