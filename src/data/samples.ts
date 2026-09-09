import { SampleItem, ComparisonExample } from '../types';

export const SAMPLE_JSONS: SampleItem[] = [
  {
    id: 'user-profile',
    title: 'User Profile & Settings',
    category: 'User Data',
    description: 'A standard user account schema with nested preferences and roles.',
    json: JSON.stringify(
      {
        id: "usr_99214",
        username: "alex_dev",
        fullName: "Alex Rivera",
        email: "alex.rivera@example.com",
        isActive: true,
        role: "admin",
        stats: {
          projectsCount: 14,
          followers: 1240,
          reputationScore: 98.6
        },
        preferences: {
          theme: "dark",
          notifications: {
            email: true,
            push: false,
            frequency: "weekly"
          },
          languages: ["en", "es", "ja"]
        }
      },
      null,
      2
    )
  },
  {
    id: 'product-catalog',
    title: 'E-commerce Product Item',
    category: 'E-Commerce',
    description: 'Product listing with variants, pricing, inventory, and tags.',
    json: JSON.stringify(
      {
        sku: "PROD-HEADPHONE-X1",
        name: "Wireless Noise-Canceling Headphones",
        price: 199.99,
        currency: "USD",
        inStock: true,
        inventoryCount: 42,
        ratings: {
          average: 4.8,
          totalReviews: 350
        },
        tags: ["audio", "bluetooth-5.3", "active-noise-cancelling"],
        dimensions: {
          weightGrams: 250,
          foldable: true
        }
      },
      null,
      2
    )
  },
  {
    id: 'api-response',
    title: 'Paginated API Response',
    category: 'API Data',
    description: 'RESTful API paginated envelope with meta information and records.',
    json: JSON.stringify(
      {
        status: 200,
        message: "Resource fetched successfully",
        pagination: {
          currentPage: 1,
          perPage: 3,
          totalPages: 10,
          totalRecords: 30
        },
        data: [
          { id: 101, title: "Mastering TypeScript", status: "published" },
          { id: 102, title: "Next-Gen React Patterns", status: "draft" },
          { id: 103, title: "Zero-Config Vite Build", status: "archived" }
        ]
      },
      null,
      2
    )
  },
  {
    id: 'app-config',
    title: 'Application Configuration',
    category: 'DevOps & Config',
    description: 'Application environment variables, endpoints, and feature toggles.',
    json: JSON.stringify(
      {
        appName: "CloudScale Engine",
        version: "3.4.0",
        environment: "production",
        debugMode: false,
        apiEndpoints: {
          auth: "https://auth.example.io/v1",
          telemetry: "https://analytics.example.io/collector",
          cdn: "https://assets.example.io/static"
        },
        rateLimiting: {
          enabled: true,
          maxRequestsPerMinute: 1200
        },
        features: {
          betaDashboard: true,
          vectorSearch: false,
          twoFactorRequired: true
        }
      },
      null,
      2
    )
  }
];

export const COMPARISON_EXAMPLES: ComparisonExample[] = [
  {
    id: 'basic-obj',
    title: 'Basic User Object Example',
    description: 'Notice how JSON requires double quotes around every key and string, whereas JavaScript allows clean unquoted identifiers and single quotes.',
    jsonCode: `{
  "id": 1001,
  "name": "Sarah Connor",
  "email": "sarah@cyberdyne.org",
  "verified": true,
  "age": 34
}`,
    jsCode: `const user = {
  id: 1001,
  name: 'Sarah Connor',
  email: 'sarah@cyberdyne.org',
  verified: true,
  age: 34,
};`,
    features: ['Unquoted object keys', 'Single quote string literals', 'ES6 const assignment', 'Trailing comma support']
  },
  {
    id: 'ts-const',
    title: 'TypeScript "as const" Literal Types',
    description: 'Narrows wide primitive types to literal types and marks all nested arrays/objects as deeply readonly for maximum compile-time safety.',
    jsonCode: `{
  "endpoints": [
    "users",
    "billing",
    "webhooks"
  ],
  "defaultRole": "member",
  "cacheDurationSeconds": 300
}`,
    jsCode: `export const ROUTES = {
  endpoints: [
    'users',
    'billing',
    'webhooks',
  ],
  defaultRole: 'member',
  cacheDurationSeconds: 300,
} as const;`,
    features: ['as const assertion', 'Readonly tuple inference', 'Strict literal types', 'No runtime overhead']
  },
  {
    id: 'special-keys',
    title: 'Reserved Keywords & Hyphenated Keys',
    description: 'Keys that contain hyphens or ECMAScript reserved keywords (like "content-type", "class", "delete") are quoted safely while valid identifiers are cleanly unquoted.',
    jsonCode: `{
  "content-type": "application/json",
  "authorization": "Bearer eyJhbGciOi...",
  "x-request-id": "req-9942",
  "class": "internal",
  "default": true
}`,
    jsCode: `export const headers = {
  'content-type': 'application/json',
  authorization: 'Bearer eyJhbGciOi...',
  'x-request-id': 'req-9942',
  'class': 'internal',
  'default': true,
};`,
    features: ['Safe keyword escaping', 'Hyphenated key support', 'Valid identifier unquoting', 'Prettier-compatible']
  },
  {
    id: 'nested-config',
    title: 'Nested Config with Array Example',
    description: 'JavaScript object literals are directly embeddable in code, test files, config files, and React component props without needing JSON.parse().',
    jsonCode: `{
  "server": "api.cloud.internal",
  "port": 8080,
  "ssl": true,
  "allowedOrigins": [
    "https://app.example.com",
    "https://admin.example.com"
  ],
  "retryAttempts": 3
}`,
    jsCode: `export const config = {
  server: 'api.cloud.internal',
  port: 8080,
  ssl: true,
  allowedOrigins: [
    'https://app.example.com',
    'https://admin.example.com',
  ],
  retryAttempts: 3,
};`,
    features: ['export const syntax', 'Clean array formatting', 'Readable developer syntax', 'Type inference in TypeScript']
  }
];

export const POPULAR_CONVERSIONS = [
  { label: 'JSON to JS Object', desc: 'Raw object literal { ... }' },
  { label: 'JSON to const data = {}', desc: 'ES6 Variable assignment' },
  { label: 'JSON to export const', desc: 'Named module export' },
  { label: 'JSON to export default', desc: 'Default ES module export' },
  { label: 'JSON to module.exports', desc: 'CommonJS / Node.js format' },
  { label: 'JSON to Single Quote JS', desc: 'Clean unquoted keys with single quotes' },
  { label: 'JSON with Trailing Commas', desc: 'Prettier & Git-friendly diff format' },
  { label: 'JSON File to .js Module', desc: 'Upload .json and download .js file' },
];
