import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themesSubject = new BehaviorSubject<Theme[]>([]);
  public themes$ = this.themesSubject.asObservable();

  private userThemesSubject = new BehaviorSubject<Theme[]>([]);
  public userThemes$ = this.userThemesSubject.asObservable();

  private pathService = 'api';

  constructor(private httpClient: HttpClient) { }

  public getThemes(): void {
    this.httpClient.get<Theme[]>(`${this.pathService}/theme`).subscribe(
      (themes: Theme[]) => this.themesSubject.next(themes),
      (error) => console.error('Error fetching themes', error)
    );
  }

  public getUserThemes(userId: number): void {
    this.httpClient.get<Theme[]>(`${this.pathService}/user/${userId}/themes`).subscribe(
      (themes: Theme[]) => this.userThemesSubject.next(themes),
      (error) => console.error('Error fetching user themes', error)
    );
  }

  public addUserToTheme(themeId: number, userId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/theme/${themeId}/user/${userId}`, {});
  }

  public removeUserFromTheme(themeId: number, userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/theme/${themeId}/user/${userId}`);
  }
}
