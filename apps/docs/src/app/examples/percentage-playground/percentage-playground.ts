import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { PercentagePipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Scenario {
  label: string;
  value: number;
  total: number;
  decimals?: number;
}

@Component({
  selector: 'app-percentage-playground',
  standalone: true,
  imports: [HlmButtonImports, PercentagePipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Presets -->
      <div>
        <p class="text-sm font-medium mb-2">Scenarios</p>
        <div class="flex flex-wrap gap-2">
          @for (s of scenarios; track s.label) {
            <button
              hlmBtn
              [variant]="activeScenario() === s.label ? 'default' : 'outline'"
              size="sm"
              (click)="loadScenario(s)">
              {{ s.label }}
            </button>
          }
        </div>
      </div>

      <!-- Controls -->
      <div class="grid grid-cols-3 gap-4">
        <div>
          <p class="text-sm font-medium mb-2">Value</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustValue(-10)">-</button>
            <span class="text-lg font-bold w-12 text-center font-mono">{{ value() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustValue(10)">+</button>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Total</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustTotal(-50)" [disabled]="total() <= 50">-</button>
            <span class="text-lg font-bold w-12 text-center font-mono">{{ total() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustTotal(50)">+</button>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Decimals</p>
          <div class="flex items-center gap-2">
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustDecimals(-1)" [disabled]="decimals() <= 0">-</button>
            <span class="text-lg font-bold w-8 text-center font-mono">{{ decimals() }}</span>
            <button hlmBtn variant="outline" size="sm" class="w-8 h-8 p-0" (click)="adjustDecimals(1)" [disabled]="decimals() >= 6">+</button>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm font-medium">Progress</p>
          <span class="text-sm font-mono font-bold"
            [class.text-green-500]="(value() | percentage:total():decimals())! <= 100"
            [class.text-amber-500]="(value() | percentage:total():decimals())! > 100">
            {{ value() | percentage:total():decimals() }}%
          </span>
        </div>
        <div class="w-full bg-muted rounded-full h-4 overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-300"
            [class.bg-green-500]="(value() | percentage:total():decimals())! <= 100"
            [class.bg-amber-500]="(value() | percentage:total():decimals())! > 100"
            [style.width.%]="Math.min((value() | percentage:total():decimals())!, 100)">
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 text-center">
        <div class="text-sm text-muted-foreground mb-1">{{ value() }} of {{ total() }}</div>
        <div class="text-5xl font-bold text-blue-500 mb-2">{{ value() | percentage:total():decimals() }}%</div>
        <div class="text-sm text-muted-foreground">{{ value() }} | percentage:{{ total() }}:{{ decimals() }}</div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3">
        <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center">
          <div class="text-2xl font-bold text-blue-500 font-mono">{{ value() }}</div>
          <div class="text-xs text-muted-foreground">Value</div>
        </div>
        <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3 text-center">
          <div class="text-2xl font-bold text-purple-500 font-mono">{{ total() }}</div>
          <div class="text-xs text-muted-foreground">Total</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <div class="text-2xl font-bold text-green-500 font-mono">{{ value() | percentage:total():decimals() }}%</div>
          <div class="text-xs text-muted-foreground">Percentage</div>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground mb-1 font-mono">{{ value() }} | percentage:{{ total() }}:{{ decimals() }}</div>
        <code class="text-sm font-mono">{{ value() | percentage:total():decimals() }}</code>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentagePlayground {
  value = signal(75);
  total = signal(200);
  decimals = signal(2);
  activeScenario = signal('');

  protected readonly Math = Math;

  scenarios: Scenario[] = [
    { label: 'Exam Score', value: 42, total: 50, decimals: 1 },
    { label: 'Disk Usage', value: 750, total: 1000, decimals: 1 },
    { label: 'Sales Target', value: 87500, total: 100000, decimals: 2 },
    { label: 'Battery', value: 63, total: 100, decimals: 0 },
    { label: 'Over Budget', value: 120, total: 100, decimals: 1 },
    { label: 'Fraction', value: 1, total: 3, decimals: 4 },
  ];

  loadScenario(s: Scenario) {
    this.activeScenario.set(s.label);
    this.value.set(s.value);
    this.total.set(s.total);
    this.decimals.set(s.decimals ?? 2);
  }

  adjustValue(delta: number) {
    this.value.update(v => v + delta);
    this.activeScenario.set('');
  }

  adjustTotal(delta: number) {
    this.total.update(v => Math.max(1, v + delta));
    this.activeScenario.set('');
  }

  adjustDecimals(delta: number) {
    this.decimals.update(v => Math.max(0, Math.min(6, v + delta)));
  }
}