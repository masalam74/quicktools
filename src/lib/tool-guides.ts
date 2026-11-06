// Plain-language guides for the existing QuickTools utilities.
// These describe the implementation; they are not guarantees of search indexing.
export interface ToolGuide {
  title: string;
  intro: string;
  details: [string, string][];
  faq: [string, string][];
}

export const toolGuides: Record<string, ToolGuide> = {
  "lorem-ipsum": {
    "title": "How to generate Lorem Ipsum placeholder text",
    "intro": "Choose a paragraph count, decide whether to begin with the traditional Lorem Ipsum opening, and click Generate. You can regenerate a new sample or copy the result into a mockup, presentation, or layout.",
    "details": [
      [
        "Paragraph count",
        "Control how many paragraphs appear, useful for checking different text lengths in a design."
      ],
      [
        "Opening phrase",
        "Choose whether the first paragraph begins with the familiar Lorem ipsum dolor sit amet wording."
      ],
      [
        "Generated variation",
        "Paragraphs are assembled from placeholder words and vary between generations. The text is for layout testing, not meaningful translation."
      ]
    ],
    "faq": [
      [
        "What is Lorem Ipsum used for?",
        "Designers use placeholder text to check spacing, typography, and layout before final copy is available."
      ],
      [
        "Will generating again produce identical text?",
        "Generally no. The generator randomly composes sentences, so a new result can differ."
      ],
      [
        "Can I publish Lorem Ipsum as my final website copy?",
        "It is better to replace placeholder text with useful, relevant content before publishing a public page."
      ]
    ]
  },
  "json-formatter": {
    "title": "How to format, validate, and minify JSON",
    "intro": "Paste a JSON document into the input area, then choose Format, Minify, or Validate. Format adds readable indentation, Minify removes unnecessary formatting whitespace, and Validate checks whether the input can be parsed.",
    "details": [
      [
        "Format",
        "Choose two spaces, four spaces, or tabs for indentation, then format the parsed JSON."
      ],
      [
        "Minify",
        "Compact valid JSON for storage or transmission without changing the parsed data structure."
      ],
      [
        "Validate",
        "Check syntax such as double-quoted keys, matching brackets, commas, and supported JSON value types."
      ]
    ],
    "faq": [
      [
        "Why does my JSON show an error?",
        "Common causes include trailing commas, single-quoted keys or strings, comments, or missing closing braces. Strict JSON syntax differs from JavaScript object syntax."
      ],
      [
        "Does formatting change the values?",
        "Formatting preserves the JSON data after parsing, although the textual layout and spacing change."
      ],
      [
        "Can this tool format JavaScript objects?",
        "Only valid JSON input is supported. JavaScript-specific features such as comments and undefined values are not valid JSON."
      ]
    ]
  },
  "case-converter": {
    "title": "How to convert text between letter cases",
    "intro": "Enter or paste text, choose a conversion style, and copy the result. Case conversion can help with headings, identifiers, file names, and content editing.",
    "details": [
      [
        "Readable text",
        "Use uppercase, lowercase, title case, or sentence case for common writing and editing tasks."
      ],
      [
        "Programming identifiers",
        "Use camelCase, PascalCase, snake_case, or kebab-case when a project uses a particular naming convention."
      ],
      [
        "Check the output",
        "Capitalization rules vary by language and publication style; review names, acronyms, and punctuation after conversion."
      ]
    ],
    "faq": [
      [
        "What is the difference between camelCase and PascalCase?",
        "camelCase starts with a lowercase word, such as sampleText; PascalCase capitalizes the first word too, as in SampleText."
      ],
      [
        "When is snake_case useful?",
        "snake_case separates words with underscores and is common in some programming languages and data fields."
      ],
      [
        "Does title case follow every editorial style guide?",
        "No. Different style guides apply different rules to articles, prepositions, proper nouns, and acronyms."
      ]
    ]
  },
  "password-generator": {
    "title": "How to create a strong random password",
    "intro": "Choose your password length and character types, then generate a password. This tool uses the browser's cryptographic random-number API to produce candidate passwords locally.",
    "details": [
      [
        "Length",
        "Longer, unique passwords are generally harder to guess. Choose a length compatible with the account's requirements."
      ],
      [
        "Character options",
        "Include uppercase letters, lowercase letters, digits, and symbols when the service permits them."
      ],
      [
        "Safe storage",
        "Save unique passwords in a reputable password manager rather than reusing the same password across accounts."
      ]
    ],
    "faq": [
      [
        "Are generated passwords sent to a server?",
        "The password-generation code runs in your browser using crypto.getRandomValues. As with any website, consider your device and browser security."
      ],
      [
        "Is the strength indicator a guarantee?",
        "No. It provides an estimate based on length and character variety, not a complete security audit."
      ],
      [
        "Can I use the same generated password for multiple accounts?",
        "Unique passwords for each account reduce the risk that a breach at one service affects others."
      ]
    ]
  },
  "base64": {
    "title": "How to encode or decode Base64 text",
    "intro": "Choose Encode to transform readable text into Base64, or Decode to convert a valid Base64 string back to readable text. The tool supports text containing Unicode characters.",
    "details": [
      [
        "Encoding example",
        "The text hi becomes aGk= in Base64."
      ],
      [
        "Decoding",
        "Paste an encoded string and select Decode. Invalid input displays an error rather than a meaningful result."
      ],
      [
        "Common uses",
        "Base64 is used to represent data in text-oriented formats and APIs. It increases length and does not protect confidentiality."
      ]
    ],
    "faq": [
      [
        "Is Base64 encryption?",
        "No. Anyone can decode Base64 without a password or key. Do not use it to hide confidential information."
      ],
      [
        "Why does Decode say Invalid Base64?",
        "Plain text, missing or corrupted characters, or invalid encoding can prevent decoding. Try encoding text first and decoding the result."
      ],
      [
        "Can I encode emoji or accented characters?",
        "Yes. The converter handles Unicode text through UTF-8-aware transformations."
      ]
    ]
  },
  "url-encoder": {
    "title": "How to encode and decode URL components",
    "intro": "Choose Encode to convert text into a form suitable for use as a URL component, or Decode to interpret percent-encoded text. This tool uses encodeURIComponent and decodeURIComponent.",
    "details": [
      [
        "Encoding example",
        "A space becomes %20; an ampersand becomes %26, helping preserve characters in a URL parameter value."
      ],
      [
        "URL components",
        "Encode individual values such as search terms or query parameter values, not an entire URL when you want its slashes and separators to stay intact."
      ],
      [
        "Decoding",
        "Paste percent-encoded text and select Decode. Malformed percent sequences can produce an error."
      ]
    ],
    "faq": [
      [
        "Why does a space turn into %20?",
        "Percent encoding represents characters that need special treatment in a URL component."
      ],
      [
        "Can I paste a complete website address into Encode?",
        "You can, but the function also encodes URL delimiters. It is intended for individual components rather than complete URLs."
      ],
      [
        "Does this tool convert plus signs to spaces?",
        "No. It uses decodeURIComponent; plus-to-space conversion used by form encoding is a separate convention."
      ]
    ]
  },
  "color-picker": {
    "title": "How to choose and convert digital colours",
    "intro": "Choose a colour with the picker or enter a supported HEX value. The tool shows corresponding colour codes and lets you copy values for your design or stylesheet.",
    "details": [
      [
        "HEX",
        "HEX codes represent red, green, and blue colour channels; for example, #FFFFFF is white."
      ],
      [
        "RGB, HSL and HSV",
        "RGB uses numeric colour channels, while HSL and HSV describe colour through hue and related properties."
      ],
      [
        "Transparency",
        "Adjust alpha when you need a translucent colour. Review the resulting HEX alpha or RGBA and HSLA values for your target platform."
      ]
    ],
    "faq": [
      [
        "What is the difference between HEX and RGB?",
        "They are different notations for colour information; both can represent the same opaque RGB colour."
      ],
      [
        "Can I enter a three-digit HEX colour?",
        "Yes. The converter supports common three-digit and six-digit HEX formats."
      ],
      [
        "Will the same colour look identical on every screen?",
        "Not necessarily. Display calibration, colour profiles, brightness, and surrounding colours can affect appearance."
      ]
    ]
  }
};
