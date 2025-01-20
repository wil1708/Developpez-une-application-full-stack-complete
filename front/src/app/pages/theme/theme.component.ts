import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/app/core/models/theme.interface';
import { ThemeService } from 'src/app/core/services/theme.service';
import { SessionService } from 'src/app/core/services/session.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit, OnDestroy {

  isThemePage: boolean = false;
  themes: Theme[] = [];
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private themeService: ThemeService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.isThemePage = this.router.url.includes('theme');
    this.loadThemes();

    this.themeService.themes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((themes) => {
      const user = this.sessionService.user;
      if (user && user.id) {
        this.themeService.getUserThemes(user.id);
        this.themeService.userThemes$.pipe(
          takeUntil(this.destroy$)
        ).subscribe((userThemes) => {
          this.themes = themes.map(theme => {
            theme.subscribed = userThemes.some(userTheme => userTheme.id === theme.id);
            return theme;
          });
        });
      } else {
        this.themes = themes;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadThemes(): void {
    this.themeService.getThemes();
  }

  subscribeToTheme(themeId: number): void {
    const user = this.sessionService.user;
    if (user && user.id) {
      this.themeService.addUserToTheme(themeId, user.id).subscribe(() => {
        this.themes = this.themes.map(theme => {
          if (theme.id === themeId) {
            theme.subscribed = true;
          }
          return theme;
        });
        console.log('User subscribed to theme successfully.');
        this.loadThemes(); // Recharger les thèmes après abonnement
      }, error => {
        console.error('Error subscribing to theme', error);
      });
    } else {
      console.error('User not logged in');
    }
  }
}
