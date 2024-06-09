import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { CombinedBlogPostModel } from 'src/shared/interfaces/blogPost/combinedBlogPostModel.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../shared/bootstrap.min.css','../../shared/homestyle.scss']
})
export class HomeComponent implements OnInit {
  currentYear : Number | undefined;
  blogPostList: BlogPost; 
  combinedBlogPostList: CombinedBlogPostModel; 
  constructor(private blogPostService: BlogpostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
    this.getAllBlogPosts();
    document.addEventListener('DOMContentLoaded', () => {
      const customNavbarToggle = document.getElementById('customNavbarToggle');
      const customNavbarLinks = document.getElementById('customNavbarLinks');

      customNavbarToggle?.addEventListener('click', () => {
        customNavbarLinks?.classList.toggle('show');
      });
      
      document.addEventListener('click', (event) => {
        const targetElement = event.target as HTMLElement;
        if (!targetElement.closest('.custom-navbar') && customNavbarLinks?.classList.contains('show')) {
          customNavbarLinks?.classList.remove('show');
        }
      });
    });
  }

  getAllBlogPosts(){
    this.blogPostService.getTopTags().subscribe(result=>{
      this.combinedBlogPostList = result as CombinedBlogPostModel;
    })
  }

  viewAll() {
    this.router.navigate(['all-posts']);
  }

  viewTagRelated(tagName: string) {
    this.router.navigate(['tagged-posts/' + tagName.toLowerCase()]);
  }

  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/' + authorName]);    
  }
}
