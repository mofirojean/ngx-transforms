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
  }
];
