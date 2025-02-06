import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.interface';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this.autoLog();
  }

  // Méthode pour obtenir un observable indiquant si l'utilisateur est connecté
  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  // Méthode de déconnexion
  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['']);
  }

  // Méthode pour connecter automatiquement l'utilisateur si un token est présent
  public autoLog(): void {
    this.authService.me().subscribe(
      (user: User) => {
        this.sessionService.logIn(user);
      },
      (_) => {
        this.sessionService.logOut();
      }
    );
  }
}
