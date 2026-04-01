import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { GroupByPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-group-by-playground',
  standalone: true,
  imports: [HlmButtonImports, GroupByPipe, KeyValuePipe],
  template: `
    <style>
      @keyframes slide-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .slide-in { animation: slide-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Dataset picker -->
      <div>
        <p class="text-sm font-medium mb-2">Dataset</p>
        <div class="flex flex-wrap gap-2">
          @for (preset of presets; track preset.label) {
            <button
              hlmBtn
              [variant]="activePreset() === preset.label ? 'default' : 'outline'"
              size="sm"
              (click)="loadPreset(preset)">
              {{ preset.label }}
            </button>
          }
        </div>
      </div>

      @if (data().length > 0) {
        <!-- Key selector -->
        <div>
          <p class="text-sm font-medium mb-2">Group by</p>
          <div class="flex flex-wrap gap-2">
            @for (k of availableKeys(); track k) {
              <button
                hlmBtn
                [variant]="selectedKey() === k ? 'default' : 'outline'"
                size="sm"
                class="font-mono text-xs"
                (click)="selectKey(k)">
                {{ k }}
              </button>
            }
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <div class="text-2xl font-bold">{{ data().length }}</div>
            <div class="text-xs text-muted-foreground">Total items</div>
          </div>
          <div class="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
            <div class="text-2xl font-bold text-primary">{{ groupCount() }}</div>
            <div class="text-xs text-muted-foreground">Groups</div>
          </div>
        </div>

        <!-- Grouped output -->
        <div>
          <p class="text-sm font-medium mb-3">
            Grouped by
            <span class="font-mono text-primary">'{{ selectedKey() }}'</span>
          </p>
          <div class="space-y-3">
            @for (group of data() | groupBy:selectedKey() | keyvalue; track group.key; let i = $index) {
              <div class="rounded-lg border border-border overflow-hidden slide-in"
                [style.animation-delay.ms]="i * 80">
                <div class="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                  <span class="font-semibold text-sm">{{ group.key }}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{{ $any(group.value).length }}</span>
                </div>
                <div class="divide-y divide-border">
                  @for (item of $any(group.value); track $index) {
                    <div class="px-4 py-2 text-sm flex items-center gap-3">
                      <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {{ getInitial(item) }}
                      </div>
                      <span>{{ getDisplayName(item) }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground font-mono">
            data | groupBy:'{{ selectedKey() }}'
          </div>
        </div>
      } @else {
        <div class="rounded-lg border-2 border-dashed border-border p-8 text-center text-muted-foreground text-sm">
          Pick a dataset above to get started
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupByPlayground {
  data = signal<Record<string, unknown>[]>([]);
  selectedKey = signal('');
  activePreset = signal('');
  availableKeys = signal<string[]>([]);
  displayField = signal('name');

  private groupByPipe = new GroupByPipe();

  presets = [
    {
      label: 'Employees',
      keys: ['department', 'role', 'location'],
      displayField: 'name',
      data: [
        { name: 'Alice Chen', department: 'Engineering', role: 'Senior', location: 'SF' },
        { name: 'Bob Smith', department: 'Design', role: 'Junior', location: 'NYC' },
        { name: 'Carol White', department: 'Engineering', role: 'Lead', location: 'London' },
        { name: 'Dave Brown', department: 'Engineering', role: 'Junior', location: 'SF' },
        { name: 'Emma Davis', department: 'Design', role: 'Senior', location: 'SF' },
        { name: 'Frank Lee', department: 'Marketing', role: 'Lead', location: 'NYC' },
        { name: 'Grace Kim', department: 'Engineering', role: 'Senior', location: 'London' },
        { name: 'Henry Park', department: 'Marketing', role: 'Junior', location: 'SF' },
      ],
    },
    {
      label: 'Products',
      keys: ['category', 'inStock'],
      displayField: 'name',
      data: [
        { name: 'Laptop', category: 'Electronics', inStock: true },
        { name: 'Shirt', category: 'Clothing', inStock: true },
        { name: 'Phone', category: 'Electronics', inStock: false },
        { name: 'Jeans', category: 'Clothing', inStock: true },
        { name: 'Tablet', category: 'Electronics', inStock: true },
        { name: 'Jacket', category: 'Clothing', inStock: false },
        { name: 'Book', category: 'Education', inStock: true },
        { name: 'Course', category: 'Education', inStock: true },
      ],
    },
    {
      label: 'Tickets',
      keys: ['priority', 'status', 'assignee'],
      displayField: 'title',
      data: [
        { title: 'Fix login bug', priority: 'High', status: 'Open', assignee: 'Alice' },
        { title: 'Update docs', priority: 'Low', status: 'Done', assignee: 'Bob' },
        { title: 'API crash', priority: 'Critical', status: 'Open', assignee: 'Alice' },
        { title: 'New feature', priority: 'Medium', status: 'In Progress', assignee: 'Carol' },
        { title: 'Refactor auth', priority: 'High', status: 'In Progress', assignee: 'Alice' },
        { title: 'Add tests', priority: 'Medium', status: 'Open', assignee: 'Bob' },
        { title: 'CSS cleanup', priority: 'Low', status: 'Done', assignee: 'Carol' },
      ],
    },
  ];

  groupCount = computed(() => {
    const grouped = this.groupByPipe.transform(this.data(), this.selectedKey());
    return Object.keys(grouped).length;
  });

  getInitial(item: Record<string, unknown>): string {
    const name = String(item[this.displayField()] ?? '?');
    return name.charAt(0).toUpperCase();
  }

  getDisplayName(item: Record<string, unknown>): string {
    return String(item[this.displayField()] ?? '-');
  }

  loadPreset(preset: typeof this.presets[0]) {
    this.activePreset.set(preset.label);
    this.data.set([...preset.data]);
    this.availableKeys.set(preset.keys);
    this.selectedKey.set(preset.keys[0]);
    this.displayField.set(preset.displayField);
  }

  selectKey(key: string) {
    this.selectedKey.set(key);
  }
}
