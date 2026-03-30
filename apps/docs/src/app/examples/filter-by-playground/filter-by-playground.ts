import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { FilterByPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

interface Employee {
  name: string;
  role: string;
  department: string;
  email: string;
  location: string;
}

@Component({
  selector: 'app-filter-by-playground',
  standalone: true,
  imports: [HlmButtonImports, HlmInputImports, FilterByPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fade-in 200ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Search input -->
      <div>
        <p class="text-sm font-medium mb-2">Search</p>
        <input
          hlmInput
          type="text"
          class="w-full"
          placeholder="Type to search employees..."
          [value]="searchTerm()"
          (input)="onSearch($event)"
        />
      </div>

      <!-- Key selector -->
      <div>
        <p class="text-sm font-medium mb-2">Search in</p>
        <div class="flex flex-wrap gap-2">
          @for (k of keys; track k.value) {
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

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-border bg-muted/30 p-3 text-center">
          <div class="text-2xl font-bold">{{ employees.length }}</div>
          <div class="text-xs text-muted-foreground">Total</div>
        </div>
        <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <div class="text-2xl font-bold text-green-500">{{ filteredCount() }}</div>
          <div class="text-xs text-muted-foreground">Matching</div>
        </div>
      </div>

      <!-- Results -->
      <div>
        <p class="text-sm font-medium mb-2">
          Results
          @if (searchTerm()) {
            <span class="text-muted-foreground font-mono text-xs">
              (| filterBy:'{{ searchTerm() }}'{{ selectedKey() ? ":'" + selectedKey() + "'" : '' }})
            </span>
          }
        </p>

        @if (filteredCount() > 0) {
          <div class="rounded-lg border border-border overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-border bg-muted/50">
                    <th class="px-3 py-2 text-left font-medium text-xs">Name</th>
                    <th class="px-3 py-2 text-left font-medium text-xs">Role</th>
                    <th class="px-3 py-2 text-left font-medium text-xs">Department</th>
                    <th class="px-3 py-2 text-left font-medium text-xs hidden sm:table-cell">Email</th>
                    <th class="px-3 py-2 text-left font-medium text-xs hidden md:table-cell">Location</th>
                  </tr>
                </thead>
                <tbody>
                  @if (selectedKey()) {
                    @for (emp of employees | filterBy:searchTerm():selectedKey(); track $index) {
                      <tr class="border-b border-border last:border-0 fade-in" [style.animation-delay.ms]="$index * 40">
                        <td class="px-3 py-2 font-medium">{{ $any(emp).name }}</td>
                        <td class="px-3 py-2 text-muted-foreground">{{ $any(emp).role }}</td>
                        <td class="px-3 py-2 text-muted-foreground">{{ $any(emp).department }}</td>
                        <td class="px-3 py-2 text-muted-foreground hidden sm:table-cell">{{ $any(emp).email }}</td>
                        <td class="px-3 py-2 text-muted-foreground hidden md:table-cell">{{ $any(emp).location }}</td>
                      </tr>
                    }
                  } @else {
                    @for (emp of employees | filterBy:searchTerm(); track $index) {
                      <tr class="border-b border-border last:border-0 fade-in" [style.animation-delay.ms]="$index * 40">
                        <td class="px-3 py-2 font-medium">{{ $any(emp).name }}</td>
                        <td class="px-3 py-2 text-muted-foreground">{{ $any(emp).role }}</td>
                        <td class="px-3 py-2 text-muted-foreground">{{ $any(emp).department }}</td>
                        <td class="px-3 py-2 text-muted-foreground hidden sm:table-cell">{{ $any(emp).email }}</td>
                        <td class="px-3 py-2 text-muted-foreground hidden md:table-cell">{{ $any(emp).location }}</td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          </div>
        } @else {
          <div class="rounded-lg border-2 border-dashed border-border p-6 text-center text-muted-foreground text-sm">
            No employees match your search
          </div>
        }
      </div>

      <!-- Quick filters -->
      <div>
        <p class="text-sm font-medium mb-2">Quick filters</p>
        <div class="flex flex-wrap gap-2">
          @for (q of quickFilters; track q) {
            <button
              hlmBtn
              variant="outline"
              size="sm"
              class="text-xs"
              (click)="applyQuickFilter(q.term, q.key)">
              {{ q.label }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterByPlayground {
  searchTerm = signal('');
  selectedKey = signal('');

  private filterPipe = new FilterByPipe();

  keys = [
    { label: 'All fields', value: '' },
    { label: 'Name', value: 'name' },
    { label: 'Role', value: 'role' },
    { label: 'Department', value: 'department' },
    { label: 'Location', value: 'location' },
  ];

  quickFilters = [
    { label: 'Engineers', term: 'engineer', key: 'role' },
    { label: 'Designers', term: 'design', key: 'role' },
    { label: 'London team', term: 'London', key: 'location' },
    { label: 'Marketing', term: 'Marketing', key: 'department' },
    { label: 'Managers', term: 'manager', key: 'role' },
  ];

  employees: Employee[] = [
    { name: 'Alice Chen', role: 'Senior Engineer', department: 'Engineering', email: 'alice@company.com', location: 'San Francisco' },
    { name: 'Bob Smith', role: 'Product Designer', department: 'Design', email: 'bob@company.com', location: 'New York' },
    { name: 'Carol White', role: 'Engineering Manager', department: 'Engineering', email: 'carol@company.com', location: 'London' },
    { name: 'Dave Brown', role: 'Frontend Engineer', department: 'Engineering', email: 'dave@company.com', location: 'Berlin' },
    { name: 'Emma Davis', role: 'UX Designer', department: 'Design', email: 'emma@company.com', location: 'San Francisco' },
    { name: 'Frank Lee', role: 'Backend Engineer', department: 'Engineering', email: 'frank@company.com', location: 'London' },
    { name: 'Grace Kim', role: 'Marketing Manager', department: 'Marketing', email: 'grace@company.com', location: 'New York' },
    { name: 'Henry Park', role: 'Data Engineer', department: 'Engineering', email: 'henry@company.com', location: 'San Francisco' },
    { name: 'Ivy Chen', role: 'Content Designer', department: 'Design', email: 'ivy@company.com', location: 'London' },
    { name: 'Jack Wilson', role: 'DevOps Engineer', department: 'Engineering', email: 'jack@company.com', location: 'Berlin' },
    { name: 'Kate Miller', role: 'Product Manager', department: 'Product', email: 'kate@company.com', location: 'New York' },
    { name: 'Leo Garcia', role: 'QA Engineer', department: 'Engineering', email: 'leo@company.com', location: 'San Francisco' },
  ];

  filteredCount = () => {
    const term = this.searchTerm();
    const key = this.selectedKey();
    if (!term) return this.employees.length;
    return this.filterPipe.transform(this.employees, term, key || undefined).length;
  };

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  selectKey(key: string) {
    this.selectedKey.set(key);
  }

  applyQuickFilter(term: string, key: string) {
    this.searchTerm.set(term);
    this.selectedKey.set(key);
  }
}
