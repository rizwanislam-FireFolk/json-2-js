import React from 'react';
import { POPULAR_CONVERSIONS, POPULAR_TS_CONVERSIONS } from '../data/samples';
import { TargetLanguage } from '../types';

interface WikipediaGuideProps {
  targetLanguage?: TargetLanguage;
  onSelectLanguage?: (lang: TargetLanguage) => void;
}

export const WikipediaGuide: React.FC<WikipediaGuideProps> = ({
  targetLanguage = 'javascript',
  onSelectLanguage,
}) => {
  const isTs = targetLanguage === 'typescript';

  if (isTs) {
    return (
      <article id="guide-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 text-zinc-300">
        <div className="space-y-12">
          {/* Section 1: Overview */}
          <section className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
                What is JSON to TypeScript Conversion?
              </h2>
              <button
                type="button"
                onClick={() => onSelectLanguage?.('javascript')}
                className="text-xs text-[#3178C6] hover:text-[#5899e6] hover:underline cursor-pointer"
              >
                Switch to JSON to JavaScript Guide &rarr;
              </button>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              <strong className="text-zinc-100 font-medium">JSON (JavaScript Object Notation, RFC 8259)</strong> is an untyped text interchange standard. While ideal for transferring serializable payloads over HTTP, raw JSON provides zero static type safety, no compile-time contract enforcement, and no IDE auto-completion. Accessing properties on untyped JSON at runtime frequently causes uncaught runtime errors such as <code className="font-mono text-xs text-zinc-200">TypeError: Cannot read properties of undefined</code>.
            </p>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Converting JSON into <strong className="text-zinc-100 font-medium">TypeScript interfaces, type aliases, and typed constants</strong> transforms raw sample payloads into robust, statically verifiable contracts. TypeScript analyzes property keys, nested objects, and array structures to generate clean, idiomatic TypeScript definitions. Types are completely erased at compile time by the TypeScript compiler (<code className="font-mono text-xs text-zinc-200">tsc</code>), delivering 100% type safety and rich IDE IntelliSense with exactly zero runtime overhead.
            </p>
          </section>

          {/* Section 2: Key Differences Comparison Table */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
                JSON vs. TypeScript: Key Differences
              </h2>
              <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                Technical comparison between untyped JSON serialization and TypeScript static type contracts:
              </p>
            </div>

            <div className="overflow-x-auto border border-zinc-800/80 rounded-lg bg-zinc-900/40">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-200">
                    <th className="py-3 px-4 font-medium w-1/4">Feature</th>
                    <th className="py-3 px-4 font-medium w-3/8 text-zinc-300">JSON (RFC 8259)</th>
                    <th className="py-3 px-4 font-medium w-3/8 text-zinc-300">TypeScript (TS 5.x+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr className="hover:bg-zinc-800/20">
                    <td className="py-2.5 px-4 font-medium text-zinc-200">Type System</td>
                    <td className="py-2.5 px-4 text-zinc-400">Untyped text (dynamic evaluation at runtime)</td>
                    <td className="py-2.5 px-4 text-zinc-200">Static, structural type system verified at compile time</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20">
                    <td className="py-2.5 px-4 font-medium text-zinc-200">Type Definitions</td>
                    <td className="py-2.5 px-4 text-zinc-400">None; data is serialized string text</td>
                    <td className="py-2.5 px-4 text-zinc-200">Strongly typed <code className="font-mono text-xs text-zinc-100">interface</code>, <code className="font-mono text-xs text-zinc-100">type</code>, and generics</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20">
                    <td className="py-2.5 px-4 font-medium text-zinc-200">Immutability / Narrowing</td>
                    <td className="py-2.5 px-4 text-zinc-400">Mutable plain object after <code className="font-mono text-xs text-zinc-300">JSON.parse()</code></td>
                    <td className="py-2.5 px-4 text-zinc-200"><code className="font-mono text-xs text-zinc-100">readonly</code> fields and <code className="font-mono text-xs text-zinc-100">as const</code> literal narrowing</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20">
                    <td className="py-2.5 px-4 font-medium text-zinc-200">Optional &amp; Nullable Keys</td>
                    <td className="py-2.5 px-4 text-zinc-400">Requires explicit <code className="font-mono text-xs text-zinc-300">null</code> values in payload</td>
                    <td className="py-2.5 px-4 text-zinc-200">Optional properties (<code className="font-mono text-xs text-zinc-100">key?: string</code>) and union types (<code className="font-mono text-xs text-zinc-100">string | null</code>)</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20">
                    <td className="py-2.5 px-4 font-medium text-zinc-200">Complex Data Types</td>
                    <td className="py-2.5 px-4 text-zinc-400">6 basic types: string, number, bool, null, obj, arr</td>
                    <td className="py-2.5 px-4 text-zinc-200">Enums, tuples, discriminated unions, <code className="font-mono text-xs text-zinc-100">Record&lt;K,V&gt;</code>, <code className="font-mono text-xs text-zinc-100">unknown</code></td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20">
                    <td className="py-2.5 px-4 font-medium text-zinc-200">IDE IntelliSense</td>
                    <td className="py-2.5 px-4 text-zinc-400">None (plain strings or unvalidated properties)</td>
                    <td className="py-2.5 px-4 text-zinc-200">Full autocomplete, hover documentation, and safe refactoring</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20">
                    <td className="py-2.5 px-4 font-medium text-zinc-200">Runtime Bundle Cost</td>
                    <td className="py-2.5 px-4 text-zinc-400">Payload size + runtime <code className="font-mono text-xs text-zinc-300">JSON.parse()</code> parsing</td>
                    <td className="py-2.5 px-4 text-zinc-200">0 bytes (all interface/type declarations are erased at build time)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Advanced Transformation Mechanics */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              TypeScript Transformation Mechanics &amp; Details
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              <div>
                <h3 className="text-base font-medium text-zinc-100 mb-1">
                  1. Automatic Type Inference &amp; Sub-Interface Generation
                </h3>
                <p>
                  When converting a JSON document, the converter recursively inspects every key-value pair. Nested objects are cleanly extracted into dedicated PascalCase interfaces (for instance, a nested <code className="font-mono text-xs text-zinc-200">stats</code> object becomes <code className="font-mono text-xs text-zinc-200">export interface UserProfileStats</code>). This modular structure keeps your TypeScript codebase organized, reusable, and easy to export across modules.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-zinc-100 mb-1">
                  2. Interfaces vs. Type Aliases in Modern TypeScript
                </h3>
                <p>
                  TypeScript provides both <code className="font-mono text-xs text-zinc-200">interface</code> and <code className="font-mono text-xs text-zinc-200">type</code> keywords. Interfaces support declaration merging and object inheritance via <code className="font-mono text-xs text-zinc-200">extends</code>, making them ideal for public APIs, libraries, and component props. Type aliases excel at unions, primitives, and immutable tuple mappings. The converter gives you full flexibility to output either format.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-zinc-100 mb-1">
                  3. Deep Literal Narrowing with <code className="font-mono text-xs text-zinc-200">as const</code>
                </h3>
                <p>
                  By appending <code className="font-mono text-xs text-zinc-200">as const</code> (const assertions, introduced in TypeScript 3.4), TypeScript narrows every string property into its exact literal type rather than a wide <code className="font-mono text-xs text-zinc-200">string</code>, and marks all arrays as <code className="font-mono text-xs text-zinc-200">readonly</code> tuples. This allows you to maintain exact constant tables without declaring separate interface boilerplate.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-zinc-100 mb-1">
                  4. Strongly Typed Runtime Objects
                </h3>
                <p>
                  For configuration files, seeds, and test fixtures, you often need both the TypeScript type definition and the actual runtime JavaScript object value. Selecting <code className="font-mono text-xs text-zinc-200">TypeScript: interface &amp; const data</code> generates both in tandem: the interface declaration followed by <code className="font-mono text-xs text-zinc-200">export const data: DataType = &#123; ... &#125;;</code>, ensuring immediate compile-time type validation of your runtime constants.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Common Real-World TypeScript Use Cases */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              Common Real-World TypeScript Use Cases
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base text-zinc-300 list-disc list-inside leading-relaxed">
              <li>
                <strong className="text-zinc-100 font-medium">REST &amp; GraphQL API Client Typing:</strong> Paste sample API responses directly from Postman, curl, or browser DevTools to generate strongly typed DTOs and response interfaces for Axios, Fetch, TanStack Query, or Redux Toolkit Query.
              </li>
              <li>
                <strong className="text-zinc-100 font-medium">Unit Test Mocks &amp; MSW Fixtures:</strong> Create typed test fixtures for Vitest, Jest, Cypress, and Mock Service Worker handlers that stay synchronized with real backend payloads.
              </li>
              <li>
                <strong className="text-zinc-100 font-medium">Application State Models:</strong> Define typed initial states for Zustand stores, Redux slices, Pinia stores, or React Context providers from existing configuration JSON.
              </li>
              <li>
                <strong className="text-zinc-100 font-medium">Zod &amp; Validation Schema Blueprint:</strong> Use generated TypeScript interfaces as the design blueprint for schema validation libraries like Zod, Valibot, or Yup.
              </li>
            </ul>
          </section>

          {/* Section 5: TypeScript Conversion Options */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              TypeScript Conversion Options
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-zinc-300 list-disc list-inside leading-relaxed">
              <li>
                <strong className="text-zinc-100 font-medium">TypeScript: const data = &#123;...&#125; as const:</strong> Locks all property keys and values into deep readonly literal types without requiring separate interface definitions.
              </li>
              <li>
                <strong className="text-zinc-100 font-medium">TypeScript: interface &amp; const data:</strong> Generates modular PascalCase interfaces for the root and all nested objects, followed by a typed runtime export constant.
              </li>
              <li>
                <strong className="text-zinc-100 font-medium">TypeScript: type &amp; const data:</strong> Generates an <code className="font-mono text-xs text-zinc-200">export type</code> alias alongside the runtime object declaration.
              </li>
              <li>
                <strong className="text-zinc-100 font-medium">TypeScript: interface definitions only:</strong> Produces clean, pure TypeScript interface definitions ready to be copied into <code className="font-mono text-xs text-zinc-200">types.ts</code> or a <code className="font-mono text-xs text-zinc-200">.d.ts</code> ambient declaration file.
              </li>
            </ul>
          </section>

          {/* Section 6: Side-by-Side Example */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
                TypeScript Conversion Example
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                JSON payload transformed into strongly typed TypeScript interface and runtime constant:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* JSON Input */}
              <div className="border border-zinc-800 rounded-lg p-3.5 bg-zinc-900/60 space-y-2">
                <div className="text-xs font-sans font-medium text-zinc-400 uppercase tracking-wider">
                  JSON Input
                </div>
                <pre className="text-zinc-300 overflow-x-auto leading-relaxed">
{`{
  "id": "usr_99214",
  "username": "alex_dev",
  "isActive": true,
  "roles": ["admin", "developer"],
  "stats": {
    "projectsCount": 14,
    "rating": 4.9
  }
}`}
                </pre>
              </div>

              {/* TypeScript Output */}
              <div className="border border-zinc-800 rounded-lg p-3.5 bg-zinc-900/60 space-y-2">
                <div className="text-xs font-sans font-medium text-zinc-400 uppercase tracking-wider">
                  TypeScript Output
                </div>
                <pre className="text-zinc-200 overflow-x-auto leading-relaxed">
{`export interface UserProfileStats {
  projectsCount: number;
  rating: number;
}

export interface UserProfile {
  id: string;
  username: string;
  isActive: boolean;
  roles: string[];
  stats: UserProfileStats;
}

export const userProfile: UserProfile = {
  id: 'usr_99214',
  username: 'alex_dev',
  isActive: true,
  roles: [
    'admin',
    'developer',
  ],
  stats: {
    projectsCount: 14,
    rating: 4.9,
  },
};`}
                </pre>
              </div>
            </div>
          </section>

          {/* Section 7: Popular TypeScript Workflows */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              Popular TypeScript Workflows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {POPULAR_TS_CONVERSIONS.map((item) => (
                <div
                  key={item.label}
                  className="py-2 border-b border-zinc-800/80"
                >
                  <div className="font-medium text-zinc-200 text-xs sm:text-sm">
                    {item.label}
                  </div>
                  <div className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Frequently Asked Questions */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              Frequently Asked Questions (TypeScript)
            </h2>
            <div className="space-y-4 text-sm text-zinc-300">
              <div className="space-y-1">
                <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                  Should I use interface or type when converting JSON to TypeScript?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  In modern TypeScript, either can represent object shapes. However, <code className="font-mono text-xs text-zinc-200">interface</code> is recommended for API models and data payloads because interfaces support declaration merging, clear inheritance with <code className="font-mono text-xs text-zinc-200">extends</code>, and generate cleaner compiler error messages. If you need union types or primitive aliases, choose <code className="font-mono text-xs text-zinc-200">type</code>.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                  What is the difference between an interface and &apos;as const&apos;?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  An <code className="font-mono text-xs text-zinc-200">interface</code> is a static contract that defines what shape an object should satisfy. In contrast, <code className="font-mono text-xs text-zinc-200">as const</code> is a TypeScript assertion on an actual runtime object value that tells the compiler to infer the narrowest possible literal types and mark all properties as deeply readonly without needing a separate type definition.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                  Is my data secure when converting to TypeScript on json2.js.org?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  Yes, 100% secure. All JSON parsing and TypeScript interface inference runs entirely in your browser using local JavaScript memory. No data, payloads, or schemas are ever uploaded to any server or external API.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                  How does the converter handle nested objects and arrays?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  Nested objects are automatically discovered and split into separate PascalCase interfaces. Arrays of objects are typed with array notation (<code className="font-mono text-xs text-zinc-200">ItemType[]</code>), and arrays of mixed primitives are inferred as union types (<code className="font-mono text-xs text-zinc-200">(string | number)[]</code>).
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                  Can I download the generated TypeScript code as a .ts file?
                </h3>
                <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                  Yes. Whenever a TypeScript format is active, clicking the <strong>Download</strong> button in the output card saves the file with a <code className="font-mono text-xs text-zinc-200">.ts</code> extension and proper MIME type for direct inclusion in TypeScript projects.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    );
  }

  return (
    <article id="guide-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 text-zinc-300">
      <div className="space-y-12">
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              What is JSON to JavaScript Object Conversion?
            </h2>
            <button
              type="button"
              onClick={() => onSelectLanguage?.('typescript')}
              className="text-xs text-[#F7DF1E] hover:text-[#fae758] hover:underline cursor-pointer"
            >
              Need TypeScript Interfaces? Switch to JSON to TypeScript Guide &rarr;
            </button>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            <strong className="text-zinc-100 font-medium">JSON (JavaScript Object Notation, RFC 8259)</strong> is an open, language-agnostic data interchange format. While originally derived from early JavaScript object literal syntax, JSON is a strict serialization format: every property key must be enclosed in double quotes, strings only permit double quotes, trailing commas trigger fatal syntax errors, and identifiers, functions, or comments are strictly prohibited.
          </p>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Converting JSON into a <strong className="text-zinc-100 font-medium">native JavaScript object literal</strong> parses raw text payloads into in-memory data structures and formats them into modern ECMAScript standards (ES6+ and TypeScript). This produces clean, readable, and idiomatic JavaScript code ready to be embedded directly into source files, module exports, constant tables, config files, and test suites.
          </p>
        </section>

        {/* Section 2: Key Differences Comparison Table (Calm, neutral, non-flashy styling) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              JSON vs. JavaScript Object: Key Differences
            </h2>
            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
              Syntactical and behavioral differences between standardized JSON serialization and native ECMAScript object syntax:
            </p>
          </div>

          <div className="overflow-x-auto border border-zinc-800/80 rounded-lg bg-zinc-900/40">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-200">
                  <th className="py-3 px-4 font-medium w-1/4">Feature</th>
                  <th className="py-3 px-4 font-medium w-3/8 text-zinc-300">JSON (RFC 8259)</th>
                  <th className="py-3 px-4 font-medium w-3/8 text-zinc-300">JavaScript Object (ES6+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                <tr className="hover:bg-zinc-800/20">
                  <td className="py-2.5 px-4 font-medium text-zinc-200">Property Keys</td>
                  <td className="py-2.5 px-4 text-zinc-400">Must be wrapped in double quotes (<code className="font-mono text-xs text-zinc-300">&quot;key&quot;</code>)</td>
                  <td className="py-2.5 px-4 text-zinc-200">Quotes optional for valid identifiers (<code className="font-mono text-xs text-zinc-100">key</code>)</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="py-2.5 px-4 font-medium text-zinc-200">String Delimiters</td>
                  <td className="py-2.5 px-4 text-zinc-400">Double quotes only (<code className="font-mono text-xs text-zinc-300">&quot;hello&quot;</code>)</td>
                  <td className="py-2.5 px-4 text-zinc-200">Single (<code className="font-mono text-xs text-zinc-100">&apos;hello&apos;</code>), Double (<code className="font-mono text-xs text-zinc-100">&quot;hello&quot;</code>), or Backticks (<code className="font-mono text-xs text-zinc-100">`hello`</code>)</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="py-2.5 px-4 font-medium text-zinc-200">Trailing Commas</td>
                  <td className="py-2.5 px-4 text-zinc-400">Strictly disallowed (causes SyntaxError)</td>
                  <td className="py-2.5 px-4 text-zinc-200">Fully supported for clean git diffs</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="py-2.5 px-4 font-medium text-zinc-200">Comments</td>
                  <td className="py-2.5 px-4 text-zinc-400">Not supported</td>
                  <td className="py-2.5 px-4 text-zinc-200">Supported (<code className="font-mono text-xs text-zinc-100">// inline</code> and <code className="font-mono text-xs text-zinc-100">/* block */</code>)</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="py-2.5 px-4 font-medium text-zinc-200">Allowed Types</td>
                  <td className="py-2.5 px-4 text-zinc-400">string, number, boolean, null, object, array</td>
                  <td className="py-2.5 px-4 text-zinc-200">Any JS type (including functions, undefined, Symbol, BigInt)</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="py-2.5 px-4 font-medium text-zinc-200">Runtime Parsing</td>
                  <td className="py-2.5 px-4 text-zinc-400">Requires <code className="font-mono text-xs text-zinc-300">JSON.parse()</code> at runtime</td>
                  <td className="py-2.5 px-4 text-zinc-200">Parsed at compile/load time; zero execution overhead</td>
                </tr>
                <tr className="hover:bg-zinc-800/20">
                  <td className="py-2.5 px-4 font-medium text-zinc-200">TypeScript Support</td>
                  <td className="py-2.5 px-4 text-zinc-400">Requires external schema or schema casting</td>
                  <td className="py-2.5 px-4 text-zinc-200">Supports <code className="font-mono text-xs text-zinc-100">as const</code> for exact literal narrowing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Advanced Parsing & Transformation Mechanics */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
            Parsing &amp; Transformation Details
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
            <div>
              <h3 className="text-base font-medium text-zinc-100 mb-1">
                1. Identifier Unquoting &amp; Reserved Word Safety
              </h3>
              <p>
                Valid JavaScript identifiers (<code className="font-mono text-xs text-zinc-200">/^[a-zA-Z_$][a-zA-Z0-9_$]*$/</code>) have their quotes safely removed. Any key that conflicts with ECMAScript reserved keywords (such as <code className="font-mono text-xs text-zinc-200">class</code>, <code className="font-mono text-xs text-zinc-200">default</code>, <code className="font-mono text-xs text-zinc-200">import</code>) or contains hyphens or special symbols is automatically quoted to maintain strict syntactical correctness.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-zinc-100 mb-1">
                2. Trailing Commas &amp; Atomic Git Diffs
              </h3>
              <p>
                Standardized in ECMAScript 5 (ES5), trailing commas in multi-line objects prevent noisy line modifications in source control. When a new property is appended to an object, only the newly added line appears in the Git commit diff, avoiding accidental merge conflicts.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-zinc-100 mb-1">
                3. Zero-Runtime Parsing Overhead
              </h3>
              <p>
                Loading static data directly as JavaScript objects eliminates runtime <code className="font-mono text-xs text-zinc-200">JSON.parse()</code> calls and file read operations during application boot. In modern bundlers (Vite, esbuild, Webpack), native JS objects benefit from dead-code elimination, tree-shaking, and inline constant folding.
              </p>
            </div>

            <div>
              <h3 className="text-base font-medium text-zinc-100 mb-1">
                4. TypeScript Literal Narrowing (<code className="font-mono text-xs text-zinc-200">as const</code>)
              </h3>
              <p>
                By appending the <code className="font-mono text-xs text-zinc-200">as const</code> assertion, TypeScript locks the object&apos;s properties into deep readonly literals. String fields are typed as literal values instead of general strings, and arrays are treated as immutable tuples, providing total type safety without requiring manual type declarations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Common Use Cases (Simple, plain text list) */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
            Common Real-World Use Cases
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-base text-zinc-300 list-disc list-inside leading-relaxed">
            <li>
              <strong className="text-zinc-100 font-medium">Configuration Files:</strong> Convert API schemas or app settings directly into <code className="font-mono text-xs text-zinc-200">config.js</code>, <code className="font-mono text-xs text-zinc-200">tailwind.config.js</code>, or <code className="font-mono text-xs text-zinc-200">vite.config.ts</code> for direct programmatic imports.
            </li>
            <li>
              <strong className="text-zinc-100 font-medium">Mock Data &amp; Test Fixtures:</strong> Transform API response JSON into typed test fixtures for Vitest, Jest, Cypress, and Storybook stories without asynchronous filesystem dependencies.
            </li>
            <li>
              <strong className="text-zinc-100 font-medium">React Component Initial State:</strong> Paste JSON payloads directly into React component state initializers, Redux slices, or Zustand stores as idiomatic ES6 variables.
            </li>
            <li>
              <strong className="text-zinc-100 font-medium">TypeScript Constants Tables:</strong> Generate <code className="font-mono text-xs text-zinc-200">export const DATA = &#123;...&#125; as const;</code> definitions with strict readonly keys and full IntelliSense auto-completion.
            </li>
          </ul>
        </section>

        {/* Section 5: Core Conversion Options */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
            Conversion Options
          </h2>
          <ul className="space-y-2 text-sm sm:text-base text-zinc-300 list-disc list-inside leading-relaxed">
            <li>
              <strong className="text-zinc-100 font-medium">Variable Declaration:</strong> Wrap output with <code className="font-mono text-xs text-zinc-200">const</code>, <code className="font-mono text-xs text-zinc-200">let</code>, <code className="font-mono text-xs text-zinc-200">export const</code>, <code className="font-mono text-xs text-zinc-200">export default</code>, <code className="font-mono text-xs text-zinc-200">module.exports</code>, <code className="font-mono text-xs text-zinc-200">TypeScript as const</code>, <code className="font-mono text-xs text-zinc-200">Object.freeze()</code>, or output raw object literals.
            </li>
            <li>
              <strong className="text-zinc-100 font-medium">Quote Styles:</strong> Format string values with Single Quotes (<code className="font-mono text-xs text-zinc-200">&apos;...&apos;</code>), Double Quotes (<code className="font-mono text-xs text-zinc-200">&quot;...&quot;</code>), or Template Literals (<code className="font-mono text-xs text-zinc-200">`...`</code>).
            </li>
            <li>
              <strong className="text-zinc-100 font-medium">Key Sorting:</strong> Alphabetize object keys recursively across nested structures for predictable configuration diffs.
            </li>
            <li>
              <strong className="text-zinc-100 font-medium">Formatting:</strong> Configurable 2-space, 4-space, tab, or compact indentation, with optional trailing commas and semicolons.
            </li>
          </ul>
        </section>

        {/* Section 6: Simple Examples (Clean, plain UI without bloat) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
              Examples
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Side-by-side view of JSON payload converted into clean JavaScript object code:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* JSON Input */}
            <div className="border border-zinc-800 rounded-lg p-3.5 bg-zinc-900/60 space-y-2">
              <div className="text-xs font-sans font-medium text-zinc-400 uppercase tracking-wider">
                JSON Input
              </div>
              <pre className="text-zinc-300 overflow-x-auto leading-relaxed">
{`{
  "name": "Alex Mercer",
  "role": "Frontend Architect",
  "active": true,
  "skills": ["TypeScript", "React", "Node.js"],
  "stats": {
    "commits": 1420,
    "rating": 4.9
  }
}`}
              </pre>
            </div>

            {/* JavaScript Output */}
            <div className="border border-zinc-800 rounded-lg p-3.5 bg-zinc-900/60 space-y-2">
              <div className="text-xs font-sans font-medium text-zinc-400 uppercase tracking-wider">
                JavaScript Output
              </div>
              <pre className="text-zinc-200 overflow-x-auto leading-relaxed">
{`const userProfile = {
  name: 'Alex Mercer',
  role: 'Frontend Architect',
  active: true,
  skills: [
    'TypeScript',
    'React',
    'Node.js',
  ],
  stats: {
    commits: 1420,
    rating: 4.9,
  },
};`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 7: Popular Workflows (Simple plain text list) */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
            Popular Workflows
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {POPULAR_CONVERSIONS.map((item) => (
              <div
                key={item.label}
                className="py-2 border-b border-zinc-800/80"
              >
                <div className="font-medium text-zinc-200 text-xs sm:text-sm">
                  {item.label}
                </div>
                <div className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Frequently Asked Questions (Simple clean layout) */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-sm text-zinc-300">
            <div className="space-y-1">
              <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                Is my data secure when converting on json2.js.org?
              </h3>
              <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                Yes, completely. All parsing, transformation, and formatting occur 100% locally inside your web browser using JavaScript in-memory execution. No data is ever sent to any remote server or stored in any database.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                Why does JavaScript allow unquoted keys, but JSON does not?
              </h3>
              <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                JSON was designed strictly as a language-independent text exchange format and intentionally standardized on a simple grammar where all keys are strings. JavaScript object literals are part of ECMAScript syntax and permit any valid identifier name without quotes.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-zinc-100 text-sm sm:text-base">
                Can I convert JavaScript objects back into valid JSON?
              </h3>
              <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                Yes. Simply click the swap direction button (<code className="font-mono text-xs text-zinc-200">JSON ↔ JavaScript</code>) in the converter toolbar. The tool handles reverse transformation, stripping JS declarations and outputting strictly formatted JSON.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
