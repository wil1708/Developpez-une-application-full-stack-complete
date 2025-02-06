import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isThemePage: boolean = false;
  isProfilePage: boolean = false;
  isArticlePage: boolean = false;
  isNavbarOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateActiveLink(this.router.url);

    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveLink(event.url);
      });
  }

  // Méthode permettant d'activer une couleur sur le lien de la navbar lorsque la page correspondante est active
  private updateActiveLink(url: string): void {
    this.isThemePage = url.includes('theme');
    this.isProfilePage = url.includes('profile');
    this.isArticlePage = url.includes('article');
  }

  // Méthode pour ouvrir/fermer la navbar lors de l'utilisation du bouton type hamburger en mode mobile
  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}
