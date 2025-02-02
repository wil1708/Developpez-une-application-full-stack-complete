import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ArticleComponent } from './pages/article/article.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { CommentComponent } from './pages/comment/comment.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
  path: 'signup', component: SignupComponent
  },
  {
    path: 'signin', component: LoginComponent
  },
  {
    path: 'theme', component: ThemeComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'article', component: ArticleComponent
  },
  {
    path: 'create-article', component: CreateArticleComponent
  },
  {
    path: 'comment', component: CommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
