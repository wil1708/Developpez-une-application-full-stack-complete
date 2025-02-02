import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "../models/comment.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private pathService = 'api';

  constructor(private httpClient: HttpClient) { }

  getCommentsByArticleId(articleId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.pathService}/comments/article/${articleId}`);
  }

  addComment(articleId: number, userId: number, content: string): Observable<Comment> {
    const commentDto = { content };
    return this.httpClient.post<Comment>(`${this.pathService}/comments/article/${articleId}/user/${userId}`, commentDto);
  }
}
