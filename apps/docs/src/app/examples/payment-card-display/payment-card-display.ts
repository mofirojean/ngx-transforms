import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideEye,
  lucideEyeOff,
  lucideCreditCard,
  lucideShieldCheck,
  lucideArrowRight,
  lucideInfo,
  lucideBanknote,
} from '@ng-icons/lucide';
import { CreditCardMaskPipe } from '@ngx-transforms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';

interface CardExample {
  label: string;
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  icon: string;
}

interface CardValidation {
  valid: boolean;
  message: string;
}

@Component({
  selector: 'app-payment-card-display',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    HlmButtonImports,
    HlmSeparatorImports,
    NgIcon,
    CreditCardMaskPipe,
  ],
  providers: [
    provideIcons({
      lucideEye,
      lucideEyeOff,
      lucideCreditCard,
      lucideShieldCheck,
      lucideArrowRight,
      lucideInfo,
      lucideBanknote,
    }),
  ],
  templateUrl: './payment-card-display.html',
})
export class PaymentCardDisplay {
  cardNumber = signal('4532015112830366');
  cardHolder = signal('JOHN DOE');
  cardExpiry = signal('12/25');
  maskingEnabled = signal(true);

  cardValidation = computed<CardValidation | null>(() => {
    const card = this.cardNumber().replace(/[\s-]/g, '');
    if (!card) {
      return null;
    }

    if (!/^\d+$/.test(card)) {
      return {
        valid: false,
        message: 'Card number must contain only digits',
      };
    }

    if (card.length < 13 || card.length > 19) {
      return {
        valid: false,
        message: 'Card number must be between 13 and 19 digits',
      };
    }

    // Luhn algorithm check
    if (!this.luhnCheck(card)) {
      return {
        valid: false,
        message: 'Invalid card number (failed Luhn check)',
      };
    }

    return {
      valid: true,
      message: '✓ Valid card number',
    };
  });

  detectCardBrand = computed<string>(() => {
    const card = this.cardNumber().replace(/[\s-]/g, '');
    if (!card) return '';

    if (/^4/.test(card)) return 'VISA';
    if (/^5[1-5]/.test(card)) return 'MASTERCARD';
    if (/^3[47]/.test(card)) return 'AMEX';
    if (/^6(?:011|5)/.test(card)) return 'DISCOVER';

    return 'CARD';
  });

  cardExamples: CardExample[] = [
    {
      label: 'Visa Card',
      cardNumber: '4532015112830366',
      cardHolder: 'JOHN DOE',
      expiry: '12/25',
      icon: 'lucideCreditCard',
    },
    {
      label: 'Mastercard',
      cardNumber: '5425233430109903',
      cardHolder: 'JANE SMITH',
      expiry: '09/26',
      icon: 'lucideCreditCard',
    },
    {
      label: 'American Express',
      cardNumber: '374245455400126',
      cardHolder: 'ALEX JOHNSON',
      expiry: '03/27',
      icon: 'lucideCreditCard',
    },
    {
      label: 'Discover',
      cardNumber: '6011111111111117',
      cardHolder: 'SAM WILSON',
      expiry: '06/24',
      icon: 'lucideCreditCard',
    },
  ];

  toggleMasking(): void {
    this.maskingEnabled.update((current) => !current);
  }

  loadExample(example: CardExample): void {
    this.cardNumber.set(example.cardNumber);
    this.cardHolder.set(example.cardHolder);
    this.cardExpiry.set(example.expiry);
  }

  formatCardInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s/g, '');

    // Add spaces every 4 digits
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardNumber.set(formatted);
  }

  getCardBrandClass(): string {
    const brand = this.detectCardBrand();
    switch (brand) {
      case 'VISA':
        return 'bg-gradient-to-br from-blue-600 to-blue-800';
      case 'MASTERCARD':
        return 'bg-gradient-to-br from-orange-600 to-red-700';
      case 'AMEX':
        return 'bg-gradient-to-br from-teal-600 to-cyan-800';
      case 'DISCOVER':
        return 'bg-gradient-to-br from-orange-500 to-amber-600';
      default:
        return 'bg-gradient-to-br from-gray-700 to-gray-900';
    }
  }

  private luhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }
}
