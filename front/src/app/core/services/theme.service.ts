import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme } from '../models/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private pathService = 'api';

  constructor(private httpClient: HttpClient) { }

  public getThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.pathService}/theme`);
  }
}
