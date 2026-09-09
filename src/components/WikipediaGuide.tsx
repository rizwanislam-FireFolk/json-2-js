import React from 'react';
import { POPULAR_CONVERSIONS } from '../data/samples';

export const WikipediaGuide: React.FC = () => {
  return (
    <article id="guide-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 text-zinc-300">
      <div className="space-y-12">
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight">
            What is JSON to JavaScript Object Conversion?
          </h2>
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
