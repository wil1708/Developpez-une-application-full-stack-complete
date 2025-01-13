import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/app/core/models/theme.interface';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit {

  isThemePage: boolean = false;
  themes: Theme[] = [];

  constructor(private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isThemePage = this.router.url.includes('theme');
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe((data: Theme[]) => {
      this.themes = data;
    }, error => {
      console.error('Error fetching themes', error);
    });
  }
}
