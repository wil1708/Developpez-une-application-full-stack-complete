import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/registerRequest.interface';
import { AuthSuccess } from '../models/authSuccess.interface';
import { User } from '../models/user.interface';
import { LoginRequest } from '../models/loginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/register`, registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/login`, loginRequest);
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/me`);
  }

}
