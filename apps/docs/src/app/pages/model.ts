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
  }
];
