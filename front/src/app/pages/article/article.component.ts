import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { ArticleService } from 'src/app/core/services/article.service';
import { SessionService } from 'src/app/core/services/session.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  // Liste des articles
  articles: Article[] = [];
  // Subject de gestion de la désinscription des abonnements 
  private destroy$ = new Subject<void>();
  // Variable pour déterminer l'ordre de tri
  sortAscending: boolean = true;

  constructor(private router: Router, private articleService: ArticleService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.loadArticles();

    this.articleService.articles$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((articles) => {
      this.articles = this.sortArticles(articles);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Méthode de récupération de la liste des articles du user connecté
  loadArticles(): void {
    const user = this.sessionService.user;
    if (user && user.id) {
      this.articleService.getUserArticles(user.id);
    } else {
      console.error('User not logged in');
    }
  }

  // Méthode de tri des articles de type toggle
  toggleSortOrder(): void {
    this.sortAscending = !this.sortAscending;
    this.articles = this.sortArticles(this.articles);
  }

  // Méthode de tri des articles par date ascendante ou descendante
  sortArticles(articles: Article[]): Article[] {
    return articles.sort((a, b) => this.sortAscending ? 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() :
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  // Méthode de navigation vers la page comment pour afficher un article et ses commentaires
  viewArticle(article: Article): void {
    this.router.navigate(['/comment'], { state: { article } });
  }
}
