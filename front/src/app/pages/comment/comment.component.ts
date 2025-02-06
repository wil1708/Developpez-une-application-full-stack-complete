import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Article } from 'src/app/core/models/article.interface'; // Ajustez le chemin d'import si nécessaire
import { CommentService } from 'src/app/core/services/comment.service'; // Ajustez le chemin d'import si nécessaire
import { Comment } from 'src/app/core/models/comment.interface'; // Ajustez le chemin d'import si nécessaire
import { SessionService } from 'src/app/core/services/session.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  // Article sélectionné
  article: Article | undefined;
  // Liste des commentaires
  comments: Comment[] = [];
  // Formulaire de commentaire
  commentForm: FormGroup; 
  // Subject de gestion de la désinscription des abonnements 
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private commentService: CommentService,
    private sessionService: SessionService, 
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.article = navigation?.extras?.state?.['article'];

    this.commentForm = this.fb.group({
      comment: ['']
    });
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

  // Méthode de navigation vers la page précédente
  public back() {
    window.history.back();
  }

  // Méthode d'ajout d'un commentaire
  public addComment() {
    if (this.article && this.commentForm.value.comment) {
      const user = this.sessionService.user;
      if (user && user.id) {
        const userId = user.id;
        this.commentService.addComment(this.article.id, userId, this.commentForm.value.comment)
          .subscribe((newComment: Comment) => {
            this.comments.push(newComment);
            this.commentForm.reset();
          });
      } else {
        console.error('User not logged in');
      }
    }
  }
}
