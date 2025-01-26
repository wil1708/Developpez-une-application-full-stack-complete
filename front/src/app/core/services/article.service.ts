import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
}
