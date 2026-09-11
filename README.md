<div align="center">

# JSON to JavaScript & TypeScript Converter

> **json2.js.org** — Convert JSON payloads into clean, idiomatic JavaScript object literals, TypeScript interfaces, types, and ES6 modules.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline%20Ready-green.svg)](https://json2.js.org/)

100% Free • Offline-First • Client-Side Only • Zero Latency

[Live Demo](https://json2.js.org/) | [Report Bug](https://github.com/your-username/json-to-js-converter/issues) | [Request Feature](https://github.com/your-username/json-to-js-converter/issues)

---

## Overview

JSON to JavaScript & TypeScript Converter is an open-source, client-side web utility built for modern frontend and full-stack developers.

While standard JSON requires strict double-quoted keys and forbids trailing commas, comments, or types, modern JS/TS codebases rely on unquoted object keys, typed interfaces, and literal assertions (`as const`). This utility performs all AST parsing and formatting entirely in your browser memory without sending data to an external server.

---

## Key Features

* **Zero-Latency Processing**: In-browser AST parsing, type inference, and syntax formatting.
* **100% Private**: Zero analytics, zero backend requests, fully client-side.
* **JavaScript & TypeScript Generation**:
  * **JSON to JS Object**: Strips unnecessary key quotes, adds ES6 module exports, single quotes, and trailing commas.
  * **JSON to TypeScript Types**: Infers clean `interface` or `type` structures automatically.
  * **JS to JSON**: Parses JavaScript object literals back to standard RFC 8259 JSON.
* **Syntax Highlighting**: PrismJS tokenization for JavaScript, TypeScript, and JSON formatting.
* **Formatting Controls**:
  * **Wrappers**: `const`, `let`, `var`, `export const`, `export default`, `interface`, `type`, `as const`, or raw objects.
  * **Quotes & Spacing**: Single quotes, double quotes, backticks, 2/4 spaces, or tab indentation.
  * **Key Utilities**: Automatic property sorting and clean trailing comma management for Git diffs.
* **PWA Enabled**: Installable locally for full offline usage.

---
