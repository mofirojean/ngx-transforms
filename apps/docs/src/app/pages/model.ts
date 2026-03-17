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

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

/** Returns true if the pipe was added within the last 2 weeks. */
export function isNewPipe(pipe: Pipe): boolean {
  if (!pipe.addedOn) return false;
  const addedDate = new Date(pipe.addedOn).getTime();
  return Date.now() - addedDate < TWO_WEEKS_MS;
}

export const PIPES: Pipe[] = [
  {
    name: "ASCII Art",
    url: "/docs/pipes/ascii-art",
    description: "Transform text into stunning ASCII art banners with customizable styles.",
  },
  {
    name: "Barcode",
    url: "/docs/pipes/barcode",
    description: "Generates various types of barcodes.",
  },
  {
    name: "Color Convert",
    url: "/docs/pipes/color-convert",
    description: "Convert colors between HEX, RGB, and RGBA formats.",
  },
  {
    name: "Count",
    url: "/docs/pipes/count",
    description: "Returns the length of an array or string.",
  },
  {
    name: "Credit Card Mask",
    url: "/docs/pipes/credit-card-mask",
    description: "Mask credit card numbers showing only last 4 digits.",
  },
  {
    name: "Device Type",
    url: "/docs/pipes/device-type",
    description: "Detects device type (mobile, tablet, desktop) from user agent strings.",
  },
  {
    name: "Email Mask",
    url: "/docs/pipes/email-mask",
    description: "Mask email addresses while preserving first and last characters.",
  },
  {
    name: "Gravatar",
    url: "/docs/pipes/gravatar",
    description: "Generate a gravatar from an email address.",
  },
  {
    name: "Highlight",
    url: "/docs/pipes/highlight",
    description: "Highlight search terms within text with styled spans.",
  },
  {
    name: "HTML Escape",
    url: "/docs/pipes/html-escape",
    description: "Escapes special HTML characters to their entity equivalents for safe display.",
  },
  {
    name: "HTML Sanitize",
    url: "/docs/pipes/html-sanitize",
    description: "Sanitizes HTML input to remove unsafe elements while preserving safe content.",
  },
  {
    name: "Initials",
    url: "/docs/pipes/initials",
    description: "Extracts initials from a given name.",
  },
  {
    name: "IP Address Mask",
    url: "/docs/pipes/ip-address-mask",
    description: "Mask the last two octets of IPv4 addresses for privacy.",
  },
  {
    name: "JSON Pretty",
    url: "/docs/pipes/json-pretty",
    description: "Formats JSON with syntax highlighting.",
  },
  {
    name: "Morse Code",
    url: "/docs/pipes/morse-code",
    description: "Converts a string into Morse code.",
  },
  {
    name: "QR Code",
    url: "/docs/pipes/qrcode",
    description: "Generates a QR code from a string.",
  },
  {
    name: "Replace",
    url: "/docs/pipes/replace",
    description: "A pipe to replace parts of a string.",
  },
  {
    name: "Reverse",
    url: "/docs/pipes/reverse",
    description: "Reverses the characters in a string.",
  },
  {
    name: "Text to Speech",
    url: "/docs/pipes/text-to-speech",
    description: "Converts text to speech using the Web Speech API with configurable language.",
  },
  {
    name: "Text Transform",
    url: "/docs/pipes/text-transform",
    description: "Transform text to camelCase, snake_case, kebab-case, or Title Case.",
  },
  {
    name: "Time Ago",
    url: "/docs/pipes/time-ago",
    description: "Converts dates into localized relative time strings using Intl.RelativeTimeFormat.",
    addedOn: "2026-03-17",
  },
  {
    name: "Truncate",
    url: "/docs/pipes/truncate",
    description: "Truncates strings to a specified length with configurable ellipsis and word preservation.",
  },
];
