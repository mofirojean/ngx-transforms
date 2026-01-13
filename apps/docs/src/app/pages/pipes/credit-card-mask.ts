import { Component } from '@angular/core';
import { CreditCardMaskPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { PaymentCardDisplay } from '../../examples/payment-card-display/payment-card-display';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-credit-card-mask-page',
  standalone: true,
  imports: [
    CreditCardMaskPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    PaymentCardDisplay,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Credit Card Mask Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A PCI DSS compliant pipe that masks credit card numbers, revealing only the last 4 digits.
        Essential for secure payment interfaces and transaction displays.
      </p>

      <!-- PCI DSS Requirements -->
      <div class="mb-8 rounded-lg border-2 border-red-500/50 bg-red-500/5 p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-red-700 dark:text-red-400">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">⚠</span>
          PCI DSS Requirement 3.3
        </h2>
        <p class="text-sm text-red-900 dark:text-red-200 mb-3">
          The Payment Card Industry Data Security Standard (PCI DSS) mandates that Primary Account Numbers (PANs)
          must be masked when displayed. At most, only the first six and last four digits may be displayed.
        </p>
        <p class="text-sm text-red-900 dark:text-red-200">
          This pipe follows the more restrictive approach of showing only the last 4 digits, providing maximum security
          while maintaining user reference capability.
        </p>
      </div>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Payment Forms</h4>
                <p class="text-sm text-muted-foreground">Display saved payment methods securely in checkout flows.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Transaction History</h4>
                <p class="text-sm text-muted-foreground">Show which card was used for past purchases without exposing full numbers.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Saved Cards List</h4>
                <p class="text-sm text-muted-foreground">Display user's saved payment methods in account settings.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Admin Dashboards</h4>
                <p class="text-sm text-muted-foreground">Allow support staff to reference cards without seeing full numbers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Payment Card Display">
        <app-payment-card-display />
      </app-macos-window>

      <h2 class="text-2xl font-bold my-8">Usage</h2>

      <app-code-preview [code]="code" [language]="'typescript'">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-4">Masking Examples</h3>
            <div class="rounded-md bg-muted p-6 border border-border space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Original</div>
                  <code class="text-sm font-mono">4532015112830366</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ '4532015112830366' | creditCardMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">With Dashes</div>
                  <code class="text-sm font-mono">4532-0151-1283-0366</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ '4532-0151-1283-0366' | creditCardMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Amex (15 digits)</div>
                  <code class="text-sm font-mono">374245455400126</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ '374245455400126' | creditCardMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Unmasked (false)</div>
                  <code class="text-sm font-mono">4532015112830366</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Result</div>
                  <code class="font-mono text-primary font-bold">{{ '4532015112830366' | creditCardMask: false }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">Real-World Scenarios</h2>
      <div class="space-y-4">
        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-xs">1</span>
            Payment Method Selection
          </h3>
          <app-code-preview [code]="paymentMethodExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 text-xs">2</span>
            Transaction History
          </h3>
          <app-code-preview [code]="transactionExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-600 text-xs">3</span>
            Conditional Display (Admin View)
          </h3>
          <app-code-preview [code]="adminExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Automatic Formatting</h4>
            <p class="text-sm text-muted-foreground">Removes spaces and dashes, then groups masked digits in sets of 4 for readability.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Variable Length Support</h4>
            <p class="text-sm text-muted-foreground">Handles cards of any length (Visa: 16, Amex: 15, etc.) and masks all but the last 4 digits.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Gracefully handles null, undefined, and short values without errors.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">PCI DSS Compliant</h4>
            <p class="text-sm text-muted-foreground">Follows payment card industry standards by only revealing the last 4 digits.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'IP Address Mask', link: '/docs/pipes/ip-address-mask' }"
            [next]="{ label: 'Email Mask', link: '/docs/pipes/email-mask' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class CreditCardMask {
  code = `
import { Component } from '@angular/core';
import { CreditCardMaskPipe } from '@ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CreditCardMaskPipe],
  template: \`
    <!-- Basic masking (default) -->
    <p>{{ '4532015112830366' | creditCardMask }}</p>
    <!-- Output: **** **** **** 0366 -->

    <!-- With dashes - they're automatically removed -->
    <p>{{ '4532-0151-1283-0366' | creditCardMask }}</p>
    <!-- Output: **** **** **** 0366 -->

    <!-- Disable masking for admin view -->
    <p>{{ cardNumber | creditCardMask:false }}</p>
    <!-- Output: 4532015112830366 -->
  \`
})
export class ExampleComponent {
  cardNumber = '4532015112830366';
}
  `;

  paymentMethodExample = `
@Component({
  template: \`
    <div class="payment-methods">
      <h3>Select Payment Method</h3>
      @for (card of savedCards; track card.id) {
        <button class="card-option" (click)="selectCard(card)">
          <div class="card-brand">
            <img [src]="card.brandIcon" [alt]="card.brand">
          </div>
          <div class="card-details">
            <span class="card-number">{{ card.number | creditCardMask }}</span>
            <span class="card-expiry">Expires {{ card.expiry }}</span>
          </div>
          @if (selectedCardId === card.id) {
            <span class="selected-badge">Selected</span>
          }
        </button>
      }
    </div>
  \`
})
export class PaymentMethodComponent {
  savedCards = [
    { id: 1, number: '4532015112830366', brand: 'Visa', expiry: '12/25', brandIcon: '/visa.svg' },
    { id: 2, number: '5425233430109903', brand: 'Mastercard', expiry: '09/26', brandIcon: '/mc.svg' }
  ];
  selectedCardId?: number;

  selectCard(card: any) {
    this.selectedCardId = card.id;
  }
}
  `;

  transactionExample = `
@Component({
  template: \`
    <div class="transactions">
      <h3>Recent Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Card</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          @for (tx of transactions; track tx.id) {
            <tr>
              <td>{{ tx.date | date:'short' }}</td>
              <td>{{ tx.description }}</td>
              <td class="font-mono">{{ tx.cardNumber | creditCardMask }}</td>
              <td>{{ tx.amount | currency }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`
})
export class TransactionHistoryComponent {
  transactions = [
    { id: 1, date: new Date(), description: 'Amazon Purchase', cardNumber: '4532015112830366', amount: 49.99 },
    { id: 2, date: new Date(), description: 'Netflix Subscription', cardNumber: '5425233430109903', amount: 15.99 }
  ];
}
  `;

  adminExample = `
@Component({
  template: \`
    <!-- Admin sees last 4, customer service sees full (with permission) -->
    <div class="order-details">
      <h3>Order #{{ order.id }}</h3>
      <div class="payment-info">
        <label>Payment Card:</label>
        <span class="font-mono">
          {{ order.cardNumber | creditCardMask:!canViewFullCard }}
        </span>
        @if (isCustomerService && !canViewFullCard) {
          <button (click)="requestFullCardView()">Request Full View</button>
        }
      </div>
    </div>
  \`
})
export class OrderDetailsComponent {
  isAdmin = false;
  isCustomerService = true;
  canViewFullCard = false;

  order = {
    id: '12345',
    cardNumber: '4532015112830366'
  };

  requestFullCardView() {
    // Request permission and log the action
    this.canViewFullCard = true;
    console.log('Full card view requested for order', this.order.id);
  }
}
  `;
}
