import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSuccess } from 'src/app/core/models/authSuccess.interface';
import { RegisterRequest } from 'src/app/core/models/registerRequest.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  // Indicateur d'erreur lors de l'inscription
  public onError = false;
  // Message d'erreur à afficher
  public errorMessage = '';

  // Formulaire d'inscription
  public signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.min(3)]],
    password: ['', [Validators.required, Validators.min(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$')]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  // Méthode de soumission du formulaire d'inscription
  public onSubmit(): void {
    const registerRequest = this.signupForm.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe(
      (response: AuthSuccess) => {
        this.router.navigate(['/signin']).then(() => {
          console.log('Redirect to /signin successful');
        }).catch(err => {
          console.error('Redirect to /signin failed', err);
        });
      },
      error => {
        this.onError = true;
        if (error.status === 409) {
          this.errorMessage = 'Email déjà utilisé';
        }
        console.error('Registration error', error);
      }
    );
  }

  // Méthode de navigation vers la page précédente
  public back() {
    window.history.back();
  }
}
