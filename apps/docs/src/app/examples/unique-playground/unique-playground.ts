import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { UniquePipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Contact {
  name: string;
  email: string;
  phone: string;
  company: { name: string; city: string };
  source: string;
}

@Component({
  selector: 'app-unique-playground',
  standalone: true,
  imports: [HlmButtonImports, UniquePipe],
  template: `
    <style>
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in-up { animation: fade-in-up 300ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Scenario selector -->
      <div>
        <p class="text-sm font-medium mb-2">Scenario</p>
        <div class="flex flex-wrap gap-2">
          @for (scenario of scenarios; track scenario.label) {
            <button
              hlmBtn
              [variant]="activeScenario() === scenario.label ? 'default' : 'outline'"
              size="sm"
              (click)="loadScenario(scenario)">
              {{ scenario.label }}
            </button>
          }
        </div>
      </div>

      <!-- Key selector -->
      @if (contacts().length > 0) {
        <div>
          <p class="text-sm font-medium mb-2">Deduplicate by</p>
          <div class="flex flex-wrap gap-2">
            @for (k of availableKeys; track k.value) {
              <button
                hlmBtn
                [variant]="selectedKey() === k.value ? 'default' : 'outline'"
                size="sm"
                (click)="selectKey(k.value)">
                {{ k.label }}
              </button>
            }
          </div>
        </div>
      }

      <!-- Stats bar -->
      @if (contacts().length > 0) {
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold text-foreground">{{ contacts().length }}</div>
            <div class="text-xs text-muted-foreground">Total</div>
          </div>
          <div class="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-red-500">{{ duplicateCount() }}</div>
            <div class="text-xs text-muted-foreground">Duplicates</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-green-500">{{ (contacts() | unique:selectedKey()).length }}</div>
            <div class="text-xs text-muted-foreground">After clean</div>
          </div>
        </div>
      }

      <!-- Clean button -->
      @if (contacts().length > 0 && !isCleaned()) {
        <div class="flex justify-center">
          <button
            hlmBtn
            size="lg"
            class="gap-2 shadow-lg shadow-primary/20"
            [disabled]="duplicateCount() === 0"
            (click)="clean()">
            Clean duplicates
            <span class="text-xs opacity-70">(by {{ selectedKeyLabel() }})</span>
          </button>
        </div>
      }
      @if (isCleaned()) {
        <div class="flex justify-center">
          <button
            hlmBtn
            variant="outline"
            size="lg"
            (click)="reset()">
            Reset
          </button>
        </div>
      }

      <!-- Contact list -->
      @if (contacts().length > 0) {
        <div>
          <p class="text-sm font-medium mb-2">
            {{ isCleaned() ? 'Cleaned contacts' : 'All contacts' }}
          </p>
          <div class="space-y-2">
            @if (isCleaned()) {
              <!-- CLEANED VIEW: pipe used directly in the template -->
              @for (contact of contacts() | unique:selectedKey(); track $index) {
                <div
                  class="rounded-lg border border-border p-3 flex items-center gap-3 fade-in-up"
                  [style.animation-delay.ms]="$index * 50">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {{ getInitials($any(contact).name) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-sm truncate">{{ $any(contact).name }}</div>
                    <div class="text-xs text-muted-foreground truncate">
                      {{ $any(contact).email }} · {{ $any(contact).phone }}
                    </div>
                    <div class="text-xs text-muted-foreground truncate">
                      {{ $any(contact).company.name }}, {{ $any(contact).company.city }}
                      <span class="ml-1 opacity-60">via {{ $any(contact).source }}</span>
                    </div>
                  </div>
                </div>
              }
            } @else {
              <!-- RAW VIEW: all contacts with duplicates highlighted -->
              @for (contact of contacts(); track contact.name + contact.source + $index) {
                <div
                  class="rounded-lg border p-3 flex items-center gap-3 fade-in-up"
                  [class.border-border]="!duplicateIndices().has($index)"
                  [class.border-red-500/30]="duplicateIndices().has($index)"
                  [class.bg-red-500/5]="duplicateIndices().has($index)"
                  [style.animation-delay.ms]="$index * 50">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    [class.bg-primary/10]="!duplicateIndices().has($index)"
                    [class.text-primary]="!duplicateIndices().has($index)"
                    [class.bg-red-500/10]="duplicateIndices().has($index)"
                    [class.text-red-500]="duplicateIndices().has($index)">
                    {{ getInitials(contact.name) }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-sm truncate">{{ contact.name }}</span>
                      @if (duplicateIndices().has($index)) {
                        <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500 font-medium shrink-0">duplicate</span>
                      }
                    </div>
                    <div class="text-xs text-muted-foreground truncate">
                      {{ contact.email }} · {{ contact.phone }}
                    </div>
                    <div class="text-xs text-muted-foreground truncate">
                      {{ contact.company.name }}, {{ contact.company.city }}
                      <span class="ml-1 opacity-60">via {{ contact.source }}</span>
                    </div>
                  </div>
                  @if (duplicateIndices().has($index)) {
                    <div class="text-red-500/50 text-xs shrink-0">✕</div>
                  }
                </div>
              }
            }
          </div>
        </div>
      } @else {
        <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Pick a scenario above to get started
        </div>
      }

      <!-- Pipe output -->
      @if (contacts().length > 0) {
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">
            contacts | unique:'{{ selectedKey() }}'
          </div>
          <div class="text-xs text-muted-foreground">
            {{ contacts().length }} → {{ (contacts() | unique:selectedKey()).length }} contacts
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniquePlayground {
  contacts = signal<Contact[]>([]);
  selectedKey = signal('email');
  activeScenario = signal('');
  isCleaned = signal(false);

  availableKeys = [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Company', value: 'company.name' },
    { label: 'City', value: 'company.city' },
  ];

  scenarios = [
    {
      label: 'CRM Import',
      contacts: [
        { name: 'Alice Johnson', email: 'alice@acme.com', phone: '555-0101', company: { name: 'Acme Corp', city: 'New York' }, source: 'Salesforce' },
        { name: 'Bob Smith', email: 'bob@globex.com', phone: '555-0102', company: { name: 'Globex Inc', city: 'Chicago' }, source: 'HubSpot' },
        { name: 'Alice J.', email: 'alice@acme.com', phone: '555-0101', company: { name: 'Acme Corp', city: 'New York' }, source: 'Mailchimp' },
        { name: 'Carol White', email: 'carol@initech.com', phone: '555-0103', company: { name: 'Initech', city: 'Austin' }, source: 'Salesforce' },
        { name: 'Bob S.', email: 'bob@globex.com', phone: '555-0199', company: { name: 'Globex Inc', city: 'Chicago' }, source: 'LinkedIn' },
        { name: 'Dave Brown', email: 'dave@acme.com', phone: '555-0104', company: { name: 'Acme Corp', city: 'New York' }, source: 'HubSpot' },
        { name: 'Carol W.', email: 'carol@initech.com', phone: '555-0103', company: { name: 'Initech', city: 'Austin' }, source: 'Mailchimp' },
      ],
    },
    {
      label: 'Event Attendees',
      contacts: [
        { name: 'Emma Davis', email: 'emma@startup.io', phone: '555-0201', company: { name: 'StartupIO', city: 'San Francisco' }, source: 'Eventbrite' },
        { name: 'Frank Lee', email: 'frank@bigco.com', phone: '555-0202', company: { name: 'BigCo', city: 'Seattle' }, source: 'Meetup' },
        { name: 'Grace Kim', email: 'grace@devshop.com', phone: '555-0203', company: { name: 'DevShop', city: 'San Francisco' }, source: 'Eventbrite' },
        { name: 'Emma D.', email: 'emma@startup.io', phone: '555-0201', company: { name: 'StartupIO', city: 'San Francisco' }, source: 'Meetup' },
        { name: 'Henry Park', email: 'henry@bigco.com', phone: '555-0204', company: { name: 'BigCo', city: 'Seattle' }, source: 'Eventbrite' },
        { name: 'Frank L.', email: 'frank@bigco.com', phone: '555-0202', company: { name: 'BigCo', city: 'Seattle' }, source: 'LinkedIn' },
        { name: 'Ivy Chen', email: 'ivy@devshop.com', phone: '555-0205', company: { name: 'DevShop', city: 'San Francisco' }, source: 'Meetup' },
        { name: 'Grace K.', email: 'grace@devshop.com', phone: '555-0203', company: { name: 'DevShop', city: 'San Francisco' }, source: 'LinkedIn' },
      ],
    },
    {
      label: 'Newsletter Merge',
      contacts: [
        { name: 'Jack Wilson', email: 'jack@email.com', phone: '555-0301', company: { name: 'Freelance', city: 'Denver' }, source: 'Blog signup' },
        { name: 'Kate Miller', email: 'kate@agency.com', phone: '555-0302', company: { name: 'Creative Agency', city: 'Portland' }, source: 'Webinar' },
        { name: 'Leo Garcia', email: 'leo@email.com', phone: '555-0303', company: { name: 'Freelance', city: 'Denver' }, source: 'Product Hunt' },
        { name: 'Jack W.', email: 'jack@email.com', phone: '555-0301', company: { name: 'Freelance', city: 'Denver' }, source: 'Webinar' },
        { name: 'Mia Taylor', email: 'mia@agency.com', phone: '555-0304', company: { name: 'Creative Agency', city: 'Portland' }, source: 'Blog signup' },
        { name: 'Kate M.', email: 'kate@agency.com', phone: '555-0302', company: { name: 'Creative Agency', city: 'Portland' }, source: 'Product Hunt' },
      ],
    },
  ];

  // Compute which indices are duplicates (for highlighting in raw view)
  duplicateIndices = computed(() => {
    const items = this.contacts();
    const key = this.selectedKey();
    const seen = new Set<unknown>();
    const dupes = new Set<number>();
    for (let i = 0; i < items.length; i++) {
      const val = this.getNestedValue(items[i], key);
      if (seen.has(val)) {
        dupes.add(i);
      } else {
        seen.add(val);
      }
    }
    return dupes;
  });

  duplicateCount = computed(() => this.duplicateIndices().size);

  selectedKeyLabel = computed(() => {
    const found = this.availableKeys.find(k => k.value === this.selectedKey());
    return found ? found.label.toLowerCase() : this.selectedKey();
  });

  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  loadScenario(scenario: typeof this.scenarios[0]) {
    this.activeScenario.set(scenario.label);
    this.contacts.set([...scenario.contacts]);
    this.isCleaned.set(false);
  }

  selectKey(key: string) {
    this.selectedKey.set(key);
    this.isCleaned.set(false);
  }

  clean() {
    this.isCleaned.set(true);
  }

  reset() {
    this.isCleaned.set(false);
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      obj
    );
  }
}
