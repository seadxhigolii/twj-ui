import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './pages/post/post.component';
import { TaggedPostsComponent } from './pages/tagged-posts/tagged-posts.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { TagsComponent } from './pages/tags/tags.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorPostsComponent } from './pages/author-posts/author-posts.component';
const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: 'home',
    component: HomeComponent
  },  {
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
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
