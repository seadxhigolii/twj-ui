import { Component, HostListener, OnInit } from '@angular/core';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetFilteredBlogPostModel } from 'src/shared/interfaces/blogPost/getFilteredBlogPostModel.interface';

@Component({
  selector: 'app-tagged-posts',
  templateUrl: './tagged-posts.component.html',
  styleUrls: ['./tagged-posts.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss']
})
export class TaggedPostsComponent implements OnInit {
  blogPostList: GetFilteredBlogPostModel[] = []; 
  tag: string = '';
  capitalizedTag: string = '';
  public isLargeScreen: boolean;
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 1;
  totalItems: number = 0;
  
  
  constructor(
    private blogPostService: BlogpostService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.isLargeScreen = window.innerWidth > 991;
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.isLargeScreen = window.innerWidth > 991;
    }

  
  ngOnInit(): void {    
    this.route.paramMap.subscribe(params => {
      const encodedTag = params.get('tag')!;
      this.tag = decodeURIComponent(encodedTag);
      this.capitalizedTag = this.capitalizeWord(this.tag);
      this.getByTagNamePaginated(this.tag);
    });

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

  getByTagNamePaginated(tag: string){
    this.blogPostService.getByTagNamePaginated(this.currentPage, this.pageSize, tag).subscribe(result=>{
      this.blogPostList = result.data as GetFilteredBlogPostModel[];
      this.totalPages = result.totalPages;
      this.totalItems = result.totalItems;
    })
  }

  capitalizeWord(input: string): string {
    return input.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase());
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.getByTagNamePaginated(this.tag);
  }

  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/' + authorName]);    
  }

  redirectToPost(title: string) {
    this.router.navigate(['post/' + title]);    
  }

}
