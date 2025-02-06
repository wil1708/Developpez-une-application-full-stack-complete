import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/core/models/theme.interface';
import { ChangeDetectorRef } from '@angular/core';
import { ArticleService } from 'src/app/core/services/article.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  // Formulaire de création d'article
  public form: FormGroup;
  // Liste des thèmes disponibles
  public themes: Theme[] = [];
  // Indicateur de création d'article réussie
  public isArticleCreated = false;

  constructor(
    private fb: FormBuilder, 
    private themeService: ThemeService,
    private articleService: ArticleService,
    private sessionService: SessionService, 
    private router: Router,
    private cd: ChangeDetectorRef 
  ) {
    this.form = this.fb.group({
      theme: [''],
      title: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themes = themes;
      this.cd.detectChanges();
    });
    this.themeService.getThemes();
  }

  // Méthode de navigation vers la page précédente
  public back() {
    window.history.back();
  }

  // Méthode de soumission du formulaire pour créer un article
  onSubmit() {
    if (this.form.valid) {
      const articleData = this.form.value;
      const themeId = articleData.theme;
      const user = this.sessionService.user;
      
      if (user && user.id) {
        const userId = user.id;
        this.articleService.createArticle(articleData, themeId, userId).subscribe({
          next: (article) => {
            this.isArticleCreated = true;
            setTimeout(() => {
              this.isArticleCreated = false;
              this.router.navigate(['/comment'], { state: { article } });
            }, 1000);
          },
          error: (error) => {
            console.error('Error creating article:', error);
          }
        });
      } else {
        console.error('User not logged in');
      }
    }
  }
}
