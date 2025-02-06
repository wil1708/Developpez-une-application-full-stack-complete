import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public user: User | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  // Méthode permettant de créer un observable pour déterminer si un user est connecté ou non
  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  // Méthode permettant de connecter un user
  public logIn(user: User): void {
    this.user = user;
    this.isLogged = true;
    this.next();
  }

  // Méthode permettant de déconnecter un user
  public logOut(): void {
    localStorage.removeItem('token');
    this.user = undefined;
    this.isLogged = false;
    this.next();
  }

  // Méthode permettant de modifier un user
  public setUser(user: User): void {
    this.user = user;
    this.next();
  }

  // Méthode permettant de notifier les abonnés de l'observable isLoggedSubject des changements d'état de connexion du user
  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
