/**
 * Represents the structure of a pipe documentation entry.
 */
export interface Pipe {
  name: string;
  url: string;
  description: string;
  isNew?: boolean;
}

export const PIPES: Pipe[] = [
  {
    name: "Count",
    url: "/docs/pipes/count",
    description: "Returns the length of an array or string."
  },
  {
    name: "JSON Pretty",
    url: "/docs/pipes/json-pretty",
    description: "Formats JSON with syntax highlighting."
  },
  {
    name: "QR Code",
    url: "/docs/pipes/qrcode",
    description: "Generates a QR code from a string."
  },
  {
    name: "Barcode",
    url: "/docs/pipes/barcode",
    description: "Generates various types of barcodes."
  },
  {
    name: "Replace",
    url: "/docs/pipes/replace",
    description: "A pipe to replace parts of a string."
  },
  {
    name: "Gravatar",
    url: "/docs/pipes/gravatar",
    description: "Generate a gravatar from an email address."
  },
  {
    name: "Reverse",
    url: "/docs/pipes/reverse",
    description: "Reverses the characters in a string."
  },
  {
    name: "Morse Code",
    url: "/docs/pipes/morse-code",
    description: "Converts a string into Morse code."
  },
  {
    name: "Initials",
    url: "/docs/pipes/initials",
    description: "Extracts initials from a given name."
  },
  {
    name: "Text Transform",
    url: "/docs/pipes/text-transform",
    description: "Transform text to camelCase, snake_case, kebab-case, or Title Case.",
  },
  {
    name: "Color Convert",
    url: "/docs/pipes/color-convert",
    description: "Convert colors between HEX, RGB, and RGBA formats.",
  },
  {
    name: "Highlight",
    url: "/docs/pipes/highlight",
    description: "Highlight search terms within text with styled spans.",
  },
  {
    name: "IP Address Mask",
    url: "/docs/pipes/ip-address-mask",
    description: "Mask the last two octets of IPv4 addresses for privacy.",
  },
  {
    name: "Credit Card Mask",
    url: "/docs/pipes/credit-card-mask",
    description: "Mask credit card numbers showing only last 4 digits.",
  },
  {
    name: "Email Mask",
    url: "/docs/pipes/email-mask",
    description: "Mask email addresses while preserving first and last characters.",
  },
  {
    name: "ASCII Art",
    url: "/docs/pipes/ascii-art",
    description: "Transform text into stunning ASCII art banners with customizable styles.",
  },
  {
    name: "Truncate",
    url: "/docs/pipes/truncate",
    description: "Truncates strings to a specified length with configurable ellipsis and word preservation.",
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
    name: "Text to Speech",
    url: "/docs/pipes/text-to-speech",
    description: "Converts text to speech using the Web Speech API with configurable language.",
  },
  {
    name: "Device Type",
    url: "/docs/pipes/device-type",
    description: "Detects device type (mobile, tablet, desktop) from user agent strings.",
  }
];
