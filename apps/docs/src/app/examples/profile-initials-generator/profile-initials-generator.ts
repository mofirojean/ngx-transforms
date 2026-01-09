import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialsPipe } from '@ngx-transforms';
import {HlmInputImports} from '@spartan-ng/helm/input';
import {HlmLabelImports} from '@spartan-ng/helm/label';

@Component({
  selector: 'app-profile-initials-generator',
  standalone: true,
  imports: [
    FormsModule,
    InitialsPipe,
    HlmInputImports,
    HlmLabelImports
  ],
  templateUrl: './profile-initials-generator.html',
})
export class ProfileInitialsGenerator {
  name = signal('John Doe');
}
