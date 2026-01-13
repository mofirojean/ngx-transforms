import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideEye,
  lucideEyeOff,
  lucideMail,
  lucideMailOpen,
  lucideShield,
  lucideUserCircle,
  lucideArrowRight,
  lucideInfo,
  lucideBriefcase,
  lucideUser,
  lucideUsers,
} from '@ng-icons/lucide';
import { EmailMaskPipe } from '@ngx-transforms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';

interface EmailExample {
  label: string;
  email: string;
  icon: string;
}

interface EmailValidation {
  valid: boolean;
  message: string;
}

@Component({
  selector: 'app-email-privacy-showcase',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    HlmButtonImports,
    HlmSeparatorImports,
    NgIcon,
    EmailMaskPipe,
  ],
  providers: [
    provideIcons({
      lucideEye,
      lucideEyeOff,
      lucideMail,
      lucideMailOpen,
      lucideShield,
      lucideUserCircle,
      lucideArrowRight,
      lucideInfo,
      lucideBriefcase,
      lucideUser,
      lucideUsers,
    }),
  ],
  templateUrl: './email-privacy-showcase.html',
})
export class EmailPrivacyShowcase {
  emailAddress = signal('john.doe@example.com');
  maskingEnabled = signal(true);
  private emailMaskPipe = new EmailMaskPipe();

  emailValidation = computed<EmailValidation | null>(() => {
    const email = this.emailAddress();
    if (!email) {
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        valid: false,
        message: 'Invalid email format',
      };
    }

    if (email.length > 254) {
      return {
        valid: false,
        message: 'Email address is too long',
      };
    }

    const [local, domain] = email.split('@');

    if (local.length > 64) {
      return {
        valid: false,
        message: 'Local part is too long (max 64 characters)',
      };
    }

    return {
      valid: true,
      message: '✓ Valid email address',
    };
  });

  emailParts = computed(() => {
    const email = this.emailAddress();
    if (!email || !email.includes('@')) {
      return { local: '', domain: '' };
    }

    const [local, domain] = email.split('@');
    return { local, domain };
  });

  displayEmail = computed(() => {
    if (this.maskingEnabled()) {
      return this.emailMaskPipe.transform(this.emailAddress());
    }
    return this.emailAddress();
  });

  visibleCharsCount = computed(() => {
    const local = this.emailParts().local;
    if (!local) return 0;

    if (local.length <= 2) {
      return 1; // Only first char visible
    }
    return 2; // First and last char visible
  });

  hiddenCharsCount = computed(() => {
    const local = this.emailParts().local;
    if (!local) return 0;
    return Math.max(0, local.length - this.visibleCharsCount());
  });

  emailExamples: EmailExample[] = [
    {
      label: 'Short Username (2 chars)',
      email: 'jo@company.com',
      icon: 'lucideUser',
    },
    {
      label: 'Single Character',
      email: 'a@example.org',
      icon: 'lucideUser',
    },
    {
      label: 'Personal Email',
      email: 'alice.smith@gmail.com',
      icon: 'lucideUser',
    },
    {
      label: 'Corporate Email',
      email: 'john.doe@corporation.com',
      icon: 'lucideBriefcase',
    },
    {
      label: 'Long Username',
      email: 'very.long.username.here@service.io',
      icon: 'lucideUsers',
    },
    {
      label: 'With Numbers',
      email: 'user2024@platform.net',
      icon: 'lucideUser',
    },
  ];

  toggleMasking(): void {
    this.maskingEnabled.update((current) => !current);
  }

  loadExample(email: string): void {
    this.emailAddress.set(email);
  }
}
