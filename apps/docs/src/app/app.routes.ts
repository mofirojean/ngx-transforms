import { Route } from '@angular/router';
import { Landing } from './pages/landing';
import { Introduction } from './pages/introduction';
import { PipesPage } from './pages/pipes/pipes';
import { Count } from './pages/pipes/count';
import { JsonPretty } from './pages/pipes/json-pretty';
import { QrCode } from './pages/pipes/qrcode';
import { PipesList } from './pages/pipes/pipes-list';
import { Barcode } from './pages/pipes/barcode';
import { Replace } from './pages/pipes/replace';
import { Gravatar } from './pages/pipes/gravatar';
import { Reverse } from './pages/pipes/reverse';
import { MorseCode } from './pages/pipes/morse-code';
import { Initials } from './pages/pipes/initials';
import { TextTransform } from './pages/pipes/text-transform';
import { ColorConvert } from './pages/pipes/color-convert';
import { Highlight } from './pages/pipes/highlight';
import { IpAddressMask } from './pages/pipes/ip-address-mask';
import { CreditCardMask } from './pages/pipes/credit-card-mask';
import { EmailMask } from './pages/pipes/email-mask';
import { AsciiArtPage } from './pages/pipes/ascii-art';
import { TruncatePage } from './pages/pipes/truncate';
import { HtmlEscapePage } from './pages/pipes/html-escape';
import { HtmlSanitizePage } from './pages/pipes/html-sanitize';
import { TextToSpeechPage } from './pages/pipes/text-to-speech';
import { DeviceTypePage } from './pages/pipes/device-type';
import { TimeAgoPage } from './pages/pipes/time-ago';
import { ChunkPage } from './pages/pipes/chunk';
import { DiffPage } from './pages/pipes/diff';
import { EveryPage } from './pages/pipes/every';
import { IntersectionPage } from './pages/pipes/intersection';
import { FilterByPage } from './pages/pipes/filter-by';
import { FlattenPage } from './pages/pipes/flatten';
import { GroupByPage } from './pages/pipes/group-by';
import { InitialPage } from './pages/pipes/initial';
import { OrderByPage } from './pages/pipes/order-by';
import { PluckPage } from './pages/pipes/pluck';
import { RangePage } from './pages/pipes/range';
import { SamplePage } from './pages/pipes/sample';
import { ShufflePage } from './pages/pipes/shuffle';
import { TailPage } from './pages/pipes/tail';
import { TruthifyPage } from './pages/pipes/truthify';
import { UniquePage } from './pages/pipes/unique';
import { SomePage } from './pages/pipes/some';
import { UnionPage } from './pages/pipes/union';
import { WithoutPage } from './pages/pipes/without';
import { MinPage } from './pages/pipes/min';
import { MaxPage } from './pages/pipes/max';
import { SumPage } from './pages/pipes/sum';
import { AveragePage } from './pages/pipes/average';
import { PercentagePage } from './pages/pipes/percentage';
import { CeilPage } from './pages/pipes/ceil';
import { FloorPage } from './pages/pipes/floor';
import { RoundPage } from './pages/pipes/round';
import { SqrtPage } from './pages/pipes/sqrt';
import { PowPage } from './pages/pipes/pow';
import { DegreesPage } from './pages/pipes/degrees';
import { BytesPage } from './pages/pipes/bytes';
import { RadiansPage } from './pages/pipes/radians';
import { TrimPage } from './pages/pipes/trim';
import { CapitalizePage } from './pages/pipes/capitalize';
import { UpperFirstPage } from './pages/pipes/upper-first';
import { LeftPadPage } from './pages/pipes/left-pad';
import { RightPadPage } from './pages/pipes/right-pad';
import { PadPage } from './pages/pipes/pad';
import { RepeatPage } from './pages/pipes/repeat';
import { SlugifyPage } from './pages/pipes/slugify';
import { StripTagsPage } from './pages/pipes/strip-tags';
import { EncodeUriPage } from './pages/pipes/encode-uri';
import { EncodeUriComponentPage } from './pages/pipes/encode-uri-component';
import { DecodeUriPage } from './pages/pipes/decode-uri';
import { DecodeUriComponentPage } from './pages/pipes/decode-uri-component';
import { SplitPage } from './pages/pipes/split';
import { MatchPage } from './pages/pipes/match';
import { TestPage } from './pages/pipes/test';
import { NewlinesPage } from './pages/pipes/newlines';
import { TemplatePage } from './pages/pipes/template';
import { LatinizePage } from './pages/pipes/latinize';
import { WrapPage } from './pages/pipes/wrap';
import { KeysPage } from './pages/pipes/keys';
import { ValuesPage } from './pages/pipes/values';
import { PairsPage } from './pages/pipes/pairs';
import { PickPage } from './pages/pipes/pick';
import { OmitPage } from './pages/pipes/omit';
import { InvertPage } from './pages/pipes/invert';
import { InvertByPage } from './pages/pipes/invert-by';
import { DiffObjPage } from './pages/pipes/diff-obj';
import { IsDefinedPage } from './pages/pipes/is-defined';
import { IsNullPage } from './pages/pipes/is-null';
import { IsStringPage } from './pages/pipes/is-string';
import { IsNumberPage } from './pages/pipes/is-number';
import { IsArrayPage } from './pages/pipes/is-array';
import { IsObjectPage } from './pages/pipes/is-object';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Landing,
    pathMatch: 'full',
  },
  {
    path: 'docs',
    component: PipesPage,
    children: [
      {
        path: 'introduction',
        component: Introduction,
      },
      {
        path: 'pipes',
        children: [
          {
            path: '',
            component: PipesList,
          },
          {
            path: 'count',
            component: Count,
          },
          {
            path: 'json-pretty',
            component: JsonPretty,
          },
          {
            path: 'qrcode',
            component: QrCode,
          },
          {
            path: 'barcode',
            component: Barcode,
          },
          {
            path: 'replace',
            component: Replace,
          },
          {
            path: 'gravatar',
            component: Gravatar,
          },
          {
            path: 'reverse',
            component: Reverse,
          },
          {
            path: 'morse-code',
            component: MorseCode,
          },
          {
            path: 'initials',
            component: Initials,
          },
          {
            path: 'text-transform',
            component: TextTransform,
          },
          {
            path: 'color-convert',
            component: ColorConvert,
          },
          {
            path: 'highlight',
            component: Highlight,
          },
          {
            path: 'ip-address-mask',
            component: IpAddressMask,
          },
          {
            path: 'credit-card-mask',
            component: CreditCardMask,
          },
          {
            path: 'email-mask',
            component: EmailMask,
          },
          {
            path: 'ascii-art',
            component: AsciiArtPage,
          },
          {
            path: 'truncate',
            component: TruncatePage,
          },
          {
            path: 'html-escape',
            component: HtmlEscapePage,
          },
          {
            path: 'html-sanitize',
            component: HtmlSanitizePage,
          },
          {
            path: 'text-to-speech',
            component: TextToSpeechPage,
          },
          {
            path: 'device-type',
            component: DeviceTypePage,
          },
          {
            path: 'time-ago',
            component: TimeAgoPage,
          },
          {
            path: 'chunk',
            component: ChunkPage,
          },
          {
            path: 'diff',
            component: DiffPage,
          },
          {
            path: 'every',
            component: EveryPage,
          },
          {
            path: 'intersection',
            component: IntersectionPage,
          },
          {
            path: 'filter-by',
            component: FilterByPage,
          },
          {
            path: 'flatten',
            component: FlattenPage,
          },
          {
            path: 'group-by',
            component: GroupByPage,
          },
          {
            path: 'initial',
            component: InitialPage,
          },
          {
            path: 'order-by',
            component: OrderByPage,
          },
          {
            path: 'pluck',
            component: PluckPage,
          },
          {
            path: 'range',
            component: RangePage,
          },
          {
            path: 'sample',
            component: SamplePage,
          },
          {
            path: 'shuffle',
            component: ShufflePage,
          },
          {
            path: 'tail',
            component: TailPage,
          },
          {
            path: 'truthify',
            component: TruthifyPage,
          },
          {
            path: 'unique',
            component: UniquePage,
          },
          {
            path: 'some',
            component: SomePage,
          },
          {
            path: 'union',
            component: UnionPage,
          },
          {
            path: 'without',
            component: WithoutPage,
          },
          {
            path: 'min',
            component: MinPage,
          },
          {
            path: 'max',
            component: MaxPage,
          },
          {
            path: 'sum',
            component: SumPage,
          },
          {
            path: 'average',
            component: AveragePage,
          },
          {
            path: 'percentage',
            component: PercentagePage,
          },
          {
            path: 'ceil',
            component: CeilPage,
          },
          {
            path: 'floor',
            component: FloorPage,
          },
          {
            path: 'round',
            component: RoundPage,
          },
          {
            path: 'sqrt',
            component: SqrtPage,
          },
          {
            path: 'pow',
            component: PowPage,
          },
          {
            path: 'degrees',
            component: DegreesPage,
          },
          {
            path: 'bytes',
            component: BytesPage,
          },
          {
            path: 'radians',
            component: RadiansPage,
          },
          {
            path: 'trim',
            component: TrimPage,
          },
          {
            path: 'capitalize',
            component: CapitalizePage,
          },
          {
            path: 'upper-first',
            component: UpperFirstPage,
          },
          {
            path: 'left-pad',
            component: LeftPadPage,
          },
          {
            path: 'right-pad',
            component: RightPadPage,
          },
          {
            path: 'pad',
            component: PadPage,
          },
          {
            path: 'repeat',
            component: RepeatPage,
          },
          {
            path: 'slugify',
            component: SlugifyPage,
          },
          {
            path: 'strip-tags',
            component: StripTagsPage,
          },
          {
            path: 'encode-uri',
            component: EncodeUriPage,
          },
          {
            path: 'encode-uri-component',
            component: EncodeUriComponentPage,
          },
          {
            path: 'decode-uri',
            component: DecodeUriPage,
          },
          {
            path: 'decode-uri-component',
            component: DecodeUriComponentPage,
          },
          {
            path: 'split',
            component: SplitPage,
          },
          {
            path: 'match',
            component: MatchPage,
          },
          {
            path: 'test',
            component: TestPage,
          },
          {
            path: 'newlines',
            component: NewlinesPage,
          },
          {
            path: 'template',
            component: TemplatePage,
          },
          {
            path: 'latinize',
            component: LatinizePage,
          },
          {
            path: 'wrap',
            component: WrapPage,
          },
          {
            path: 'keys',
            component: KeysPage,
          },
          {
            path: 'values',
            component: ValuesPage,
          },
          {
            path: 'pairs',
            component: PairsPage,
          },
          {
            path: 'pick',
            component: PickPage,
          },
          {
            path: 'omit',
            component: OmitPage,
          },
          {
            path: 'invert',
            component: InvertPage,
          },
          {
            path: 'invert-by',
            component: InvertByPage,
          },
          {
            path: 'diff-obj',
            component: DiffObjPage,
          },
          {
            path: 'is-defined',
            component: IsDefinedPage,
          },
          {
            path: 'is-null',
            component: IsNullPage,
          },
          {
            path: 'is-string',
            component: IsStringPage,
          },
          {
            path: 'is-number',
            component: IsNumberPage,
          },
          {
            path: 'is-array',
            component: IsArrayPage,
          },
          {
            path: 'is-object',
            component: IsObjectPage,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
