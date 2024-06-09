import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './pages/post/post.component';
import { TaggedPostsComponent } from './pages/tagged-posts/tagged-posts.component';
import { InterceptorService } from './http-interceptors/interceptor.service';
import { ToastComponent } from './toast/toast.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { TagsComponent } from './pages/tags/tags.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorPostsComponent } from './pages/author-posts/author-posts.component';
import { HomeNavbarComponent } from './layouts/home-navbar/home-navbar.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    PostComponent,
    TaggedPostsComponent,
    ToastComponent,
    ErrorPageComponent,
    AllPostsComponent,
    TagsComponent,
    AuthorsComponent,
    AuthorPostsComponent,
    HomeNavbarComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
