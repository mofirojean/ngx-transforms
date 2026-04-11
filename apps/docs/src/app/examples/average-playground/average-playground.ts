import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AveragePipe, SumPipe } from '@ngx-transforms';
import { HlmButtonImports } from '@spartan-ng/helm/button';

interface Student {
  id: number;
  name: string;
  grade: number;
  subject: string;
}

@Component({
  selector: 'app-average-playground',
  standalone: true,
  imports: [HlmButtonImports, AveragePipe, SumPipe, JsonPipe],
  template: `
    <style>
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fade-in 250ms ease-out both; }
    </style>

    <div class="flex flex-col gap-6 p-5">

      <!-- Mode selector -->
      <div>
        <p class="text-sm font-medium mb-2">Mode</p>
        <div class="flex gap-2">
          <button hlmBtn [variant]="mode() === 'primitive' ? 'default' : 'outline'" size="sm" (click)="setMode('primitive')">Numbers</button>
          <button hlmBtn [variant]="mode() === 'object' ? 'default' : 'outline'" size="sm" (click)="setMode('object')">Students</button>
        </div>
      </div>

      @if (mode() === 'primitive') {
        <!-- Number list with toggle -->
        <div>
          <p class="text-sm font-medium mb-2">Toggle numbers in the array</p>
          <div class="flex flex-wrap gap-2">
            @for (n of allNumbers; track n) {
              <button
                hlmBtn
                [variant]="isIncluded(n) ? 'default' : 'outline'"
                size="sm"
                class="font-mono"
                (click)="toggleNumber(n)">
                {{ n }}
              </button>
            }
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-blue-500">{{ numbers().length }}</div>
            <div class="text-xs text-muted-foreground">Items</div>
          </div>
          <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-purple-500">{{ numbers() | sum }}</div>
            <div class="text-xs text-muted-foreground">Sum</div>
          </div>
          <div class="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
            <div class="text-2xl font-bold text-green-500">{{ numbers() | average }}</div>
            <div class="text-xs text-muted-foreground">Average</div>
          </div>
        </div>

        <!-- Result -->
        <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-center">
          @if (numbers().length > 0) {
            <div class="text-5xl font-bold text-amber-500 mb-2">{{ numbers() | average }}</div>
            <div class="text-sm text-muted-foreground">Average of {{ numbers() | json }}</div>
          } @else {
            <div class="text-2xl font-bold text-muted-foreground mb-2">--</div>
            <div class="text-sm text-muted-foreground">Add numbers to calculate the average</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">{{ numbers() | json }} | average</div>
          <code class="text-sm font-mono">{{ numbers() | average }}</code>
        </div>
      }

      @if (mode() === 'object') {
        <!-- Student list -->
        <div>
          <p class="text-sm font-medium mb-2">Students <span class="text-xs text-muted-foreground">(toggle to include)</span></p>
          <div class="space-y-2">
            @for (s of allStudents; track s.id) {
              <button
                class="w-full rounded-lg border p-3 flex items-center gap-3 cursor-pointer transition-colors"
                [class.border-amber-500/30]="isStudentIncluded(s.id)"
                [class.bg-amber-500/5]="isStudentIncluded(s.id)"
                [class.border-border]="!isStudentIncluded(s.id)"
                [class.opacity-50]="!isStudentIncluded(s.id)"
                (click)="toggleStudent(s.id)">
                <div class="flex-1 text-left">
                  <div class="text-sm font-medium">{{ s.name }}</div>
                  <div class="text-xs text-muted-foreground">{{ s.subject }}</div>
                </div>
                <span class="font-mono text-sm font-bold"
                  [class.text-amber-500]="isStudentIncluded(s.id)"
                  [class.text-muted-foreground]="!isStudentIncluded(s.id)">
                  {{ s.grade }}
                </span>
              </button>
            }
          </div>
        </div>

        <!-- Average grade -->
        <div class="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-center">
          @if (selectedStudents().length > 0) {
            <div class="text-sm text-muted-foreground mb-1">Class average</div>
            <div class="text-5xl font-bold text-amber-500 mb-2">{{ selectedStudents() | average:'grade' }}</div>
            <div class="text-sm text-muted-foreground">{{ selectedStudents().length }} students | average:'grade'</div>
          } @else {
            <div class="text-2xl font-bold text-muted-foreground mb-2">--</div>
            <div class="text-sm text-muted-foreground">Select students to calculate the average</div>
          }
        </div>

        <!-- Pipe output -->
        <div class="rounded-md bg-muted p-4 border border-border">
          <div class="text-xs text-muted-foreground mb-1 font-mono">students | average:'grade'</div>
          <code class="text-sm font-mono">{{ selectedStudents() | average:'grade' }}</code>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AveragePlayground {
  mode = signal<'primitive' | 'object'>('primitive');

  // Primitive mode
  allNumbers = [85, 92, 67, 94, 71, 88, 76, 53, 98, 62];
  numbers = signal<number[]>([85, 92, 67, 94, 71, 88]);

  // Object mode
  allStudents: Student[] = [
    { id: 1, name: 'Alice Chen', grade: 95, subject: 'Mathematics' },
    { id: 2, name: 'Bob Smith', grade: 82, subject: 'Science' },
    { id: 3, name: 'Carol White', grade: 91, subject: 'Mathematics' },
    { id: 4, name: 'Dave Brown', grade: 74, subject: 'English' },
    { id: 5, name: 'Emma Davis', grade: 88, subject: 'Science' },
    { id: 6, name: 'Frank Lee', grade: 67, subject: 'English' },
    { id: 7, name: 'Grace Kim', grade: 93, subject: 'Mathematics' },
    { id: 8, name: 'Henry Park', grade: 79, subject: 'Science' },
  ];
  studentIds = signal<number[]>([1, 2, 3, 4, 5]);
  selectedStudents = signal<Student[]>(this.allStudents.filter(s => [1, 2, 3, 4, 5].includes(s.id)));

  setMode(m: 'primitive' | 'object') { this.mode.set(m); }

  isIncluded(n: number) { return this.numbers().includes(n); }
  toggleNumber(n: number) {
    this.numbers.update(list =>
      list.includes(n) ? list.filter(i => i !== n) : [...list, n]
    );
  }

  isStudentIncluded(id: number) { return this.studentIds().includes(id); }
  toggleStudent(id: number) {
    this.studentIds.update(list => {
      const updated = list.includes(id) ? list.filter(i => i !== id) : [...list, id];
      this.selectedStudents.set(this.allStudents.filter(s => updated.includes(s.id)));
      return updated;
    });
  }
}