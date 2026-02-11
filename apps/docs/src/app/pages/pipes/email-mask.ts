import { Component } from '@angular/core';
import { EmailMaskPipe } from '@ngx-transforms';
import { CodePreview } from '../../reusables/code-preview/code-preview';
import { NextPrevNavigation } from '../../reusables/next-prev-navigation/next-prev-navigation';
import { MacosWindow } from '../../reusables/macos-window/macos-window';
import { EmailPrivacyShowcase } from '../../examples/email-privacy-showcase/email-privacy-showcase';
import { AuthorCredit } from '../../reusables/author-credit/author-credit';
import { Breadcrumb } from '../../reusables/breadcrumb/breadcrumb';

@Component({
  selector: 'app-email-mask-page',
  standalone: true,
  imports: [
    EmailMaskPipe,
    CodePreview,
    NextPrevNavigation,
    MacosWindow,
    EmailPrivacyShowcase,
    AuthorCredit,
    Breadcrumb,
  ],
  template: `
    <div class="container mx-auto py-10 px-4 md:px-8 max-w-4xl">
      <app-breadcrumb class="mb-6 block" />

      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Email Mask Pipe
      </h1>
      <p class="text-lg text-muted-foreground mb-8">
        A privacy-focused pipe that masks email addresses by hiding the username while keeping the first and last
        characters visible. Perfect for user interfaces, public logs, and data displays.
      </p>

      <!-- Use Cases -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Common Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mt-0.5">1</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">User Profiles</h4>
                <p class="text-sm text-muted-foreground">Display email addresses in public profiles without exposing full usernames.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mt-0.5">2</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Comment Sections</h4>
                <p class="text-sm text-muted-foreground">Show commenter identity while maintaining privacy in public discussions.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">3</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Activity Logs</h4>
                <p class="text-sm text-muted-foreground">Record user actions without storing full email addresses in logs.</p>
              </div>
            </div>
          </div>
          <div class="rounded-md border border-border p-4">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-sm font-bold mt-0.5">4</span>
              <div class="flex-1">
                <h4 class="font-semibold mb-1">Team Directories</h4>
                <p class="text-sm text-muted-foreground">Show team member emails to external viewers with privacy protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Interactive Example</h2>
      <app-macos-window title="Email Privacy Showcase">
        <app-email-privacy-showcase />
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
                  <code class="text-sm">john.doe@example.com</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ 'john.doe@example.com' | emailMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Short (2 chars)</div>
                  <code class="text-sm">ab@test.com</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ 'ab@test.com' | emailMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Single char</div>
                  <code class="text-sm">a@domain.org</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ 'a@domain.org' | emailMask }}</code>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Long username</div>
                  <code class="text-sm">very.long.username@mail.io</code>
                </div>
                <div class="h-px flex-1 mx-4 bg-border"></div>
                <div>
                  <div class="text-xs text-muted-foreground mb-1">Masked</div>
                  <code class="font-mono text-primary font-bold">{{ 'very.long.username@mail.io' | emailMask }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </app-code-preview>

      <h2 class="text-2xl font-bold my-8">How It Works</h2>
      <div class="rounded-lg border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-sm font-bold">1</span>
          <div>
            <h4 class="font-semibold mb-1">For usernames with 3+ characters</h4>
            <p class="text-sm text-muted-foreground mb-2">Shows first and last character, replaces middle with ***</p>
            <code class="text-xs bg-muted px-2 py-1 rounded">john.doe → j***e</code>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 text-sm font-bold">2</span>
          <div>
            <h4 class="font-semibold mb-1">For usernames with 1-2 characters</h4>
            <p class="text-sm text-muted-foreground mb-2">Shows only first character, replaces rest with ***</p>
            <code class="text-xs bg-muted px-2 py-1 rounded">ab → a***</code>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 text-sm font-bold">3</span>
          <div>
            <h4 class="font-semibold mb-1">Domain preservation</h4>
            <p class="text-sm text-muted-foreground mb-2">The domain part (&#64;example.com) remains fully visible</p>
            <code class="text-xs bg-muted px-2 py-1 rounded">user@company.com → u***r@company.com</code>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Real-World Scenarios</h2>
      <div class="space-y-4">
        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 text-xs">1</span>
            User Directory
          </h3>
          <app-code-preview [code]="userDirectoryExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 text-xs">2</span>
            Comment System
          </h3>
          <app-code-preview [code]="commentExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-600 text-xs">3</span>
            Activity Feed
          </h3>
          <app-code-preview [code]="activityExample" [language]="'typescript'">
            <div></div>
          </app-code-preview>
        </div>
      </div>

      <h2 class="text-2xl font-bold my-8">Features</h2>
      <div class="rounded-md border border-border p-6 space-y-4">
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Smart Masking Logic</h4>
            <p class="text-sm text-muted-foreground">Adapts masking strategy based on username length for optimal privacy and recognizability.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Domain Preservation</h4>
            <p class="text-sm text-muted-foreground">Keeps the full domain visible to maintain context (e.g., &#64;company.com vs &#64;gmail.com).</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Validation</h4>
            <p class="text-sm text-muted-foreground">Checks for @ symbol before masking. Invalid emails are returned unchanged.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">✓</span>
          <div>
            <h4 class="font-semibold">Null Safe</h4>
            <p class="text-sm text-muted-foreground">Handles null, undefined, and empty values gracefully without errors.</p>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
        <app-author-credit author="Mofiro Jean" url="https://github.com/mofirojean" />
        <div class="flex gap-4">
          <app-next-prev-navigation
            [previous]="{ label: 'Credit Card Mask', link: '/docs/pipes/credit-card-mask' }"
            [next]="{ label: 'ASCII Art', link: '/docs/pipes/ascii-art' }"
          />
        </div>
      </div>
    </div>
  `,
})
export class EmailMask {
  code = `
import { Component } from '@angular/core';
import { EmailMaskPipe } from 'ngx-transforms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [EmailMaskPipe],
  template: \`
    <!-- Basic masking -->
    <p>{{ 'john.doe@example.com' | emailMask }}</p>
    <!-- Output: j***e@example.com -->

    <!-- Short username -->
    <p>{{ 'ab@test.com' | emailMask }}</p>
    <!-- Output: a***@test.com -->

    <!-- Single character -->
    <p>{{ 'a@domain.org' | emailMask }}</p>
    <!-- Output: a***@domain.org -->

    <!-- In a list -->
    @for (user of users; track user.id) {
      <div>{{ user.email | emailMask }}</div>
    }
  \`
})
export class ExampleComponent {
  users = [
    { id: 1, email: 'alice@company.com' },
    { id: 2, email: 'bob@organization.net' }
  ];
}
  `;

