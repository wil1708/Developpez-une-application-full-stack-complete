import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit {

  isThemePage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isThemePage = this.router.url.includes('theme');
  }

}
