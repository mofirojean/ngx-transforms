import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { OrderByPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-order-by-playground',
  standalone: true,
  imports: [HlmButtonImports, OrderByPipe],
  template: `
    <style>
      @keyframes slide-in {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .slide-in { animation: slide-in 200ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Sort controls -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <p class="text-sm font-medium mb-2">Sort by</p>
          <div class="flex flex-wrap gap-2">
            @for (col of columns; track col.key) {
              <button
                hlmBtn
                [variant]="sortKey() === col.key ? 'default' : 'outline'"
                size="sm"
                (click)="setSortKey(col.key)">
                {{ col.label }}
              </button>
            }
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">Direction</p>
          <div class="flex gap-2">
            <button
              hlmBtn
              [variant]="sortDir() === 'asc' ? 'default' : 'outline'"
              size="sm"
              (click)="setSortDir('asc')">
              A-Z / 0-9
            </button>
            <button
              hlmBtn
              [variant]="sortDir() === 'desc' ? 'default' : 'outline'"
              size="sm"
              (click)="setSortDir('desc')">
              Z-A / 9-0
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="rounded-lg border border-border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border bg-muted/50">
                <th class="px-3 py-2 text-left font-medium text-xs w-8">#</th>
                @for (col of columns; track col.key) {
                  <th class="px-3 py-2 text-left font-medium text-xs cursor-pointer hover:text-primary transition-colors"
                    [class.text-primary]="sortKey() === col.key"
                    (click)="toggleSort(col.key)">
                    {{ col.label }}
                    @if (sortKey() === col.key) {
                      <span class="ml-1">{{ sortDir() === 'asc' ? '↑' : '↓' }}</span>
                    }
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (emp of employees | orderBy:sortKey():sortDir(); track $index) {
                <tr class="border-b border-border last:border-0 slide-in" [style.animation-delay.ms]="$index * 30">
                  <td class="px-3 py-2 text-muted-foreground text-xs">{{ $index + 1 }}</td>
                  @for (col of columns; track col.key) {
                    <td class="px-3 py-2"
                      [class.font-bold]="sortKey() === col.key"
                      [class.text-primary]="sortKey() === col.key">
                      @if (col.key === 'salary') {
                        {{ '$' + getCellValue($any(emp), col.key) }}
                      } @else {
                        {{ getCellValue($any(emp), col.key) }}
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pipe output -->
      <div class="rounded-md bg-muted p-4 border border-border">
        <div class="text-xs text-muted-foreground font-mono">
          employees | orderBy:'{{ sortKey() }}':'{{ sortDir() }}'
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderByPlayground {
  sortKey = signal('name');
  sortDir = signal<'asc' | 'desc'>('asc');

  columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'salary', label: 'Salary' },
    { key: 'experience', label: 'Years' },
  ];

  employees = [
    { name: 'Alice Chen', role: 'Senior Engineer', department: 'Engineering', salary: 145000, experience: 8 },
    { name: 'Bob Smith', role: 'Product Designer', department: 'Design', salary: 120000, experience: 5 },
    { name: 'Carol White', role: 'Engineering Manager', department: 'Engineering', salary: 170000, experience: 12 },
    { name: 'Dave Brown', role: 'Junior Engineer', department: 'Engineering', salary: 85000, experience: 1 },
    { name: 'Emma Davis', role: 'UX Designer', department: 'Design', salary: 110000, experience: 4 },
    { name: 'Frank Lee', role: 'Staff Engineer', department: 'Engineering', salary: 190000, experience: 15 },
    { name: 'Grace Kim', role: 'Marketing Manager', department: 'Marketing', salary: 130000, experience: 7 },
    { name: 'Henry Park', role: 'Data Engineer', department: 'Engineering', salary: 140000, experience: 6 },
    { name: 'Ivy Chen', role: 'Content Designer', department: 'Design', salary: 95000, experience: 3 },
    { name: 'Jack Wilson', role: 'DevOps Engineer', department: 'Engineering', salary: 150000, experience: 9 },
  ];

  getCellValue(row: Record<string, unknown>, key: string): string {
    const val = key.split('.').reduce(
      (current, segment) => (current as Record<string, unknown>)?.[segment],
      row as unknown
    );
    return val === undefined ? '-' : String(val);
  }

  setSortKey(key: string) {
    this.sortKey.set(key);
  }

  setSortDir(dir: 'asc' | 'desc') {
    this.sortDir.set(dir);
  }

  toggleSort(key: string) {
    if (this.sortKey() === key) {
      this.sortDir.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }
}
