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
      { name: "Trim", url: "/docs/pipes/trim", description: "Removes whitespace or specified characters from both ends of a string.", addedOn: "2026-04-16" },
      { name: "Capitalize", url: "/docs/pipes/capitalize", description: "Uppercases the first character and lowercases the rest.", addedOn: "2026-04-16" },
      { name: "UpperFirst", url: "/docs/pipes/upper-first", description: "Uppercases the first character without altering the rest.", addedOn: "2026-04-16" },
      { name: "LeftPad", url: "/docs/pipes/left-pad", description: "Pads a string on the left until it reaches the target length.", addedOn: "2026-04-17" },
      { name: "RightPad", url: "/docs/pipes/right-pad", description: "Pads a string on the right until it reaches the target length.", addedOn: "2026-04-17" },
      { name: "Pad", url: "/docs/pipes/pad", description: "Centers a string by padding both sides to the target length.", addedOn: "2026-04-17" },
      { name: "Repeat", url: "/docs/pipes/repeat", description: "Repeats a string a given number of times with optional separator.", addedOn: "2026-04-18" },
      { name: "Slugify", url: "/docs/pipes/slugify", description: "Converts a string into a URL-friendly slug.", addedOn: "2026-04-18" },
      { name: "StripTags", url: "/docs/pipes/strip-tags", description: "Removes HTML tags, with optional allowlist for preserved tags.", addedOn: "2026-04-18" },
      { name: "EncodeURI", url: "/docs/pipes/encode-uri", description: "Encodes a full URI, preserving URL structural characters.", addedOn: "2026-04-19" },
      { name: "EncodeURIComponent", url: "/docs/pipes/encode-uri-component", description: "Encodes a URI component, escaping reserved characters.", addedOn: "2026-04-19" },
      { name: "DecodeURI", url: "/docs/pipes/decode-uri", description: "Decodes a URI previously encoded with encodeURI.", addedOn: "2026-04-19" },
      { name: "DecodeURIComponent", url: "/docs/pipes/decode-uri-component", description: "Decodes a URI component previously encoded with encodeURIComponent.", addedOn: "2026-04-19" },
      { name: "Split", url: "/docs/pipes/split", description: "Splits a string into an array using a string or regex separator.", addedOn: "2026-04-20" },
      { name: "Match", url: "/docs/pipes/match", description: "Returns all regex matches found in a string as an array.", addedOn: "2026-04-20" },
      { name: "Test", url: "/docs/pipes/test", description: "Returns true when a string matches a regex pattern.", addedOn: "2026-04-20" },
      { name: "Newlines", url: "/docs/pipes/newlines", description: "Replaces line breaks in a string with a custom replacement.", addedOn: "2026-04-20" },
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
      { name: "Chunk", url: "/docs/pipes/chunk", description: "Splits an array into smaller groups of a specified size.", addedOn: "2026-03-26" },
      { name: "Diff", url: "/docs/pipes/diff", description: "Returns elements in the first array that are not in the second.", addedOn: "2026-04-02" },
      { name: "Every", url: "/docs/pipes/every", description: "Checks if all elements in an array satisfy a condition.", addedOn: "2026-04-04" },
      { name: "Intersection", url: "/docs/pipes/intersection", description: "Returns elements common to both arrays.", addedOn: "2026-04-03" },
      { name: "Some", url: "/docs/pipes/some", description: "Checks if at least one element in an array satisfies a condition.", addedOn: "2026-04-05" },
      { name: "Union", url: "/docs/pipes/union", description: "Combines two arrays keeping only unique elements.", addedOn: "2026-04-04" },
      { name: "FilterBy", url: "/docs/pipes/filter-by", description: "Filters arrays by matching a search term against object properties.", addedOn: "2026-03-30" },
      { name: "Flatten", url: "/docs/pipes/flatten", description: "Flattens nested arrays to a specified depth.", addedOn: "2026-03-19" },
      { name: "GroupBy", url: "/docs/pipes/group-by", description: "Groups array elements by a property value into categorized sections.", addedOn: "2026-04-01" },
      { name: "Initial", url: "/docs/pipes/initial", description: "Returns all elements except the last n.", addedOn: "2026-03-23" },
      { name: "OrderBy", url: "/docs/pipes/order-by", description: "Sorts an array by a property value with configurable direction.", addedOn: "2026-03-31" },
      { name: "Pluck", url: "/docs/pipes/pluck", description: "Extracts a property value from every object in an array.", addedOn: "2026-03-29" },
      { name: "Range", url: "/docs/pipes/range", description: "Generates a numeric sequence array with configurable start and step.", addedOn: "2026-03-27" },
      { name: "Reverse", url: "/docs/pipes/reverse", description: "Reverses the characters in a string or the elements in an array.", addedOn: "2026-03-18" },
      { name: "Sample", url: "/docs/pipes/sample", description: "Randomly picks n items from an array without duplicates.", addedOn: "2026-03-25" },
      { name: "Shuffle", url: "/docs/pipes/shuffle", description: "Randomly reorders array elements using the Fisher-Yates algorithm.", addedOn: "2026-03-22" },
      { name: "Tail", url: "/docs/pipes/tail", description: "Returns all elements except the first n.", addedOn: "2026-03-24" },
      { name: "Truthify", url: "/docs/pipes/truthify", description: "Removes all falsy values from arrays.", addedOn: "2026-03-21" },
      { name: "Unique", url: "/docs/pipes/unique", description: "Removes duplicates from arrays with support for nested object keys.", addedOn: "2026-03-20" },
      { name: "Without", url: "/docs/pipes/without", description: "Excludes specified elements from an array by value or object property.", addedOn: "2026-03-28" },
    ],
  },
  {
    name: 'Math',
    pipes: [
      { name: "Min", url: "/docs/pipes/min", description: "Returns the minimum value from an array of numbers.", addedOn: "2026-04-08" },
      { name: "Max", url: "/docs/pipes/max", description: "Returns the maximum value from an array of numbers.", addedOn: "2026-04-09" },
      { name: "Sum", url: "/docs/pipes/sum", description: "Returns the sum of all numeric values in an array.", addedOn: "2026-04-10" },
      { name: "Average", url: "/docs/pipes/average", description: "Returns the arithmetic mean of all numeric values in an array.", addedOn: "2026-04-11" },
      { name: "Percentage", url: "/docs/pipes/percentage", description: "Calculates what percentage a value represents of a total.", addedOn: "2026-04-12" },
      { name: "Ceil", url: "/docs/pipes/ceil", description: "Rounds a number up to the specified number of decimal places.", addedOn: "2026-04-13" },
      { name: "Floor", url: "/docs/pipes/floor", description: "Rounds a number down to the specified number of decimal places.", addedOn: "2026-04-14" },
      { name: "Round", url: "/docs/pipes/round", description: "Rounds a number to the nearest value at the specified number of decimal places.", addedOn: "2026-04-15" },
      { name: "Sqrt", url: "/docs/pipes/sqrt", description: "Returns the square root of a number.", addedOn: "2026-04-15" },
      { name: "Pow", url: "/docs/pipes/pow", description: "Raises a number to the specified power.", addedOn: "2026-04-15" },
      { name: "Degrees", url: "/docs/pipes/degrees", description: "Converts a value in radians to degrees.", addedOn: "2026-04-15" },
      { name: "Bytes", url: "/docs/pipes/bytes", description: "Formats numbers with byte units (e.g. 1.5 KB).", addedOn: "2026-04-15" },
      { name: "Radians", url: "/docs/pipes/radians", description: "Converts a value in degrees to radians.", addedOn: "2026-04-15" },
    ],
  },
];

/** Flat list of all pipes (for backward compatibility). */
export const PIPES: Pipe[] = PIPE_CATEGORIES.flatMap(c => c.pipes);
