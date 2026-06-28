// Tool data shared between server (metadata) and client (UI) components
// No React components or client-side code here - pure data only

export interface ToolData {
  id: string;
  name: string;
  slug: string;
  description: string;
  metaDescription: string;
  metaTitle: string;
  keywords: string[];
  category: string;
  searchVolume: string;
  iconKey: string; // Lucide icon name for reference
}

export const toolsData: ToolData[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading & speaking time in real time.',
    metaTitle: 'Free Word Counter Tool - Count Words, Characters & Reading Time Online',
    metaDescription: 'Free online word counter. Instantly count words, characters (with/without spaces), sentences, paragraphs. Estimate reading time (200 WPM) and speaking time (130 WPM). No signup, no data sent to servers.',
    keywords: ['word counter', 'character counter', 'word count tool', 'character count', 'sentence counter', 'paragraph counter', 'reading time calculator', 'speaking time calculator', 'online word counter', 'free word counter'],
    category: 'Text',
    searchVolume: '550K/mo',
    iconKey: 'Type',
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator',
    description: 'Generate placeholder text for your designs and mockups with customizable paragraph count.',
    metaTitle: 'Free Lorem Ipsum Generator - Placeholder Text for Design & Mockups',
    metaDescription: 'Free Lorem Ipsum generator tool. Create realistic placeholder text for web design, mockups, and layouts. Customizable paragraph count (1-20). Classic Latin text with optional "Lorem ipsum dolor sit amet" opening. Instant copy to clipboard.',
    keywords: ['lorem ipsum generator', 'placeholder text generator', 'dummy text', 'filler text', 'lipsum generator', 'fake text generator', 'lorem ipsum text', 'placeholder text free'],
    category: 'Text',
    searchVolume: '368K/mo',
    iconKey: 'FileText',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, minify, and validate JSON data with syntax highlighting and customizable indentation.',
    metaTitle: 'Free JSON Formatter, Validator & Minifier - Beautify JSON Online',
    metaDescription: 'Free online JSON formatter, validator, and minifier. Beautify JSON with syntax highlighting (color-coded keys, strings, numbers). Custom indent options (2 spaces, 4 spaces, tab). Validate JSON instantly. No data sent to server.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json minifier', 'json pretty print', 'format json online', 'json viewer', 'json syntax check', 'validate json', 'beautify json'],
    category: 'Developer',
    searchVolume: '450K/mo',
    iconKey: 'Braces',
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    slug: 'case-converter',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more.',
    metaTitle: 'Free Case Converter - UPPERCASE, camelCase, snake_case & 11 More Formats',
    metaDescription: 'Free online case converter. Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and Toggle cASE. Instant conversion, one-click copy.',
    keywords: ['case converter', 'uppercase converter', 'lowercase converter', 'title case converter', 'camelcase converter', 'snake case converter', 'kebab case converter', 'text case changer', 'change text case', 'pascal case converter'],
    category: 'Text',
    searchVolume: '246K/mo',
    iconKey: 'CaseSensitive',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate secure, random passwords with customizable length, character types, and strength indicator.',
    metaTitle: 'Free Secure Password Generator - Strong Random Passwords Online',
    metaDescription: 'Free secure password generator. Create cryptographically strong random passwords with customizable length (8-128 characters), uppercase, lowercase, numbers, and symbols. Password strength indicator. Uses crypto.getRandomValues for security.',
    keywords: ['password generator', 'strong password generator', 'random password generator', 'secure password', 'free password generator', 'password maker', 'create strong password', 'password strength checker', 'cryptographic password'],
    category: 'Security',
    searchVolume: '823K/mo',
    iconKey: 'Key',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    slug: 'base64-encoder-decoder',
    description: 'Encode text to Base64 or decode Base64 back to text instantly. Supports Unicode characters.',
    metaTitle: 'Free Base64 Encoder & Decoder - Convert Text to Base64 Online',
    metaDescription: 'Free Base64 encoder and decoder online. Encode text to Base64 or decode Base64 back to text. Full Unicode support (emojis, special characters). Auto-convert on input. No data sent to server.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 encode', 'base64 decode', 'base64 converter', 'encode base64 online', 'decode base64 online', 'text to base64', 'base64 to text'],
    category: 'Developer',
    searchVolume: '201K/mo',
    iconKey: 'Binary',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    slug: 'url-encoder-decoder',
    description: 'Encode or decode URL components. Perfect for working with query parameters and special characters.',
    metaTitle: 'Free URL Encoder & Decoder - Encode/Decode URL Components Online',
    metaDescription: 'Free URL encoder and decoder online. Encode and decode URL components, query parameters, and special characters. Auto-convert on input. Supports encodeURIComponent and decodeURIComponent. No data sent to server.',
    keywords: ['url encoder', 'url decoder', 'encode url', 'decode url', 'url encoding online', 'percent encoding', 'urlencode online', 'urldecode online', 'url component encoder'],
    category: 'Developer',
    searchVolume: '165K/mo',
    iconKey: 'Link',
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Converter',
    slug: 'color-picker-converter',
    description: 'Pick colors and convert between HEX, RGB, HSL, and HSV formats. Includes alpha support.',
    metaTitle: 'Free Color Picker & Converter - HEX, RGB, HSL, HSV Online',
    metaDescription: 'Free online color picker and converter. Pick any color and convert between HEX, RGB, HSL, and HSV formats. RGB sliders, alpha/opacity support, random color generator. Copy any format to clipboard instantly.',
    keywords: ['color picker', 'color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'hsv converter', 'color tool online', 'hex color picker', 'rgb color picker', 'color format converter'],
    category: 'Design',
    searchVolume: '495K/mo',
    iconKey: 'Palette',
  },
];

// Lookup map: supports both id and slug
export const toolBySlug: Record<string, ToolData> = {};
toolsData.forEach((t) => {
  toolBySlug[t.slug] = t;
  toolBySlug[t.id] = t;
});

export const categories = ['All', ...Array.from(new Set(toolsData.map((t) => t.category)))];

export function getToolData(slugOrId: string): ToolData | undefined {
  return toolBySlug[slugOrId];
}

export function generateJsonLd(tool: ToolData, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.metaTitle,
    description: tool.metaDescription,
    url: `${baseUrl}/?tool=${tool.slug}`,
    applicationCategory: tool.category === 'Developer' ? 'DeveloperApplication' : 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.description,
  };
}

export function generateHomepageJsonLd(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'QuickTools',
    description: '8 free online tools for developers, designers, and content creators. Word counter, JSON formatter, password generator, and more.',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?tool={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}