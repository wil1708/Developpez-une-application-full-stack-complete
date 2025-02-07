import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSuccess } from 'src/app/core/models/authSuccess.interface';
import { LoginRequest } from 'src/app/core/models/loginRequest.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Indicateur pour masquer ou afficher le mot de passe
  public hide = true;
  // Indicateur d'erreur de connexion
  public onError = false;
  // Message d'erreur à afficher
  public errorMessage = '';

  // Formulaire de connexion
  public signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$') ]]
  });

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private router: Router,
    private sessionService: SessionService
  ) { }

  // Méthode de soumission du formulaire de connexion
  public onSubmit(): void {
    const loginRequest = this.signinForm.value as LoginRequest;
    this.authService.login(loginRequest).subscribe(
      (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.sessionService.logIn(user);
          this.router.navigate(['theme']);
        });
        this.router.navigate(['theme']);
      },
      error => {
        this.onError = true;
        if (error.status === 401) {
          this.errorMessage = 'Identifiants de connexion invalides';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    );
  }

  // Méthode de navigation vers la page précédente
  public back() {
    window.history.back();
  }
}
