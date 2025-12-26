import { Provider } from '@angular/core';
import { AsciiArtPipe } from '../lib/pipes/ascii-art/ascii-art';
import { BarcodePipe } from '../lib/pipes/barcode/barcode';
import { CamelCasePipe } from '../lib/pipes/camel-case/camel-case';
import { ColorConvertPipe } from '../lib/pipes/color-convert/color-convert';
import { CreditCardMaskPipe } from '../lib/pipes/credit-card-mask/credit-card-mask';
import { DeviceTypePipe } from '../lib/pipes/device-type/device-type';
import { EmailMaskPipe } from '../lib/pipes/email-mask/email-mask';
import { GravatarPipe } from '../lib/pipes/gravatar/gravatar';
import { HighlightPipe } from '../lib/pipes/highlight/highlight';
import { HtmlEscapePipe } from '../lib/pipes/html-escape/html-escape';
import { HtmlSanitizePipe } from '../lib/pipes/html-sanitize/html-sanitize';
import { InitialsPipe } from '../lib/pipes/initials/initials';
import { IpAddressMaskPipe } from '../lib/pipes/ip-address-mask/ip-address-mask';
import { JsonPrettyPipe } from '../lib/pipes/json-pretty/json-pretty';
import { KebabCasePipe } from '../lib/pipes/kebab-case/kebab-case';
import { MorseCodePipe } from '../lib/pipes/morse-code/morse-code';
import { QRCodePipe } from '../lib/pipes/qr-code/qr-code';
import { ReplacePipe } from '../lib/pipes/replace/replace';
import { ReversePipe } from '../lib/pipes/reverse/reverse';
import { SnakeCasePipe } from '../lib/pipes/snake-case/snake-case';
import { TextToSpeechPipe } from '../lib/pipes/text-to-speech/text-to-speech';
import { TitleCasePipe } from '../lib/pipes/title-case/title-case';
import { TruncatePipe } from '../lib/pipes/truncate/truncate';
import { CountPipe } from '../lib/pipes/count/count'

export const ALL_PIPES: Provider[] = [
  AsciiArtPipe,
  BarcodePipe,
  CamelCasePipe,
  ColorConvertPipe,
  CreditCardMaskPipe,
  DeviceTypePipe,
  EmailMaskPipe,
  GravatarPipe,
  HighlightPipe,
  HtmlEscapePipe,
  HtmlSanitizePipe,
  InitialsPipe,
  IpAddressMaskPipe,
  JsonPrettyPipe,
  KebabCasePipe,
  MorseCodePipe,
  QRCodePipe,
  ReplacePipe,
  ReversePipe,
  SnakeCasePipe,
  TextToSpeechPipe,
  TitleCasePipe,
  TruncatePipe,
  CountPipe
];
