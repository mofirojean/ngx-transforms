import { Provider } from '@angular/core';

// Text
import { AsciiArtPipe } from '../lib/pipes/text/ascii-art/ascii-art';
import { CamelCasePipe } from '../lib/pipes/text/camel-case/camel-case';
import { HighlightPipe } from '../lib/pipes/text/highlight/highlight';
import { InitialsPipe } from '../lib/pipes/text/initials/initials';
import { KebabCasePipe } from '../lib/pipes/text/kebab-case/kebab-case';
import { MorseCodePipe } from '../lib/pipes/text/morse-code/morse-code';
import { ReplacePipe } from '../lib/pipes/text/replace/replace';
import { SnakeCasePipe } from '../lib/pipes/text/snake-case/snake-case';
import { TitleCasePipe } from '../lib/pipes/text/title-case/title-case';
import { TruncatePipe } from '../lib/pipes/text/truncate/truncate';

// Security & Privacy
import { CreditCardMaskPipe } from '../lib/pipes/security/credit-card-mask/credit-card-mask';
import { EmailMaskPipe } from '../lib/pipes/security/email-mask/email-mask';
import { HtmlEscapePipe } from '../lib/pipes/security/html-escape/html-escape';
import { HtmlSanitizePipe } from '../lib/pipes/security/html-sanitize/html-sanitize';
import { IpAddressMaskPipe } from '../lib/pipes/security/ip-address-mask/ip-address-mask';

// Media & Visual
import { BarcodePipe } from '../lib/pipes/media/barcode/barcode';
import { ColorConvertPipe } from '../lib/pipes/media/color-convert/color-convert';
import { GravatarPipe } from '../lib/pipes/media/gravatar/gravatar';
import { QrCodePipe } from '../lib/pipes/media/qr-code/qr-code';

// Data & Utility
import { CountPipe } from '../lib/pipes/data/count/count';
import { DeviceTypePipe } from '../lib/pipes/data/device-type/device-type';
import { JsonPrettyPipe } from '../lib/pipes/data/json-pretty/json-pretty';
import { TextToSpeechPipe } from '../lib/pipes/data/text-to-speech/text-to-speech';
import { TimeAgoPipePipe } from '../lib/pipes/data/time-ago/time-ago';

// Array
import { ChunkPipe } from '../lib/pipes/array/chunk/chunk';
import { Flatten } from '../lib/pipes/array/flatten/flatten';
import { GroupByPipe } from '../lib/pipes/array/group-by/group-by';
import { InitialPipe } from '../lib/pipes/array/initial/initial';
import { OrderByPipe } from '../lib/pipes/array/order-by/order-by';
import { PluckPipe } from '../lib/pipes/array/pluck/pluck';
import { RangePipe } from '../lib/pipes/array/range/range';
import { ReversePipe } from '../lib/pipes/array/reverse/reverse';
import { SamplePipe } from '../lib/pipes/array/sample/sample';
import { ShufflePipe } from '../lib/pipes/array/shuffle/shuffle';
import { TailPipe } from '../lib/pipes/array/tail/tail';
import { TruthifyPipe } from '../lib/pipes/array/truthify/truthify';
import { UniquePipe } from '../lib/pipes/array/unique/unique';
import { WithoutPipe } from '../lib/pipes/array/without/without';
import {FilterByPipe} from '../lib/pipes/array/filter-by/filter-by';

export const ALL_PIPES: Provider[] = [
  // Text
  AsciiArtPipe,
  CamelCasePipe,
  HighlightPipe,
  InitialsPipe,
  KebabCasePipe,
  MorseCodePipe,
  ReplacePipe,
  SnakeCasePipe,
  TitleCasePipe,
  TruncatePipe,

  // Security & Privacy
  CreditCardMaskPipe,
  EmailMaskPipe,
  HtmlEscapePipe,
  HtmlSanitizePipe,
  IpAddressMaskPipe,

  // Media & Visual
  BarcodePipe,
  ColorConvertPipe,
  GravatarPipe,
  QrCodePipe,

  // Data & Utility
  CountPipe,
  DeviceTypePipe,
  JsonPrettyPipe,
  TextToSpeechPipe,
  TimeAgoPipePipe,

  // Array
  ChunkPipe,
  Flatten,
  GroupByPipe,
  InitialPipe,
  OrderByPipe,
  PluckPipe,
  RangePipe,
  ReversePipe,
  SamplePipe,
  ShufflePipe,
  TailPipe,
  TruthifyPipe,
  UniquePipe,
  WithoutPipe,
  FilterByPipe
];
