import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideArrowRight, lucideTextCursor } from '@ng-icons/lucide';
import { HighlightPipe } from '@ngx-transforms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';

interface QuickExample {
  label: string;
  description: string;
  text: string;
  search: string;
}

@Component({
  selector: 'app-text-highlighter',
  standalone: true,
  imports: [
    FormsModule,
    HlmInputImports,
    HlmLabelImports,
    HlmButtonImports,
    HlmSeparatorImports,
    HlmTextareaImports,
    NgIcon,
    HighlightPipe,
  ],
  providers: [
    provideIcons({ lucideSearch, lucideArrowRight, lucideTextCursor }),
    HighlightPipe,
  ],
  templateUrl: './text-highlighter.html',
})
export class TextHighlighter {
  searchTerm = signal('Angular');
  sampleText = signal(
    'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.'
  );

  private highlightPipe = new HighlightPipe();

  highlightedText = computed(() => {
    const text = this.sampleText();
    const search = this.searchTerm();
    return this.highlightPipe.transform(text, search);
  });

  matchCount = computed(() => {
    const text = this.sampleText();
    const search = this.searchTerm();

    if (!text || !search) return 0;

    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearch, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  });

  quickExamples: QuickExample[] = [
    {
      label: 'Code Search',
      description: 'Find function names',
      text: 'function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}\n\nconst total = calculateTotal(cartItems);',
      search: 'calculateTotal',
    },
    {
      label: 'Email Search',
      description: 'Highlight email domains',
      text: 'Contact us at support@example.com or sales@example.com for assistance. You can also reach admin@example.com for technical issues.',
      search: 'example.com',
    },
    {
      label: 'Documentation',
      description: 'Find API terms',
      text: 'The REST API provides endpoints for authentication, data retrieval, and updates. Use the API key in the header for all API requests. Check the API documentation for details.',
      search: 'API',
    },
    {
      label: 'Article Search',
      description: 'Multi-word search',
      text: 'Machine learning is transforming industries worldwide. Machine learning algorithms can process vast amounts of data and identify patterns that humans might miss.',
      search: 'machine learning',
    },
  ];

  loadExample(example: QuickExample): void {
    this.sampleText.set(example.text);
    this.searchTerm.set(example.search);
  }
}
