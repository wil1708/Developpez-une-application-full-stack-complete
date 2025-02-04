import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSuccess } from 'src/app/core/models/authSuccess.interface';
import { RegisterRequest } from 'src/app/core/models/registerRequest.interface';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public onError = false;
  public errorMessage = '';

  public signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.min(3)]],
    password: ['', [Validators.required, Validators.min(8),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$') ]]
  });

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService) { }

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

  // public onSubmit(): void {
  //   const registerRequest = this.signupForm.value as RegisterRequest;
  //   this.authService.register(registerRequest).subscribe(
  //     (response: AuthSuccess) => {
  //       console.log('Registration successful', response);
  
  //       if (response.token) {
  //         console.log('Token:', response.token);
  //         localStorage.setItem('token', response.token);
  
  //         this.authService.me().subscribe((user: User) => {
  //           console.log('User fetched successfully', user);
  //           this.sessionService.logIn(user);
  //           this.router.navigate(['/profile']).then(() => {
  //             console.log('Navigation to /profile successful');
  //           }).catch(err => {
  //             console.error('Navigation to /profile failed', err);
  //           });
  //         }, error => {
  //           console.error('Error fetching user', error);
  //         });
  //       } else {
  //         console.error('Token not found in registration response');
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.onError = true;
  //       if (error.status === 409) {
  //         this.errorMessage = 'Email déjà utilisé';
  //       }
  //       console.error('Registration error', error);
  //     }
  //   );
  // }


  public back() {
    window.history.back();
  }

}
