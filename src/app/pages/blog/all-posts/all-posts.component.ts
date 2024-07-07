import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss']
})
export class AllPostsComponent implements OnInit {
  blogPostList: BlogPost[] = [];
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 1;
  
  constructor(
    private blogPostService: BlogpostService,
    private router: Router) { }

  ngOnInit(): void {
    this.getFilteredBlogPosts(this.currentPage);
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
    this.blogPostService.getAll().subscribe(result=>{
      this.blogPostList = result as any;
    })
  }

  getFilteredBlogPosts(page: number) {
    this.blogPostService.getFiltered(page, this.pageSize).subscribe(result => {
      this.blogPostList = result.data;
      this.totalPages = result.totalPages;
    }, error => {
      console.error('Error fetching blog posts:', error);
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getFilteredBlogPosts(this.currentPage);
  }

  redirectToPost(title: string) {
    this.router.navigate(['post/' + title]);    
  }
  
  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/' + authorName]);    
  }
}
