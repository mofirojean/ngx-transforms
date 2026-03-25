/**
 * Represents the structure of a pipe documentation entry.
 */
export interface Pipe {
  name: string;
  url: string;
  description: string;
  /** ISO date string (YYYY-MM-DD) when the pipe was added. Used to show a "New" badge for 2 weeks. */
  addedOn?: string;
}

export interface PipeCategory {
  name: string;
  pipes: Pipe[];
}

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Returns true if the pipe was added within the last 2 weeks. */
export function isNewPipe(pipe: Pipe): boolean {
  if (!pipe.addedOn) return false;
  const addedDate = new Date(pipe.addedOn).getTime();
  return Date.now() - addedDate < ONE_WEEK_MS;
}

export const PIPE_CATEGORIES: PipeCategory[] = [
  {
    name: 'Text',
    pipes: [
      { name: "ASCII Art", url: "/docs/pipes/ascii-art", description: "Transform text into stunning ASCII art banners with customizable styles." },
      { name: "Highlight", url: "/docs/pipes/highlight", description: "Highlight search terms within text with styled spans." },
      { name: "Initials", url: "/docs/pipes/initials", description: "Extracts initials from a given name." },
      { name: "Morse Code", url: "/docs/pipes/morse-code", description: "Converts a string into Morse code." },
      { name: "Replace", url: "/docs/pipes/replace", description: "A pipe to replace parts of a string." },
      { name: "Text Transform", url: "/docs/pipes/text-transform", description: "Transform text to camelCase, snake_case, kebab-case, or Title Case." },
      { name: "Truncate", url: "/docs/pipes/truncate", description: "Truncates strings to a specified length with configurable ellipsis and word preservation." },
    ],
  },
  {
    name: 'Security & Privacy',
    pipes: [
      { name: "Credit Card Mask", url: "/docs/pipes/credit-card-mask", description: "Mask credit card numbers showing only last 4 digits." },
      { name: "Email Mask", url: "/docs/pipes/email-mask", description: "Mask email addresses while preserving first and last characters." },
      { name: "HTML Escape", url: "/docs/pipes/html-escape", description: "Escapes special HTML characters to their entity equivalents for safe display." },
      { name: "HTML Sanitize", url: "/docs/pipes/html-sanitize", description: "Sanitizes HTML input to remove unsafe elements while preserving safe content." },
      { name: "IP Address Mask", url: "/docs/pipes/ip-address-mask", description: "Mask the last two octets of IPv4 addresses for privacy." },
    ],
  },
  {
    name: 'Media & Visual',
    pipes: [
      { name: "Barcode", url: "/docs/pipes/barcode", description: "Generates various types of barcodes." },
      { name: "Color Convert", url: "/docs/pipes/color-convert", description: "Convert colors between HEX, RGB, and RGBA formats." },
      { name: "Gravatar", url: "/docs/pipes/gravatar", description: "Generate a gravatar from an email address." },
      { name: "QR Code", url: "/docs/pipes/qrcode", description: "Generates a QR code from a string." },
    ],
  },
  {
    name: 'Data & Utility',
    pipes: [
      { name: "Count", url: "/docs/pipes/count", description: "Returns the length of an array or string." },
      { name: "Device Type", url: "/docs/pipes/device-type", description: "Detects device type (mobile, tablet, desktop) from user agent strings." },
      { name: "JSON Pretty", url: "/docs/pipes/json-pretty", description: "Formats JSON with syntax highlighting." },
      { name: "Text to Speech", url: "/docs/pipes/text-to-speech", description: "Converts text to speech using the Web Speech API with configurable language." },
      { name: "Time Ago", url: "/docs/pipes/time-ago", description: "Converts dates into localized relative time strings using Intl.RelativeTimeFormat.", addedOn: "2026-03-17" },
    ],
  },
  {
    name: 'Array',
    pipes: [
      { name: "Flatten", url: "/docs/pipes/flatten", description: "Flattens nested arrays to a specified depth.", addedOn: "2026-03-19" },
      { name: "Initial", url: "/docs/pipes/initial", description: "Returns all elements except the last n.", addedOn: "2026-03-23" },
      { name: "Reverse", url: "/docs/pipes/reverse", description: "Reverses the characters in a string or the elements in an array.", addedOn: "2026-03-18" },
      { name: "Sample", url: "/docs/pipes/sample", description: "Randomly picks n items from an array without duplicates.", addedOn: "2026-03-25" },
      { name: "Shuffle", url: "/docs/pipes/shuffle", description: "Randomly reorders array elements using the Fisher-Yates algorithm.", addedOn: "2026-03-22" },
      { name: "Tail", url: "/docs/pipes/tail", description: "Returns all elements except the first n.", addedOn: "2026-03-24" },
      { name: "Truthify", url: "/docs/pipes/truthify", description: "Removes all falsy values from arrays.", addedOn: "2026-03-21" },
      { name: "Unique", url: "/docs/pipes/unique", description: "Removes duplicates from arrays with support for nested object keys.", addedOn: "2026-03-20" },
    ],
  },
];

/** Flat list of all pipes (for backward compatibility). */
export const PIPES: Pipe[] = PIPE_CATEGORIES.flatMap(c => c.pipes);
