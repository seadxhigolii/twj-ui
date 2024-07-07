import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { BlogRoutingModule } from './blog-routing.module'; // Import only if you are using routing
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AuthorPostsComponent } from './author-posts/author-posts.component';
import { AuthorsComponent } from './authors/authors.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PostComponent } from './post/post.component';
import { TaggedPostsComponent } from './tagged-posts/tagged-posts.component';
import { TagsComponent } from './tags/tags.component';
import { HomeComponent } from './home/home.component';
import { HomeNavbarComponent } from 'src/app/layouts/home-navbar/home-navbar.component';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';
import { HomeFooterComponent } from 'src/app/layouts/home-footer/home-footer.component';
import { SubscribeModalComponent } from 'src/app/layouts/subscribe-modal/subscribe-modal.component';

@NgModule({
  declarations: [
    AllPostsComponent,
    AuthorPostsComponent,
    AuthorsComponent,
    ErrorPageComponent,
    PostComponent,
    TaggedPostsComponent,
    TagsComponent,
    HomeComponent,
    HomeNavbarComponent,
    HomeFooterComponent,
    SubscribeModalComponent,
    BlogLayoutComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule 
  ],
  exports: [
    
  ]
})
export class BlogModule { }
