import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Github} from './model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private http = inject(HttpClient);

  getGithubStars(): Observable<Github> {
    return this.http.get<Github>('https://api.github.com/repos/mofirojean/ngx-transforms')
      .pipe(catchError(() => of({ stargazers_count: 0 })))
  }
}
