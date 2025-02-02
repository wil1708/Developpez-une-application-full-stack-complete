import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Article } from "../models/article.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  public articles$ = this.articlesSubject.asObservable();

  private pathService = 'api';

  constructor(private httpClient: HttpClient) { }

  getUserArticles(userId: number) {
    this.httpClient.get<Article[]>(`${this.pathService}/user/${userId}/articles`)
      .subscribe(articles => this.articlesSubject.next(articles));
  }

  createArticle(article: Article, themeId: number, userId: number): Observable<Article> {
    return this.httpClient.post<Article>(`${this.pathService}/articles/theme/${themeId}/user/${userId}`, article);
  }
}