  userDirectoryExample = `
@Component({
  template: \`
    <div class="user-directory">
      <h3>Team Members</h3>
      <div class="users-grid">
        @for (user of teamMembers; track user.id) {
          <div class="user-card">
            <img [src]="user.avatar" [alt]="user.name">
            <h4>{{ user.name }}</h4>
            <p class="role">{{ user.role }}</p>
            <p class="email">{{ user.email | emailMask }}</p>
            <button (click)="contactUser(user)">Contact</button>
          </div>
        }
      </div>
    </div>
  \`
})
export class UserDirectoryComponent {
  teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Product Manager', email: 'alice.johnson@company.com', avatar: '/alice.jpg' },
    { id: 2, name: 'Bob Smith', role: 'Developer', email: 'bob.smith@company.com', avatar: '/bob.jpg' },
    { id: 3, name: 'Carol White', role: 'Designer', email: 'carol.white@company.com', avatar: '/carol.jpg' }
  ];

  contactUser(user: any) {
    console.log('Contact user:', user.name);
  }
}
  `;

  commentExample = `
@Component({
  template: \`
    <div class="comments-section">
      <h3>Comments ({{ comments.length }})</h3>
      @for (comment of comments; track comment.id) {
        <div class="comment">
          <div class="comment-header">
            <div class="user-info">
              <img [src]="comment.userAvatar" class="avatar">
              <div>
                <span class="username">{{ comment.userName }}</span>
                <span class="email">{{ comment.userEmail | emailMask }}</span>
              </div>
            </div>
            <span class="timestamp">{{ comment.timestamp | date:'short' }}</span>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
        </div>
      }
    </div>
  \`
})
export class CommentsSectionComponent {
  comments = [
    {
      id: 1,
      userName: 'John Doe',
      userEmail: 'john.doe@gmail.com',
      userAvatar: '/john.jpg',
      text: 'Great article! Very informative.',
      timestamp: new Date()
    },
    {
      id: 2,
      userName: 'Jane Smith',
      userEmail: 'jane.smith@yahoo.com',
      userAvatar: '/jane.jpg',
      text: 'Thanks for sharing this.',
      timestamp: new Date()
    }
  ];
}
  `;

  activityExample = `
@Component({
  template: \`
    <div class="activity-feed">
      <h3>Recent Activity</h3>
      @for (activity of activities; track activity.id) {
        <div class="activity-item">
          <div class="activity-icon" [class]="getIconClass(activity.type)">
            <ng-icon [name]="getIconName(activity.type)"></ng-icon>
          </div>
          <div class="activity-content">
            <p class="activity-text">
              <strong>{{ activity.userEmail | emailMask }}</strong>
              {{ activity.action }}
            </p>
            <span class="activity-time">{{ activity.timestamp | date:'short' }}</span>
          </div>
        </div>
      }
    </div>
  \`
})
export class ActivityFeedComponent {
  activities = [
    { id: 1, userEmail: 'admin@company.com', action: 'updated settings', type: 'settings', timestamp: new Date() },
    { id: 2, userEmail: 'user123@gmail.com', action: 'created a new post', type: 'post', timestamp: new Date() },
    { id: 3, userEmail: 'moderator@platform.io', action: 'deleted a comment', type: 'delete', timestamp: new Date() }
  ];

  getIconClass(type: string): string {
    const classes: Record<string, string> = {
      settings: 'bg-blue-500/10 text-blue-600',
      post: 'bg-green-500/10 text-green-600',
      delete: 'bg-red-500/10 text-red-600'
    };
    return classes[type] || 'bg-gray-500/10 text-gray-600';
  }

  getIconName(type: string): string {
    const icons: Record<string, string> = {
      settings: 'lucideSettings',
      post: 'lucideFileText',
      delete: 'lucideTrash'
    };
    return icons[type] || 'lucideActivity';
  }
}
  `;
}
