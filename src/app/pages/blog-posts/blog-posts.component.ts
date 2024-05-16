import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { BlogPostDTO } from 'src/shared/dto/blog-post.dto';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {

  constructor(private blogPostService: BlogpostService,
    private router: Router) { }

 

  blogPostBody : string;
  ngOnInit(): void {
  }
  
  navigateToBlogPostsCreate(): void {
    this.router.navigate(['/blog-posts-create']);
  }
}
