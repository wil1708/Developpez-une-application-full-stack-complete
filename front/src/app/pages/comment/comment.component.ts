import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface'; // Adjust the import path as needed
import { CommentService } from 'src/app/core/services/comment.service'; // Adjust the import path as needed
import { Comment } from 'src/app/core/models/comment.interface'; // Adjust the import path as needed
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  article: Article | undefined;
  comments: Comment[] = [];
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private commentService: CommentService) {
    const navigation = this.router.getCurrentNavigation();
    this.article = navigation?.extras?.state?.['article'];
  }

  ngOnInit(): void {
    if (this.article) {
      this.commentService.getCommentsByArticleId(this.article.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((comments: Comment[]) => {
        this.comments = comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public back() {
    window.history.back();
  }
}
