import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private pathService = 'api';

  constructor(private httpClient: HttpClient) { }

  // Méthode de requête API pour mettre à jour les informations d'un user
  public updateUser(userId: number, user: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.pathService}/user/${userId}`, user);
  }
}
