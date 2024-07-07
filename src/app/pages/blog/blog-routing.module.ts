import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TagsComponent } from './tags/tags.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorPostsComponent } from './author-posts/author-posts.component';
import { TaggedPostsComponent } from './tagged-posts/tagged-posts.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BlogLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }, {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'post/:url',
        component: PostComponent
      }, {
        path: 'error-page',
        component: ErrorPageComponent
      }, {
        path: 'tags',
        component: TagsComponent
      }, {
        path: 'authors',
        component: AuthorsComponent
      }, {
        path: 'author-posts/:authorName',
        component: AuthorPostsComponent
      }, {
        path: 'tagged-posts/:tag',
        component: TaggedPostsComponent
      }, {
        path: 'all-posts',
        component: AllPostsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
