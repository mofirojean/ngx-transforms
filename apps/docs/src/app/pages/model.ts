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
    isNew: true
  },
  {
    name: "Color Convert",
    url: "/docs/pipes/color-convert",
    description: "Convert colors between HEX, RGB, and RGBA formats.",
    isNew: true
  },
  {
    name: "Highlight",
    url: "/docs/pipes/highlight",
    description: "Highlight search terms within text with styled spans.",
    isNew: true
  },
  {
    name: "IP Address Mask",
    url: "/docs/pipes/ip-address-mask",
    description: "Mask the last two octets of IPv4 addresses for privacy.",
    isNew: true
  },
  {
    name: "Credit Card Mask",
    url: "/docs/pipes/credit-card-mask",
    description: "Mask credit card numbers showing only last 4 digits.",
    isNew: true
  },
  {
    name: "Email Mask",
    url: "/docs/pipes/email-mask",
    description: "Mask email addresses while preserving first and last characters.",
    isNew: true
  }
];
