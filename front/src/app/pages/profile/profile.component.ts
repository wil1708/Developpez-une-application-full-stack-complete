import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';
import { SessionService } from 'src/app/core/services/session.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Theme } from 'src/app/core/models/theme.interface';
import { User } from 'src/app/core/models/user.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  // Formulaire de profil
  public profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  // Liste des thèmes de l'utilisateur
  public userThemesForProfile: Theme[] = [];
  // Subject de gestion de la désinscription des abonnements
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private themeService: ThemeService, 
    private sessionService: SessionService, 
    private profileService: ProfileService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.sessionService.user;
    if (user && user.id) {
      this.themeService.getUserThemes(user.id);
      this.themeService.userThemes$.pipe(
        takeUntil(this.destroy$)
      ).subscribe((themes) => {
        this.userThemesForProfile = themes;
      });

      this.profileForm.patchValue({ 
        name: user.name, 
        email: user.email 
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Méthode de désinscription d'un thème
  unsubscribeFromTheme(themeId: number): void {
    const user = this.sessionService.user;
    if (user && user.id) {
      this.themeService.removeUserFromTheme(themeId, user.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.userThemesForProfile = this.userThemesForProfile.filter(theme => theme.id !== themeId);
        }, error => {
          console.error('Error unsubscribing from theme', error);
        });
    } else {
      console.error('User not logged in');
    }
  }

  // Méthode de sauvegarde des modifications du profil
  saveProfile(): void {
    const user = this.sessionService.user;
    if (user && user.id) {
      const updatedUser: User = {
        ...user,
        name: this.profileForm.value.name!, 
        email: this.profileForm.value.email!
      };

      this.profileService.updateUser(user.id, updatedUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          updatedUser => {
            this.sessionService.setUser(updatedUser);
          },
          error => {
            console.error('Error updating user profile', error);
          }
        );
    } else {
      console.error('User not logged in');
    }
  }

  // Méthode de déconnexion
  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['']);
  }
}
