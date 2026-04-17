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
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
